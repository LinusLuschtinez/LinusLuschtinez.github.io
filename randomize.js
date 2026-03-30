/**
 * randomize.js - Predefined Home Layouts (HomeV1, HomeV2, HomeV3).
 * Allows easy customization of the home page content.
 */

const HOME_LAYOUTS = {
    HomeV1: [
        { src: 'images/concert_photography/concert_45.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma1.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma1.webp' },
        { src: 'images/concert_photography/concert_41.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma2.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma2.webp' },
        { src: 'images/concert_photography/concert_66.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma3.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma3.webp' },
        { src: 'images/concert_photography/concert_28.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma4.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma4.webp' },
        { src: 'images/concert_photography/concert_5.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma5.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma5.webp' },
        { src: 'images/concert_photography/concert_6.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma6.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma6.webp' },
        { src: 'images/concert_photography/concert_7.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'images/concert_photography/concert_8.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'images/concert_photography/concert_9.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' }
    ],
    HomeV2: [
        { src: 'images/atmo/atmo_12.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_highkey/highkey_1.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#portraits' },
        { src: 'images/atmo/atmo_14new.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_highkey/highkey_6.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#portraits' },
        { src: 'images/atmo/atmo_16.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_highkey/highkey_3.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#portraits' },
        { src: 'images/atmo/atmo_25.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_lowkey/lowkey_1.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#lowkey-portraits' },
        { src: 'images/atmo/atmo_5.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_lowkey/lowkey_5.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#lowkey-portraits' },
        { src: 'images/atmo/atmo_6.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_lowkey/lowkey_6.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#lowkey-portraits' },
        { src: 'images/atmo/atmo_7.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/atmo/atmo_9.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/atmo/atmo_10.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' }
    ],
    HomeV3: [
        { src: 'images/cross_web/Image50.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'videos/animation3.mp4', type: 'video', aspect: 'portrait', category: 'Visual Art', link: 'visuals.html#animations', poster: 'videos/video_preview/animation3.webp' },
        { src: 'images/cross_web/Image41.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'videos/animation2.mp4', type: 'video', aspect: 'portrait', category: 'Visual Art', link: 'visuals.html#animations', poster: 'videos/video_preview/animation2.webp' },
        { src: 'images/cross_web/Image65.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'videos/animation1.mp4', type: 'video', aspect: 'portrait', category: 'Visual Art', link: 'visuals.html#animations', poster: 'videos/video_preview/animation1.webp' },
        { src: 'images/cross_web/Image44.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'videos/LubeV2.mov', type: 'video', aspect: 'portrait', category: 'Visual Art', link: 'visuals.html#renders', poster: 'videos/video_preview/Image.webp' },
        { src: 'images/cross_web/Image01.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'videos/luca4.mp4', type: 'video', aspect: 'portrait', category: 'Visual Art', link: 'visuals.html#renders', poster: 'videos/video_preview/luca4.webp' },
        { src: 'images/cross_web/Image02.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'videos/spinning_sphere.mov', type: 'video', aspect: 'portrait', category: 'Visual Art', link: 'visuals.html#renders', poster: 'videos/video_preview/Image (1).webp' },
        { src: 'images/cross_web/Image03.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'images/cross_web/Image04.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' },
        { src: 'images/cross_web/Image05.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' }
    ]
};

export async function initHomeRandomization() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    // Pick a random layout
    const layoutKeys = Object.keys(HOME_LAYOUTS);
    const randomKey = layoutKeys[Math.floor(Math.random() * layoutKeys.length)];
    const selectedLayout = HOME_LAYOUTS[randomKey];

    console.log(`Loading home layout: ${randomKey}`);

    // Group into 3 rows (5 items each)
    const rows = [[], [], []];
    selectedLayout.forEach((item, index) => {
        const rowIndex = Math.floor(index / 5);
        if (rowIndex < 3) {
            // Prepare HTML based on type
            let htmlContent = '';
            if (item.type === 'video') {
                htmlContent = `
                    <div class="video-item ${item.aspect}" data-type="local">
                        <video muted autoplay loop playsinline preload="auto" poster="${item.poster || ''}">
                            <source src="${item.src}" type="video/mp4">
                        </video>
                    </div>`;
            } else {
                htmlContent = `<img src="${item.src}" alt="${item.category}" loading="lazy">`;
            }

            rows[rowIndex].push({
                ...item,
                html: htmlContent,
                ratio: item.aspect === 'portrait' ? 0.66 : 1.5
            });
        }
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
            gridItem.setAttribute('data-source-url', item.link);

            gridItem.style.flex = `${item.ratio || 1} 1 0px`;
            gridItem.innerHTML = item.html;
            rowDiv.appendChild(gridItem);

            const video = gridItem.querySelector('video');
            if (video) {
                video.play().catch(() => { });
            }
        });

        grid.appendChild(rowDiv);
    });

    window.dispatchEvent(new CustomEvent('galleryRandomized'));
}

