/**
 * Gallery Collapse System - Fixed Version
 * Works with both .masonry (CSS columns) and .video-grid (CSS grid) layouts.
 */

export function initGalleryCollapse(container = document) {
    const galleries = container.querySelectorAll('.masonry, .video-grid');
    galleries.forEach(gallery => {
        // NEU: Wenn die Galerie die Klasse 'no-collapse' hat, ignorieren wir sie komplett
        if (gallery.classList.contains('no-collapse')) {
            return; 
        }
        // Only setup if it's actually visible OR inside the specifically requested container
        // This prevents measuring 0px heights in hidden SPA sections
        if (gallery.offsetParent !== null || container !== document) {
            setupGallery(gallery);
        }
    });
}

function setupGallery(gallery) {
    // If it's already fully initialized AND measured, skip
    if (gallery.dataset.collapseInit === 'true' && gallery.dataset.collapsedH) return;

    gallery.dataset.collapseInit = 'true';
    measureAndCollapse(gallery);
}

function measureAndCollapse(gallery) {
    const items = Array.from(gallery.children);
    if (items.length === 0) return;

    // We use a ResizeObserver to wait for the gallery to actually have a layout
    // and for images/videos to finalize their sizes.
    let measurementCount = 0;
    const observer = new ResizeObserver((entries) => {
        const h = computeCollapsedHeight(gallery);
        if (h > 0) {
            gallery.dataset.collapsedH = h;
            applyCollapse(gallery, h);
            insertButton(gallery);
            observer.disconnect();
        } else {
            measurementCount++;
            if (measurementCount > 20) {
                // Fallback: If after many tries we still have 0, use a default
                const fallbackH = gallery.classList.contains('masonry') ? 600 : 400;
                gallery.dataset.collapsedH = fallbackH;
                applyCollapse(gallery, fallbackH);
                insertButton(gallery);
                observer.disconnect();
            }
        }
    });

    observer.observe(gallery);

    // Safety timeout in case ResizeObserver never fires meaningful values
    setTimeout(() => {
        if (!gallery.dataset.collapsedH) {
            const fallbackH = gallery.classList.contains('masonry') ? 600 : 400;
            gallery.dataset.collapsedH = fallbackH;
            applyCollapse(gallery, fallbackH);
            insertButton(gallery);
            observer.disconnect();
        }
    }, 1500);
}

function computeCollapsedHeight(gallery) {
    const items = Array.from(gallery.children);
    if (items.length < 2) return 0;

    const firstItemRect = items[0].getBoundingClientRect();
    const galleryTop = gallery.getBoundingClientRect().top;

    // Wir suchen das erste Item, dessen Oberkante deutlich unter dem ersten Item liegt
    // Das ist zuverlÃ¤ssiger als item[4] fest anzunehmen (wegen responsive breakpoints)
    const secondRowItem = items.find(item => {
        const rect = item.getBoundingClientRect();
        // Wenn die Oberkante des Items > 60% der HÃ¶he des ersten Items unter dessen Oberkante liegt
        return (rect.top - firstItemRect.top) > (firstItemRect.height * 0.6);
    });

    if (!secondRowItem) {
        // Fallback: Wenn keine zweite Reihe gefunden wurde (z.B. nur 1 Reihe oder Layout-Delay)
        return 0;
    }

    // Der perfekte Schnittpunkt ist die Oberkante der zweiten Reihe
    const splitPoint = secondRowItem.getBoundingClientRect().top - galleryTop;

    // Wir ziehen einen kleinen Puffer ab
    const result = Math.floor(splitPoint) - 10;

    // PlausibilitÃ¤ts-Check: Weniger als 100px macht keinen Sinn und fÃ¼hrt zu Überlappungen
    return result > 100 ? result : 0;
}

function applyCollapse(gallery, h) {
    gallery.style.setProperty('--gallery-collapsed-h', h + 'px');
    gallery.classList.add('gallery-collapsed');
}

function insertButton(gallery) {
    const section = gallery.closest('.gallery-section, section');
    if (!section || section.querySelector('.gallery-expand-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'gallery-expand-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `
        <span class="gallery-expand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.5"
                 stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
            </svg>
        </span>
        <span class="gallery-expand-label">Mehr anzeigen</span>
    `;

    gallery.insertAdjacentElement('afterend', btn);
    btn.addEventListener('click', () => toggleGallery(gallery, btn, section));
}

function toggleGallery(gallery, btn, section) {
    const isExpanded = gallery.classList.contains('gallery-expanded');
    const collapsedH = parseInt(gallery.dataset.collapsedH, 10) || 400;

    if (isExpanded) {
        gallery.style.maxHeight = gallery.scrollHeight + 'px';
        gallery.classList.remove('gallery-expanded');
        gallery.classList.add('gallery-expanding');
        gallery.offsetHeight;
        gallery.style.maxHeight = collapsedH + 'px';

        const onDone = () => {
            gallery.classList.remove('gallery-expanding');
            gallery.classList.add('gallery-collapsed');
            gallery.style.maxHeight = '';
            gallery.removeEventListener('transitionend', onDone);
        };
        gallery.addEventListener('transitionend', onDone);

        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.gallery-expand-label').textContent = 'Mehr anzeigen';
        btn.classList.remove('expanded');

        const title = section.querySelector('.section-title');
        if (title) setTimeout(() => title.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);

    } else {
        const fullH = gallery.scrollHeight;
        gallery.style.maxHeight = fullH + 'px';
        gallery.classList.remove('gallery-collapsed');
        gallery.classList.add('gallery-expanding');

        const onDone = () => {
            gallery.classList.remove('gallery-expanding');
            gallery.classList.add('gallery-expanded');
            gallery.style.maxHeight = '';
            gallery.removeEventListener('transitionend', onDone);
        };
        gallery.addEventListener('transitionend', onDone);

        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.gallery-expand-label').textContent = 'Weniger anzeigen';
        btn.classList.add('expanded');
    }
}