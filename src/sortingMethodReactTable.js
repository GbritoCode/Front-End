export function sortDates(a, b, desc) {
  if (a) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? -Infinity : a;
    b = b === null || b === undefined ? -Infinity : b;

    const aSplitted = a.split("/");
    const bSplitted = b.split("/");

    a = `${aSplitted[2]}-${aSplitted[1]}-${aSplitted[0]}`;
    b = `${bSplitted[2]}-${bSplitted[1]}-${bSplitted[0]}`;

    // Return either 1 or -1 to indicate a sort priority
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

export function sortValues_MovCaixa(a, b, desc) {
  if (a) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? -Infinity : a;
    b = b === null || b === undefined ? -Infinity : b;

    let aValue =
      parseInt(a.props.children[0].props.children.replace(/[.,]+/g, ""), 10) /
      100;
    let bValue =
      parseInt(b.props.children[0].props.children.replace(/[.,]+/g, ""), 10) /
      100;

    aValue =
      a.props.children[1].props.className === "arrowUp"
        ? aValue
        : aValue * 9999999;
    bValue =
      b.props.children[1].props.className === "arrowUp"
        ? bValue
        : bValue * 9999999;

    // Return either 1 or -1 to indicate a sort priority
    if (aValue > bValue) {
      return 1;
    }
    if (aValue < bValue) {
      return -1;
    }
    // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
  }
  return 0;
}
