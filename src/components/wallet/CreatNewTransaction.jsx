"use client";
import api from "@/lib/api";

import { useForm } from "react-hook-form";

export default function CreateNewTransaction() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transaction_type: "income",
      transaction_date: new Date().toISOString(),
      amount: "",
      category: "",
      note: "",
    },
  });
  const transactionType = watch("transaction_type");
  console.log("this is transaction type", transactionType);

  const onSubmit = async (data) => {
    if (transactionType == "income") {
      try {
        const rest = await api.post("/income", data);
        console.log("this is data", data);
        return console.log(rest);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    } else {
      try {
        const rest = await api.post("/expense", data);
        console.log("this is data", data);
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
        <div className=" category">
          <label htmlFor="category">category:</label>
          <select {...register("category")}>
            {transactionType == "income" ? (
              <>
                <option value="gaji">gaji</option>
                <option value="bisni">bisnis</option>
                <option value="lain-lain">lain-lain</option>
              </>
            ) : (
              <>
                <option value="makanan_minuman "> Makanan & Minuman</option>
                <option value="transportasi">Transportasi</option>
                <option value="tagihan_kebutuhan rumah">
                  Tagihan & Kebutuhan rumah
                </option>
                <option value="hiburan_gaya hidup">Hiburan & Gaya hidup</option>
                <option value="kesehatan">Kesehatan</option>
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
