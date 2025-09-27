// src/modules/ui.js
// Modul untuk render elemen HTML

// Render daftar stage di index.html
export function renderStageList(stages, container) {
  container.innerHTML = "";
  stages.forEach(stage => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="detail.html?id=${stage.stageId}">
      ${stage.code} - ${stage.apCost} AP
    </a>`;
    container.appendChild(li);
  });
}

// Render detail stage + drops + operator terkait
export function renderStageDetail(stageId, drops, itemsTable, opsByItem, containerDrops, containerOps) {
  containerDrops.innerHTML = `<h2>Stage ${stageId} Drops</h2>`;
  drops.forEach(drop => {
    const item = itemsTable[drop.itemId];
    const itemName = item ? item.name : drop.itemId;
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${itemName}</strong> 
      (quantity: ${drop.quantity}, times: ${drop.times})
    `;

    // tambahkan daftar operator yang butuh item ini
    if (opsByItem[drop.itemId] && opsByItem[drop.itemId].length > 0) {
      const ops = opsByItem[drop.itemId].join(", ");
      const sub = document.createElement("div");
      sub.className = "ops-needed";
      sub.textContent = `Used by: ${ops}`;
      li.appendChild(sub);
    }

    containerDrops.appendChild(li);
  });

  // Ringkasan operator di bawah
  const allOps = new Set(Object.values(opsByItem).flat());
  containerOps.innerHTML = `
    <h2>Operators needing drops from this stage</h2>
    <p>${Array.from(allOps).join(", ") || "None"}</p>
  `;
}
