/**
 * Simple client-side router for SPA functionality
 */

export class Router {
    constructor() {
        this.contentContainer = document.getElementById('content-area');
        this.lightbox = null;
        this.currentMedia = [];
        this.currentIndex = 0;

        this.initLightbox();

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());

        // Intercept all internal link clicks
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.origin === window.location.origin && !link.hasAttribute('data-no-router')) {
                // If it's a social link or similar with target="_blank", don't intercept
                if (link.target === '_blank') return;

                e.preventDefault();
                this.navigate(link.getAttribute('href'));
            }

            // Lightbox triggers for HOME PAGE (Justified Flex)
            const homeItem = e.target.closest('.home-page .grid-item');
            if (homeItem) {
                const grid = homeItem.closest('.gallery-grid');
                if (grid) {
                    const allItems = Array.from(grid.querySelectorAll('.grid-item')).map(item => {
                        const img = item.querySelector('img');
                        const video = item.querySelector('video');
                        const iframe = item.querySelector('iframe');

                        const meta = {
                            category: item.getAttribute('data-category'),
                            sourceUrl: item.getAttribute('data-source-url')
                        };

                        if (img) return { type: 'image', src: img.src, ...meta };
                        if (video) return { type: 'video', src: video.querySelector('source')?.src || video.src, ...meta };
                        if (iframe) return { type: 'iframe', src: iframe.src, ...meta };
                        return null;
                    }).filter(Boolean);

                    const clickedImg = homeItem.querySelector('img');
                    const clickedVid = homeItem.querySelector('video');
                    const clickedIframe = homeItem.querySelector('iframe');
                    const clickedSrc = (clickedImg?.src) || (clickedVid?.querySelector('source')?.src || clickedVid?.src) || (clickedIframe?.src);

                    const index = allItems.findIndex(i => i.src === clickedSrc);
                    this.openLightbox(allItems, index !== -1 ? index : 0);
                    return; // Stop processing further triggers
                }
            }

            // Lightbox triggers for standard galleries
            if (e.target.closest('.image-gallery img')) {
                const img = e.target;
                const gallery = img.closest('.image-gallery');
                const images = Array.from(gallery.querySelectorAll('img')).map(i => ({ type: 'image', src: i.src }));
                const index = images.findIndex(i => i.src === img.src);
                this.openLightbox(images, index);
            }

            // Lightbox triggers for videos
            const videoItem = e.target.closest('.video-item');
            if (videoItem) {
                const videoElement = videoItem.querySelector('video');
                const imgElement = videoItem.querySelector('img');
                const iframeElement = videoItem.querySelector('iframe');

                if (videoElement) {
                    const videoSource = videoElement.querySelector('source')?.src || videoElement.src;
                    if (videoSource) this.openLightbox([{ type: 'video', src: videoSource }], 0);
                } else if (imgElement) {
                    this.openLightbox([{ type: 'image', src: imgElement.src }], 0);
                } else if (iframeElement) {
                    this.openLightbox([{ type: 'iframe', src: iframeElement.src }], 0);
                }
            }
        });
    }

    async navigate(path) {
        if (window.location.pathname === path && !path.includes('#')) return;

        window.history.pushState({}, '', path);
        await this.handleRoute();
    }

    async handleRoute() {
        const pathname = window.location.pathname.split('/').pop() || '';
        let pageId = (pathname === 'index.html' || pathname === '') ? 'page-home' : `page-${pathname.replace('.html', '')}`;

        // Special case for sub-anchors (like photography.html#concert)
        const hash = window.location.hash.substring(1);

        console.log(`Routing to: ${pageId}`);

        // Hide all pages
        document.querySelectorAll('.spa-page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');

            // Update Page Title based on h1 in the section
            const newTitle = targetPage.querySelector('h1')?.textContent;
            if (newTitle) {
                document.title = `${newTitle} | Linus Luschtinez`;
            } else if (pageId === 'page-home') {
                document.title = 'Linus Luschtinez | Portfolio';
            }

            this.updateActiveLink(pathname || 'home.html');

            // Handle anchor scrolling
            if (hash) {
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                window.scrollTo(0, 0);
            }

            // Dispatch event for other scripts (randomize, gallery-collapse)
            window.dispatchEvent(new CustomEvent('pageLoaded', {
                detail: { path: pathname.includes('.html') ? pathname : `${pathname || 'home'}.html` }
            }));
        } else {
            // Fallback to home if page not found
            console.warn(`Page not found: ${pageId}, falling back to home.`);
            this.navigate('home.html');
        }
    }

    updateActiveLink(path) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = link.getAttribute('href').split('#')[0];
            link.classList.toggle('active', linkPath === path);
        });
    }

    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    initLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.id = 'global-lightbox';
        this.lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <span class="lightbox-nav prev">&#10094;</span>
            <span class="lightbox-nav next">&#10095;</span>
            <div class="lightbox-content"></div>
            <a href="#" class="lightbox-category-text">View Category</a>
        `;
        document.body.appendChild(this.lightbox);

        this.lightbox.querySelector('.lightbox-close').onclick = () => this.closeLightbox();
        this.lightbox.querySelector('.prev').onclick = (e) => { e.stopPropagation(); this.navigateGallery(-1); };
        this.lightbox.querySelector('.next').onclick = (e) => { e.stopPropagation(); this.navigateGallery(1); };
        this.lightbox.onclick = (e) => { if (e.target === this.lightbox) this.closeLightbox(); };

        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigateGallery(-1);
            if (e.key === 'ArrowRight') this.navigateGallery(1);
        });
    }

    openLightbox(media, index) {
        this.currentMedia = media;
        this.currentIndex = index;
        this.lightbox.classList.add('active');
        this.updateLightboxContent();

        // Hide nav buttons if only one item
        const navs = this.lightbox.querySelectorAll('.lightbox-nav');
        navs.forEach(n => n.style.display = media.length > 1 ? 'block' : 'none');
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        this.lightbox.querySelector('.lightbox-content').innerHTML = '';
        this.lightbox.querySelector('.lightbox-category-text').style.display = 'none';
    }

    navigateGallery(direction) {
        this.currentIndex = (this.currentIndex + direction + this.currentMedia.length) % this.currentMedia.length;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const media = this.currentMedia[this.currentIndex];
        const content = this.lightbox.querySelector('.lightbox-content');
        const catText = this.lightbox.querySelector('.lightbox-category-text');

        content.innerHTML = '';

        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.src;
            content.appendChild(img);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.controls = true;
            video.autoplay = true;
            content.appendChild(video);
        } else if (media.type === 'iframe') {
            const iframe = document.createElement('iframe');
            iframe.src = media.src;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            content.appendChild(iframe);
        }

        // Update Category Text (ONLY IF METADATA EXISTS - Home Page Only)
        if (media.category && media.sourceUrl) {
            catText.textContent = `Zur Kategorie: ${media.category}`;
            catText.href = media.sourceUrl;
            catText.style.display = 'block';

            catText.onclick = (e) => {
                const isAnchorOnly = media.sourceUrl.startsWith('#');
                if (!isAnchorOnly) {
                    e.preventDefault();
                    this.closeLightbox();
                    this.navigate(media.sourceUrl);
                } else {
                    this.closeLightbox();
                }
            };
        } else {
            catText.style.display = 'none';
        }
    }
}
