export function createImage(src, aspectRatio, onClick) {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';
    img.style.aspectRatio = aspectRatio;
    img.loading = 'lazy';
    img.style.cursor = 'pointer';
    img.addEventListener('click', onClick);
    return img;
}

export function createFallbackImage(src, aspectRatio) {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';
    img.style.aspectRatio = aspectRatio;
    return img;
}