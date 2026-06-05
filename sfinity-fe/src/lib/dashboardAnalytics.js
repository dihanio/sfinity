export function calculatePercentageChange(
  current,
  previous
) {

  /*
  AVOID DIVIDE 0
  */
  if (
    previous === 0
  ) {

    return current > 0
      ? 100
      : 0;

  }

  return Math.round(

    (
      (
        current -
        previous
      ) / previous
    ) * 100

  );

}