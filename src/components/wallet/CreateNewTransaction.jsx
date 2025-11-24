"use client";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateNewTransaction({ cards }) {
  const queryClient = useQueryClient();
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
  console.log(transactionType);

  // Fungsi POST ke server
  const postTransaction = async (data) => {
    const res = await api.post("/addTransaction", data);
    console.log("ini respon ya", res.data);
    return res.data.data;
  };

  const addTransaction = useMutation({
    mutationFn: postTransaction,
    onSuccess: (newTransaction) => {
      // update cache
      queryClient.setQueryData(["latestTransactions"], (old = []) => [
        newTransaction,
        ...old,
      ]);

      //refetch server
      queryClient.invalidateQueries(["account"]);
    },
    onError: (err) => {
      console.log(err.response?.data || err.message);
      // rollback kalau gagal
      queryClient.setQueryData(["latestTtransactions"], context.prevData);
    },
    // onSettled: () => {
    //   //  refetch untuk sync ulang server
    //   queryClient.invalidateQueries(["transactions"]);
    // },
  });

  // Submit form
  const onSubmit = (data) => {
    addTransaction.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* type */}
        <div className="type">
          <label htmlFor="transaction_type">Type:</label>
          <select {...register("transaction_type")}>
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
        </div>

        {/* amount */}
        <div className="amount">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            {...register("amount", {
              required: "Nominal wajib diisi",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Hanya boleh angka atau desimal 2 digit",
              },
            })}
          />
          {errors.amount && <span>{errors.amount.message}</span>}
        </div>

        {/* account */}
        <div className="account">
          <label htmlFor="account_id">Account:</label>
          <select
            id="account_id"
            {...register("account_id", { required: "wajib di isi" })}
          >
            <option value="">-- Pilih Akun --</option>
            {cards.map((item) => (
              <option key={item.account_id} value={item.account_id}>
                {item.account_name}
              </option>
            ))}
          </select>
          {errors.account_id && <span>Please select account first</span>}
        </div>

        {/* category */}
        <div className="category">
          <label htmlFor="category">Category:</label>
          <select {...register("category_id")}>
            {transactionType === "income" ? (
              <>
                <option value="1">Gaji</option>
                <option value="2">Bisnis</option>
                <option value="3">Lain-lain</option>
              </>
            ) : (
              <>
                <option value="4">Makanan & Minuman</option>
                <option value="5">Transportasi</option>
                <option value="6">Tagihan & Rumah</option>
                <option value="7">Hiburan</option>
                <option value="8">Kesehatan</option>
              </>
            )}
          </select>
        </div>

        {/* note */}
        <div className="note">
          <label htmlFor="note">Note:</label>
          <input
            type="text"
            {...register("note", { required: "wajib di isi" })}
          />
          {errors.note && <span>This field is required</span>}
        </div>

        <button type="submit" disabled={addTransaction.isPending}>
          {addTransaction.isPending ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
