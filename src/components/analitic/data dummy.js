export default function generateDummyTransactions() {
  const accounts = ["Dana", "ovo", "Aleena", "BRI", "BPD", "sy"];

  const incomeCategories = ["Gaji", "Bisnis", "Lain-lain"];
  const expenseCategories = [
    "Makanan & Minuman",
    "Transportasi",
    "Tagihan & Kebutuhan Rumah",
    "Hiburan & Gaya Hidup",
    "Kesehatan",
  ];

  const types = ["Income", "Expense"];

  const result = [];
  const startYear = 2025;
  const totalYears = 3;

  for (let year = startYear; year < startYear + totalYears; year++) {
    for (let month = 0; month < 12; month++) {
      for (let i = 0; i < 10; i++) {
        const type = types[Math.floor(Math.random() * types.length)];

        const amount =
          type === "Income"
            ? (Math.floor(Math.random() * 9 + 1) * 100000).toString()
            : (Math.floor(Math.random() * 9 + 1) * 10000).toString();

        const categoryList =
          type === "Income" ? incomeCategories : expenseCategories;

        const category_name =
          categoryList[Math.floor(Math.random() * categoryList.length)];

        const date = new Date(
          year,
          month,
          Math.floor(Math.random() * 28 + 1),
          Math.floor(Math.random() * 23),
          Math.floor(Math.random() * 59)
        );

        result.push({
          account_name: accounts[Math.floor(Math.random() * accounts.length)],
          amount,
          category_name,
          created_at: date.toISOString(),
          note: type === "Income" ? "dummy income" : "dummy expense",
          type,
        });
      }
    }
  }

  return result;
}
