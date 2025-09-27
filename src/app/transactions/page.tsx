export default function Transactions() {
  return (
    <>
      <div>
        this page should containe add expense, add income, displaying
        transaction history
      </div>
      <div id="plain_addincome">
        <form action="">
          <div>add income</div>
          <input type="number" placeholder="amount" />
          <select id="select">
            <option value="6th">ovo</option>
            <option value="7th">7Th</option>
          </select>
          <button>+add</button>
        </form>
      </div>
      <div id="plain_addExpense"></div>
    </>
  );
}
