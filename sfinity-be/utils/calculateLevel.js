export const calculateLevel = (xp = 0) => {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 900) return 4;
  if (xp < 1400) return 5;
  if (xp < 2000) return 6;
  if (xp < 2800) return 7;
  if (xp < 3800) return 8;
  if (xp < 5000) return 9;
  if (xp < 6500) return 10;
  if (xp < 8500) return 11;
  if (xp < 11000) return 12;
  if (xp < 14000) return 13;
  if (xp < 18000) return 14;
  if (xp < 23000) return 15;
  if (xp < 30000) return 16;

  return 17;
};