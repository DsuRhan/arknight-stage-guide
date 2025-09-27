// src/modules/api.js

// Toggle: ganti ke true kalau mau pakai file lokal
const USE_LOCAL = {
  stages: true,   // kalau true → ambil dari /assets/data/stages.json
  items: true,    // kalau true → ambil dari /assets/data/items.json
  operators: false, // tetap online, biar selalu update
};

const BASE_PENGUIN = {
  matrix: "https://penguin-stats.io/PenguinStats/api/v2/result/matrix",
  stages: "https://penguin-stats.io/PenguinStats/api/v2/stages",
};

const BASE_ACESHIP = {
  operator: "https://aceship.github.io/AN-EN-Tags/json/gamedata/en_US/gamedata/excel/character_table.json",
  itemsTable: "https://aceship.github.io/AN-EN-Tags/json/gamedata/en_US/gamedata/excel/item_table.json",
};

// Path lokal (simpen file json di sini)
const LOCAL_PATH = {
  stages: "/src/data/stages.json",
  items: "/src/data/items_table.json",
};

// Helper fetch dengan error handling
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  } catch (err) {
    console.error("[api.js] Fetch error:", err);
    return null;
  }
}

// ---------- EXPORT FUNCTIONS ----------

// Drop rate (harus online, dinamis)
export async function fetchMatrix() {
  return await safeFetch(BASE_PENGUIN.matrix);
}

// Stage list
export async function fetchStages() {
  const url = USE_LOCAL.stages ? LOCAL_PATH.stages : BASE_PENGUIN.stages;
  return await safeFetch(url);
}

// Item table
export async function fetchItemTable() {
  const url = USE_LOCAL.items ? LOCAL_PATH.items : BASE_ACESHIP.itemsTable;
  const data = await safeFetch(url);
  return data?.items || data || {};
}

// Operator data
export async function fetchOperators() {
  const url = USE_LOCAL.operators ? "/assets/data/operators.json" : BASE_ACESHIP.operator;
  return await safeFetch(url);
}
