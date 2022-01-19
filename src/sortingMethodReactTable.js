export function sortDates(a, b, desc) {
  if (a) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? -Infinity : a;
    b = b === null || b === undefined ? -Infinity : b;
    // force any string values to lowercase
    a = typeof a === "string" ? a.toLowerCase() : a;
    b = typeof b === "string" ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    const aSplitted = a.split("/");
    const bSplitted = b.split("/");
    console.log(aSplitted);
    a = `${aSplitted[2]}-${aSplitted[1]}-${aSplitted[0]}`;
    b = `${bSplitted[2]}-${bSplitted[1]}-${bSplitted[0]}`;
    console.log(a);

    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
  }
  return 0;
}
