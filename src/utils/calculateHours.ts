//TODO: CAMBARE
export const calcolaOre = (entries: Array<object>): string => {
  let totaleMinuti = 0;

  for (let i = 0; i < entries.length; i += 2) {
    const inTime = entries[i].time;
    const outTime = entries[i + 1]?.time;

    if (!outTime) continue;

    const [h1, m1] = inTime.split(":").map(Number);
    const [h2, m2] = outTime.split(":").map(Number);

    const minuti = (h2 * 60 + m2) - (h1 * 60 + m1);
    totaleMinuti += minuti;
  }

  return totaleMinuti / 60;
}

export const checkSforamento = (oreLavorate: number, oreContratto: number): number =>
  oreLavorate > oreContratto
    ? Number((oreLavorate - oreContratto).toFixed(2))
    : 0;
