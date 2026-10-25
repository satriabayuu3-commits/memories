
const gallery = document.querySelector(".gallery");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const pageInfo = document.querySelector("#pageInfo");

const photos = Array.from({ length: 33 }, (_, i) => {
    const number = i + 1;
    const extension = number <= 3 ? "jpeg" : "jpg";
    return `images/foto (${number}).${extension}`;
});

const perPage = 4;
let currentPage = 0;

function renderGallery() {
    gallery.innerHTML = "";

    const start = currentPage * perPage;
    const currentPhotos = photos.slice(start, start + perPage);

    currentPhotos.forEach((src, index) => {
        const number = start + index + 1;
        const card = document.createElement("figure");
        card.className = "photo-card";

        const img = document.createElement("img");
        img.src = src;
        img.alt = `Memory photo ${number}`;
        img.loading = "eager";

        img.addEventListener("error", () => {
            card.classList.add("photo-missing");
            img.alt = `Foto ${number} gagal dimuat`;
        });

        const label = document.createElement("span");
        label.className = "photo-number";
        label.textContent = String(number).padStart(2, "0");

        card.append(img, label);
        gallery.appendChild(card);
    });

    const totalPages = Math.ceil(photos.length / perPage);

    pageInfo.textContent =
        `${currentPage + 1} / ${totalPages}`;

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages - 1;
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        renderGallery();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(photos.length / perPage) - 1) {
        currentPage++;
        renderGallery();
    }
});

renderGallery();
