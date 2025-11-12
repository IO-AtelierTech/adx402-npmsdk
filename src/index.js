import { getEnv } from './utils/env.js';
import { createImage, createFallbackImage } from './utils/dom.js';

const config = getEnv();

const state = {
    wallet: null,
    tags: [],
    initialized: false,
};

export const adx402 = {
    init({ wallet, tags = [] }) {
        if (!wallet) throw new Error('adx402.init: wallet is required');
        state.wallet = wallet;
        state.tags = tags;
        state.initialized = true;
    },

    async render(selector, { aspectRatio = '16x9', fallback = '' } = {}) {
        if (!state.initialized) throw new Error('adx402: init must be called first');
        const container = document.querySelector(selector);
        if (!container) throw new Error(`adx402: container not found for ${selector}`);

        try {
            const slotId = selector.replace('#', '');
            const url = `${config.AD_SERVER_URL}/publisher/ad/?wallet=${state.wallet}&slot=${slotId}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('adx402: failed to fetch ad');

            const response = await res.json();
            const ad = response.data;

            // Check if ad data is null (no ads available)
            if (!ad) {
                throw new Error('adx402: no ads available');
            }

            // Impression tracking
            const impressionRes = await fetch(`${config.AD_SERVER_URL}/publisher/track-impression`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    adId: ad.id, 
                    slotId: slotId, 
                    wallet: state.wallet 
                }),
            });
            
            let impressionId = null;
            if (impressionRes.ok) {
                const impressionData = await impressionRes.json();
                impressionId = impressionData.data?.impressionId;
            }

            const img = createImage(ad.imageUrl, aspectRatio, async () => {
                if (!impressionId) {
                    console.error('adx402: no impression ID available for click tracking');
                    window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
                    return;
                }

                try {
                    const clickRes = await fetch(`${config.AD_SERVER_URL}/publisher/track-click`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ impressionId: impressionId }),
                    });
                    if (!clickRes.ok) throw new Error('click tracking failed');
                } catch (e) {
                    console.error('adx402 click tracking error:', e);
                } finally {
                    window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
                }
            });

            container.innerHTML = '';
            container.appendChild(img);
        } catch (err) {
            if (fallback) {
                const fallbackImg = createFallbackImage(fallback, aspectRatio);
                container.innerHTML = '';
                container.appendChild(fallbackImg);
            } else {
                console.error(err);
            }
        }
    },
};