export default function TransactionsCard({ transactions }) {
  return (
    <div className="recent_transactions flex flex-col gap-3">
      {Array.isArray(transactions) && transactions.length > 0 ? (
        transactions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm"
          >
            {/* LEFT INFO */}
            <div className="flex flex-col">
              <span
                className={`text-xs font-semibold ${
                  item.type === "income" ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.type.toUpperCase()}
              </span>

              <span className="text-sm text-zinc-500">
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* AMOUNT */}
            <div
              className={`text-sm font-bold ${
                item.type === "income" ? "text-green-600" : "text-red-500"
              }`}
            >
              Rp {Number(item.amount).toLocaleString("id-ID")}
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-xl bg-zinc-100 p-4 text-center text-sm text-zinc-500">
          No transactions
        </div>
      )}
    </div>
  );
}
