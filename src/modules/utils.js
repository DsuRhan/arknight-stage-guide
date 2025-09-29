// src/modules/utils.js
// Cari operator yang membutuhkan itemId
export function findOperatorsByMaterial(operators, itemId) {
  const result = [];

  for (const [opId, opData] of Object.entries(operators)) {
    const opName = opData.name || opId;

    let found = false;

    // --- Elite promotion ---
    for (const phase of opData.phases || []) {
      for (const cost of phase.evolveCost || []) {
        if (cost.id === itemId) {
          found = true;
        }
      }
    }

    // --- Skill leveling ---
    for (const skill of opData.skills || []) {
      for (const lvl of skill.levelUpCostCond || []) {
        for (const cost of lvl.levelUpCost || []) {
          if (cost.id === itemId) {
            found = true;
          }
        }
      }
    }

    // --- Mastery / skill upgrade ---
    for (const skill of opData.skills || []) {
      for (const upgrade of skill.skillUpgrade || []) {
        for (const cost of upgrade.levelUpCost || []) {
          if (cost.id === itemId) {
            found = true;
          }
        }
      }
    }

    // Jika ditemukan di salah satu kebutuhan, simpan full data operator
    if (found) {
      result.push({
        id: opId,
        name: opName,
        phases: opData.phases || []  // selalu simpan phases
      });
    }
  }

  // Hapus duplikat berdasarkan id
  const uniqueOps = [];
  const seen = new Set();
  for (const op of result) {
    if (!seen.has(op.id)) {
      seen.add(op.id);
      uniqueOps.push(op);
    }
  }

  return uniqueOps;
}
