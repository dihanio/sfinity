export function getLevelInfo(
  xp = 0
) {

  if (xp >= 15000)
    return 15;

  if (xp >= 12500)
    return 14;

  if (xp >= 10000)
    return 13;

  if (xp >= 8200)
    return 12;

  if (xp >= 6500)
    return 11;

  if (xp >= 5000)
    return 10;

  if (xp >= 3800)
    return 9;

  if (xp >= 2800)
    return 8;

  if (xp >= 2000)
    return 7;

  if (xp >= 1400)
    return 6;

  if (xp >= 900)
    return 5;

  if (xp >= 500)
    return 4;

  if (xp >= 250)
    return 3;

  if (xp >= 100)
    return 2;

  return 1;

}