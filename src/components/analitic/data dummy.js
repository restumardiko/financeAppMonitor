export default function generateDummyTransactions() {
  const accounts = ["Dana", "ovo", "Aleena", "BRI", "BPD", "asyf"];
  const categories = [
    "Bisnis",
    "Kesehatan",
    "Transportasi",
    "Lain-lain",
    "Gaji",
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

        const date = new Date(
          year,
          month,
          Math.floor(Math.random() * 28 + 1),
          Math.floor(Math.random() * 23),
          Math.floor(Math.random() * 59)
        );

        result.push({
          account_name: accounts[Math.floor(Math.random() * accounts.length)],
          amount: amount,
          category_name:
            categories[Math.floor(Math.random() * categories.length)],
          created_at: date.toISOString(),
          note: type === "Income" ? "dummy income" : "dummy expense",
          type: type,
        });
      }
    }
  }

  return result;
}
