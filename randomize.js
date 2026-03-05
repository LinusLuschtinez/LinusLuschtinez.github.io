/**
 * randomize.js - Aggregates media from across the site and randomizes home content.
 */

async function fetchPageMedia(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return [];
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const mediaItems = [];

        // Catch images
        const images = doc.querySelectorAll('img:not(.icon-social):not(.logo img)');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const section = img.closest('.gallery-section') || img.closest('.page-header');
                const category = section ? (section.querySelector('.section-title, h1')?.textContent || section.id) : 'General';
                const anchor = section?.id ? `#${section.id}` : '';

                // Determine precise aspect ratio
                let ratio = 1.5; // default landscape (3:2)
                let aspect = 'landscape';

                if (img.classList.contains('portrait') || img.closest('.portrait') || img.closest('.r3') || img.closest('.tall')) {
                    ratio = 0.66; // 2:3 portrait
                    aspect = 'portrait';
                } else if (img.classList.contains('landscape') || img.closest('.landscape') || img.closest('.wide')) {
                    ratio = 1.5; // 3:2 landscape
                    aspect = 'landscape';
                } else if (src.includes('portrait') || src.includes('Linus_New') || src.includes('sandio_highkey') || src.includes('sandio_lowkey')) {
                    ratio = 0.66;
                    aspect = 'portrait';
                }

                mediaItems.push({
                    type: 'image',
                    ratio: ratio,
                    aspect: aspect,
                    category: category.trim(),
                    sourceUrl: url + anchor,
                    html: `<img src="${src}" alt="${img.alt || 'Media'}" loading="lazy">`
                });
            }
        });

        // Catch video items (local and youtube)
        const videoItems = doc.querySelectorAll('.video-item');
        videoItems.forEach(item => {
            const section = item.closest('.gallery-section');
            const category = section ? (section.querySelector('.section-title')?.textContent || section.id) : 'General';
            const anchor = section?.id ? `#${section.id}` : '';

            let ratio = 1.77; // default cinematic (16:9)
            let aspect = 'landscape';

            if (item.classList.contains('portrait')) {
                ratio = 0.56; // 9:16 portrait
                aspect = 'portrait';
            } else if (item.classList.contains('landscape')) {
                ratio = 1.77;
                aspect = 'landscape';
            } else if (item.classList.contains('square')) {
                ratio = 1.0;
                aspect = 'landscape';
            }

            // Process local videos
            const localVideos = item.querySelectorAll('video');
            localVideos.forEach(v => {
                v.setAttribute('autoplay', '');
                v.setAttribute('muted', '');
                v.setAttribute('loop', '');
                v.setAttribute('playsinline', '');
                v.muted = true;
            });

            // Process YouTube Iframes
            const iframes = item.querySelectorAll('iframe');
            iframes.forEach(f => {
                let src = f.getAttribute('src');
                if (src && (src.includes('youtube.com') || src.includes('youtu.be'))) {
                    const urlObj = new URL(src);
                    urlObj.searchParams.set('autoplay', '1');
                    urlObj.searchParams.set('mute', '1');
                    urlObj.searchParams.set('playsinline', '1');
                    urlObj.searchParams.set('rel', '0');
                    urlObj.searchParams.set('controls', '0');
                    f.setAttribute('src', urlObj.toString());
                }
            });

            mediaItems.push({
                type: 'video',
                ratio: ratio,
                aspect: aspect,
                category: category.trim(),
                sourceUrl: url + anchor,
                html: item.innerHTML
            });
        });

        // Catch standalone videos
        const standaloneVideos = doc.querySelectorAll('video:not(.video-item video)');
        standaloneVideos.forEach(v => {
            const section = v.closest('.gallery-section') || v.closest('.page-header');
            const category = section ? (section.querySelector('.section-title, h1')?.textContent || section.id) : 'General';
            const anchor = section?.id ? `#${section.id}` : '';

            v.setAttribute('autoplay', '');
            v.setAttribute('muted', '');
            v.setAttribute('loop', '');
            v.setAttribute('playsinline', '');
            v.muted = true;

            let ratio = 1.77;
            let aspect = 'landscape';
            if (v.closest('.portrait')) {
                ratio = 0.56;
                aspect = 'portrait';
            }

            mediaItems.push({
                type: 'video',
                ratio: ratio,
                aspect: aspect,
                category: category.trim(),
                sourceUrl: url + anchor,
                html: v.outerHTML
            });
        });

        return mediaItems;
    } catch (e) {
        console.error(`Error fetching media from ${url}:`, e);
        return [];
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function initHomeRandomization() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    const sourcePages = [
        'photography.html',
        'videography.html',
        'visuals.html',
        'about.html',
        'contact.html'
    ];

    const results = await Promise.all(sourcePages.map(url => fetchPageMedia(url)));
    let allMedia = results.flat();

    const seen = new Set();
    allMedia = allMedia.filter(item => {
        const match = item.html.match(/src="([^"]+)"/);
        const src = match ? match[1] : item.html;
        if (seen.has(src)) return false;
        seen.add(src);
        return true;
    });

    if (allMedia.length === 0) return;

    // --- STEP 1: GROUP BY CATEGORY ---
    const byCategory = {};
    allMedia.forEach(item => {
        if (!byCategory[item.category]) byCategory[item.category] = [];
        byCategory[item.category].push(item);
    });

    // Shuffle each category's internal list
    Object.values(byCategory).forEach(list => shuffleArray(list));

    // --- STEP 2: SELECT ONE ITEM PER CATEGORY ---
    const selectedItems = [];
    const categoryKeys = Object.keys(byCategory);
    shuffleArray(categoryKeys);

    // Initial pass: take exactly one from each category until we hit 15
    for (const cat of categoryKeys) {
        if (selectedItems.length < 15 && byCategory[cat].length > 0) {
            selectedItems.push(byCategory[cat].shift());
        }
    }

    // --- STEP 3: FALLBACK IF NEEDED ---
    while (selectedItems.length < 15) {
        let addedInPass = false;
        for (const cat of categoryKeys) {
            if (selectedItems.length < 15 && byCategory[cat].length > 0) {
                selectedItems.push(byCategory[cat].shift());
                addedInPass = true;
            }
        }
        if (!addedInPass) break;
    }

    // --- STEP 4: INTERLEAVE ORIENTATIONS ---
    const portraits = selectedItems.filter(i => i.aspect === 'portrait');
    const landscapes = selectedItems.filter(i => i.aspect === 'landscape');
    const finalSelection = [];

    for (let i = 0; i < selectedItems.length; i++) {
        if (i % 2 === 0 && portraits.length > 0) finalSelection.push(portraits.shift());
        else if (landscapes.length > 0) finalSelection.push(landscapes.shift());
        else if (portraits.length > 0) finalSelection.push(portraits.shift());
        else if (landscapes.length > 0) finalSelection.push(landscapes.shift());
    }

    // Group into 3 rows (5 items each)
    const rows = [[], [], []];
    finalSelection.forEach((item, index) => {
        const rowIndex = Math.floor(index / 5);
        if (rowIndex < 3) rows[rowIndex].push(item);
    });

    grid.innerHTML = '';
    rows.forEach(rowItems => {
        if (rowItems.length === 0) return;

        const rowDiv = document.createElement('div');
        rowDiv.className = 'home-row';

        rowItems.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item ' + (item.aspect || '');
            gridItem.setAttribute('data-category', item.category);
            gridItem.setAttribute('data-source-url', item.sourceUrl);

            gridItem.style.flex = `${item.ratio || 1} 1 0px`;
            gridItem.innerHTML = item.html;
            rowDiv.appendChild(gridItem);

            const video = gridItem.querySelector('video');
            if (video && video.autoplay) {
                video.play().catch(() => { });
            }
        });

        grid.appendChild(rowDiv);
    });

    window.dispatchEvent(new CustomEvent('galleryRandomized'));
}
