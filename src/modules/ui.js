// src/modules/ui.js

// Utility untuk lazy-load background
function lazyLoadBackground(element, url) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.style.backgroundImage = `url(${url})`;
        obs.unobserve(element); // stop observing setelah loaded
      }
    });
  });
  observer.observe(element);
}

// Render daftar stage di index.html
export function renderStageList(stages, container) {
  container.innerHTML = "";
  container.classList.add("stage-container");

  stages.forEach(stage => {
    const card = document.createElement("div");
    card.className = "stage-card";

    // gambar map dari repo
    const mapImg = `https://raw.githubusercontent.com/fexli/ArknightsResource/main/mapreview/${stage.stageId}.png`;

    card.innerHTML = `
      <a href="detail.html?id=${stage.stageId}">
        <img src="${mapImg}" alt="${stage.code}" class="stage-preview">
        <div class="stage-info">
          <h3>${stage.code}</h3>
          <p>AP Cost: ${stage.apCost}</p>
        </div>
      </a>
    `;

    container.appendChild(card);
  });
}

// Render detail stage + drops + operator terkait
export function renderStageDetail(stageId, drops, itemsTable, opsByItem, containerDrops, containerOps) {
  containerDrops.innerHTML = `<h2>Stage ${stageId} Drops</h2>`;

  drops
    .filter(drop => drop.itemId !== "furni")
    .forEach(drop => {
      const item = itemsTable[drop.itemId];
      const itemName = item ? item.name : drop.itemId;

      const li = document.createElement("li");

      const imgSrc = item 
        ? `https://raw.githubusercontent.com/fexli/ArknightsResource/main/items/${item.iconId}.png`
        : "";

      li.innerHTML = `
        <div class="drop-row">
          ${imgSrc ? `<img src="${imgSrc}" alt="${itemName}" class="item-img">` : ""}
          <strong>${itemName}</strong> 
          (quantity: ${drop.quantity}, times: ${drop.times})
        </div>
      `;

      if (opsByItem[drop.itemId] && opsByItem[drop.itemId].length > 0) {
        const opsContainer = document.createElement("div");
        opsContainer.className = "ops-needed";

        opsByItem[drop.itemId].forEach(op => {
          const elite = op.elite === 2 ? 2 : 1;
          const opImg = `https://raw.githubusercontent.com/Aceship/Arknight-Images/main/characters/${op.id}_${elite}.png`;

          const opElem = document.createElement("div");
          opElem.className = "operator-item";
          opElem.innerHTML = `${op.name}`;

          opsContainer.appendChild(opElem);
        });

        li.appendChild(opsContainer);
      }

      containerDrops.appendChild(li);
    });

// ringkasan operator di bawah
const allOps = new Map();
Object.values(opsByItem).flat().forEach(op => {
  allOps.set(op.id, op);
});

containerOps.innerHTML = `
  <h2>Operators needing drops from this stage</h2>
  <p style="font-size:0.85rem; color:#555; margin-bottom:10px;">
    Click on the image for more details
  </p>
`;

allOps.forEach(op => {
  const eliteCount = op.phases ? op.phases.length : 0;
  const elite = eliteCount === 3 ? 2 : 1;
  const opImg = `https://raw.githubusercontent.com/Aceship/Arknight-Images/main/characters/${op.id}_${elite}.png`;

  // Buat link ke wiki
  const opLink = document.createElement("a");
  opLink.href = `https://arknights.wiki.gg/wiki/${encodeURIComponent(op.name)}`;
  opLink.target = "_blank"; // buka tab baru
  opLink.rel = "noopener noreferrer";
  opLink.className = "operator-summary";

  // Div gambar kosong dulu
  const opImgDiv = document.createElement("div");
  opImgDiv.className = "operator-img";

  // Lazy load pas masuk viewport
  lazyLoadBackground(opImgDiv, opImg);

  // Masukkan gambar + nama
  opLink.appendChild(opImgDiv);
  opLink.appendChild(document.createTextNode(` ${op.name}`));

  containerOps.appendChild(opLink);
});
}
export function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("hidden");
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
}
