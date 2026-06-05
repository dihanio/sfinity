export function
getExpenseCategories(
  transactions
) {

  const grouped = {};

  transactions

    .filter(
      (item) =>
        item.type ===
        "expense"
    )

    .forEach((item) => {

      const categoryName =

        item.category?.name ||

        "Unknown";

      grouped[
        categoryName
      ] =

        (grouped[
          categoryName
        ] || 0)

        + item.amount;

    });

  return Object.entries(
    grouped
  ).map(

    ([name, value]) => ({

      name,

      value,

    })

  );

}