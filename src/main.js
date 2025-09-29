// src/main.js
// Entry point: atur logic untuk index.html dan detail.html

import { fetchStages, fetchMatrix, fetchOperators, fetchItemTable } from "./modules/api.js";
import { renderStageList, renderStageDetail,showLoader, hideLoader  } from "./modules/ui.js";
import { findOperatorsByMaterial } from "./modules/utils.js";

if (document.getElementById("stageList")) {
  (async () => {
    try {
      showLoader();

      console.log("[main.js] Fetching stages...");
      const stages = await fetchStages();

      console.log("[main.js] Stages fetched:", stages?.length || 0);
      renderStageList(stages, document.getElementById("stageList"));
    } catch (err) {
      console.error("Error loading stages:", err);
      document.getElementById("stageList").innerHTML =
        `<li class="error">Failed to load stage list.</li>`;
    } finally {
      hideLoader();
    }
  })();
}




// --- Index Page (list stage) ---
if (document.getElementById("stageList")) {
  (async () => {
    console.log("[main.js] DOM ready - index.html");
    try {
      const stages = await fetchStages();
      renderStageList(stages, document.getElementById("stageList"));
    } catch (err) {
      document.getElementById("stageList").innerHTML = `<li class="error">Failed to load stages.</li>`;
    }
  })();
}

// --- Detail Page (stage info + drops + operator) ---
      
if (document.getElementById("dropsList")) {
  (async () => {
    console.log("[main.js] DOM ready - detail.html");
     showLoader();

    try {
      const params = new URLSearchParams(window.location.search);
      const stageId = params.get("id");

      if (!stageId) {
        document.getElementById("dropsList").innerHTML = `<li class="error">No stage selected.</li>`;
        return;
      }

      console.log("[main.js] Fetching data for stageId=" + stageId);

      
      const [matrix, itemsTable, operators] = await Promise.all([
        fetchMatrix(),
        fetchItemTable(),
        fetchOperators()
      ]);

      // filter drop khusus stage ini
      const stageDrops = matrix.filter(m => m.stageId === stageId);


      // buat map item → operator list
          const opsByItem = {};
      for (const drop of stageDrops) {
        opsByItem[drop.itemId] = findOperatorsByMaterial(operators, drop.itemId);
      }

      renderStageDetail(
        stageId,
        stageDrops,
        itemsTable,
        opsByItem,
        document.getElementById("dropsList"),
        document.getElementById("operatorsList")
      );
    } catch (err) {
      console.error("Error loading stage detail:", err);
      document.getElementById("dropsList").innerHTML = `<li class="error">Failed to load stage detail.</li>`;
    }finally {
      hideLoader();
    }
  })();
};
