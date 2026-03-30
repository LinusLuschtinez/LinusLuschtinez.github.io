/**
 * randomize.js - Predefined Home Layouts (HomeV1 - HomeV6).
 * Allows easy customization of the home page content.
 */

// --- CONFIGURATION ---
// Set preferred layout here: 'random', 'HomeV1', 'HomeV2', 'HomeV3', 'HomeV4', 'HomeV5', or 'HomeV6'
const HOME_CONFIG = {
    selectedLayout: 'random'
};

const HOME_LAYOUTS = {
    HomeV1: [
        { src: 'images/concert_photography/concert_45.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma3.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma3.webp' },
        { src: 'images/concert_photography/concert_41.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma2.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma2.webp' },
        { src: 'images/concert_photography/concert_66.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma1.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma1.webp' },
        { src: 'images/concert_photography/concert_25.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma4.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma4.webp' },
        { src: 'images/concert_photography/concert_5.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/luma5.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma5.webp' },
        { src: 'images/atmo/atmo_20.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'videos/luma6.mp4', type: 'video', aspect: 'portrait', category: 'Luma Media', link: 'videography.html#luma', poster: 'videos/video_preview/luma6.webp' },
        { src: 'images/concert_photography/concert_7.webp', type: 'image', aspect: 'landscape', category: 'Concert', link: 'photography.html#concert' },
        { src: 'videos/reel1.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/reel1.webp' },
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
        { src: 'videos/reel2.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/reel2.webp' },
        { src: 'images/atmo/atmo_5.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_lowkey/lowkey_5.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#lowkey-portraits' },
        { src: 'images/atmo/atmo_6.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_lowkey/lowkey_6.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#lowkey-portraits' },
        { src: 'images/atmo/atmo_7.webp', type: 'image', aspect: 'landscape', category: 'Atmosphere', link: 'photography.html#atmosphere' },
        { src: 'images/sandio_lowkey/lowkey_1.webp', type: 'image', aspect: 'portrait', category: 'Portraits', link: 'photography.html#lowkey-portraits' },
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
        { src: 'videos/audioVis3.mp4', type: 'video', aspect: 'portrait', category: 'Visual Art', link: 'visuals.html#audio-visuals', poster: 'videos/video_preview/audioVis3.webp' },
        { src: 'images/cross_web/Image16.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#WiesenCross' }
    ],
    HomeV4: [
        { src: 'videos/linus_home.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/linus_home_cov.webp' },
        { src: 'images/home2/home_1.webp', type: 'image', aspect: 'landscape', category: 'Photography', link: 'photography.html#bandfotos' },
        { src: 'videos/reel1.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/reel1.webp' },
        { src: 'images/interior/int_1.webp', type: 'image', aspect: 'landscape', category: 'Interior', link: 'photography.html#interior' },
        { src: 'videos/Door_Fin.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/door_cov.webp' },

        { src: 'images/home2/home_5.webp', type: 'image', aspect: 'landscape', category: 'Photography', link: 'photography.html#bandfotos' },
        { src: 'videos/Dublicate_Fin.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/dub_cov.webp' },
        { src: 'images/home2/home_6.webp', type: 'image', aspect: 'landscape', category: 'Photography', link: 'photography.html#bandfotos' },
        { src: 'videos/reel4.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/reel4.webp' },
        { src: 'images/home2/home_3.webp', type: 'image', aspect: 'landscape', category: 'Photography', link: 'photography.html#bandfotos' },

        { src: 'videos/Planted_Fin.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/plant_cov.webp' },
        { src: 'images/home2/home_7.webp', type: 'image', aspect: 'landscape', category: 'Photography', link: 'photography.html#bandfotos' },
        { src: 'videos/fw_reel1.mp4', type: 'video', aspect: 'portrait', category: 'Reels', link: 'videography.html#Reels', poster: 'videos/video_preview/fw_reel1.webp' },
        { src: 'images/interior/int_2.webp', type: 'image', aspect: 'landscape', category: 'Interior', link: 'photography.html#interior' },
        { src: 'videos/bts4_small.mov', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'about.html', poster: 'videos/video_preview/bts4_cov.webp' }

    ],
    HomeV5: [
        { src: 'videos/Winstage/Indian_Living_Pangea_Stil_1.mp4', type: 'video', aspect: 'portrait', category: 'Client Work', link: 'clientwork.html#Winstage', poster: 'videos/Winstage/pangea.png' },
        { src: 'images/Arrtist_on_tour/Arrtist_11.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#arrtist' },
        { src: 'videos/hohenems2.mp4', type: 'video', aspect: 'portrait', category: 'Client Work', link: 'clientwork.html#hohenems', poster: 'videos/video_preview/2_Thumbnail.webp' },
        { src: 'images/Arrtist_on_tour/Arrtist_2.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#arrtist' },
        { src: 'videos/Winstage/Reel_Winstage_1.mp4', type: 'video', aspect: 'portrait', category: 'Client Work', link: 'clientwork.html#Winstage', poster: 'videos/Winstage/Winstage1.webm' },

        { src: 'images/Arrtist_on_tour/Arrtist_67.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#arrtist' },
        { src: 'videos/hohenems3.mp4', type: 'video', aspect: 'portrait', category: 'Client Work', link: 'clientwork.html#hohenems', poster: 'videos/video_preview/3_Thumbnail.webp' },
        { src: 'images/Arrtist_on_tour/Arrtist_13.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#arrtist' },
        { src: 'videos/Winstage/Indian_Living_Umzug_Reel_2.mp4', type: 'video', aspect: 'portrait', category: 'Client Work', link: 'clientwork.html#Winstage', poster: 'videos/Winstage/Indian_Reel_2.png' },
        { src: 'images/Arrtist_on_tour/Arrtist_62.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#arrtist' },

        { src: 'videos/Winstage/Indian_Living_Umzug_Reel_1.mp4', type: 'video', aspect: 'portrait', category: 'Client Work', link: 'clientwork.html#Winstage', poster: 'videos/Winstage/Indian_Reel_1.png' },
        { src: 'images/Arrtist_on_tour/Arrtist_6.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#arrtist' },

        { src: 'images/Arrtist_on_tour/Arrtist_37.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#arrtist' },
        { src: 'videos/hohenems1.mp4', type: 'video', aspect: 'portrait', category: 'Client Work', link: 'clientwork.html#hohenems', poster: 'videos/video_preview/1_Thumbnail.webp' },
    ],
    HomeV6: [
        { src: 'images/fw_resized/fw_22.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' },
        { src: 'videos/Quicktip_1.mp4', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'videography.html#DavinciTips', poster: 'videos/video_preview/Quicktip_1.webp' },
        { src: 'images/fw_resized/fw_2.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' },
        { src: 'videos/Quicktip_4.mp4', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'videography.html#DavinciTips', poster: 'videos/video_preview/Quicktip_4.webp' },
        { src: 'images/fw_resized/fw_24.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' },

        { src: 'videos/Quicktip_8.mp4', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'videography.html#DavinciTips', poster: 'videos/video_preview/Quicktip_8.webp' },
        { src: 'images/fw_resized/fw_13.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' },
        { src: 'videos/part13.mp4', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'videography.html#DavinciTips', poster: 'videos/video_preview/part12.webp' },
        { src: 'images/fw_resized/fw_5.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' },
        { src: 'videos/part16.mp4', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'videography.html#DavinciTips', poster: 'videos/video_preview/part16.webp' },

        { src: 'images/fw_resized/fw_6.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' },
        { src: 'videos/part19.mp4', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'videography.html#DavinciTips', poster: 'videos/video_preview/part19.webp' },
        { src: 'images/fw_resized/fw_7.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' },
        { src: 'videos/part23.mp4', type: 'video', aspect: 'portrait', category: 'Cinematography', link: 'videography.html#DavinciTips', poster: 'videos/video_preview/part23.webp' },
        { src: 'images/fw_resized/fw_9.webp', type: 'image', aspect: 'landscape', category: 'Client Work', link: 'clientwork.html#fightersWorld' }
    ]
};


export async function initHomeRandomization() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    // Determine which layout to use based on config
    let randomKey = HOME_CONFIG.selectedLayout;

    if (randomKey === 'random') {
        const layoutKeys = Object.keys(HOME_LAYOUTS);
        randomKey = layoutKeys[Math.floor(Math.random() * layoutKeys.length)];
    } else if (!HOME_LAYOUTS[randomKey]) {
        console.warn(`Manual layout '${randomKey}' not found. Falling back to random.`);
        const layoutKeys = Object.keys(HOME_LAYOUTS);
        randomKey = layoutKeys[Math.floor(Math.random() * layoutKeys.length)];
    }

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

