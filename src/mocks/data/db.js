export const db = {
  users: [
    {
      id: "u-1",
      name: "Demo",
      email: "demo@mail.com",
      password: "password123", // plain (mock only)
      refreshToken: null,
      refreshTokenExpires: null,
      created_at: new Date().toISOString(),
    },
  ],

  accounts: [],
  transactions: [],
  categories: [
    { id: "1", category_name: "Gaji", type: "Income" },
    { id: "2", category_name: "Bisnis", type: "Income" },
    { id: "3", category_name: "Lain-Lain", type: "Income" },
    { id: "4", category_name: "Makanan & Minuman", type: "Expense" },
    { id: "5", category_name: "Transportasi", type: "Expense" },
    { id: "6", category_name: "Tagihan & Kebutuhan rumah", type: "Expense" },
    { id: "7", category_name: "Hiburan & Gaya hidup", type: "Expense" },
    { id: "8", category_name: "Kesehatan", type: "Expense" },
  ],
};
