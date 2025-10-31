"use client";
import api from "@/lib/api";

import { useForm } from "react-hook-form";
import useTransactionStore from "../../app/store/useTransactionsStore";

export default function CreateNewTransaction({ cards }) {
  const { addTransaction } = useTransactionStore();

  //console.log("ini cards inside createTransaction", cards);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transaction_type: "income",

      amount: "",
      category_id: "1",
      account_id: "1",
      note: "",
    },
  });
  const transactionType = watch("transaction_type");
  //console.log("this is transaction type", transactionType);

  const onSubmit = async (data) => {
    console.log("this is data", data);
    if (transactionType == "income") {
      try {
        const rest = await api.post("/income", data);
        //console.log("this is data", data);
        addTransaction(data);
        return console.log(rest);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    } else {
      try {
        const rest = await api.post("/expense", data);
        //console.log("this is data", data);
        addTransaction(data);
        return console.log(rest);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" type">
          <label htmlFor="transaction_type">type:</label>
          <select {...register("transaction_type")}>
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
        </div>
        <div className="amount">
          <label htmlFor="amount">amount:</label>
          <input
            id="amount"
            {...register("amount", {
              required: "Nominal wajib diisi",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/, // hanya angka + max 2 angka desimal
                message: "Hanya boleh angka atau desimal 2 digit",
              },
            })}
          ></input>
          {errors.amount && <span>{errors.amount.message}</span>}
        </div>
        <div className="account">
          <label htmlFor="account_id">Account:</label>
          <select
            id="account_id"
            {...register("account_id", { required: "wajib di isi" })}
          >
            <option value="">-- Pilih Akun --</option>
            {cards.map((item) => (
              <option key={item.id} value={item.id}>
                {item.account_name}
              </option>
            ))}
          </select>
          {errors.account_id && <span>Please select account first</span>}
        </div>
        <div className=" category">
          <label htmlFor="category">category:</label>
          <select {...register("category_id")}>
            {transactionType == "income" ? (
              <>
                <option value="1">gaji</option>
                <option value="2">bisnis</option>
                <option value="3">lain-lain</option>
              </>
            ) : (
              <>
                <option value="4"> Makanan & Minuman</option>
                <option value="5">Transportasi</option>
                <option value="6">Tagihan & Kebutuhan rumah</option>
                <option value="7">Hiburan & Gaya hidup</option>
                <option value="8">Kesehatan</option>
              </>
            )}
          </select>
        </div>
        <div className="note">
          <label htmlFor="note">note</label>
          <input
            type="text"
            {...register("note", { required: "wajib di isi" })}
          />
          {errors.note && <span>This field is required</span>}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
