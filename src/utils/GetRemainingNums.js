export function remainingValues(boardState) {
  let i, j;
  let one = 9,
    two = 9,
    three = 9,
    four = 9,
    five = 9,
    six = 9,
    seven = 9,
    eight = 9,
    nine = 9;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (boardState[i][j] === 1) one--;
      if (boardState[i][j] === 2) two--;
      if (boardState[i][j] === 3) three--;
      if (boardState[i][j] === 4) four--;
      if (boardState[i][j] === 5) five--;
      if (boardState[i][j] === 6) six--;
      if (boardState[i][j] === 7) seven--;
      if (boardState[i][j] === 8) eight--;
      if (boardState[i][j] === 9) nine--;
    }
  }

  const playableVals = [one, two, three, four, five, six, seven, eight, nine];

  return playableVals;
}
