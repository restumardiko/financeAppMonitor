export default function TransactionsCard({ transactions }) {
  return (
    <div className="recent_transactions gap-2 flex flex-col">
      {Array.isArray(transactions) && transactions.length > 0 ? (
        transactions.map((item, index) => (
          <div key={index} className="flex flex-row gap-1 ">
            <div>{item.type}</div>
            <div>{item.amount}</div>
            <div>{item.created_at}</div>
          </div>
        ))
      ) : (
        <div>No transactions</div>
      )}
    </div>
  );
}
