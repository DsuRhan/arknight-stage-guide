// src/modules/utils.js
// Modul utilitas kecil

// Cari operator yang butuh item tertentu
export function findOperatorsByMaterial(operators, itemId) {
  const result = [];
  for (const [opId, opData] of Object.entries(operators)) {
    if (!opData || !opData.phases) continue;

    // cek setiap fase (upgrade) operator
    for (const phase of opData.phases) {
      if (!phase.evolveCost) continue;
      for (const cost of phase.evolveCost) {
        if (cost.id === itemId) {
          result.push(opData.name);
          break;
        }
      }
    }
  }
  return result;
}
