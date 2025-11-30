"use client";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function CreateNewTransaction({ cards }) {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transaction_type: "",
      amount: "",
      category_id: "",
      account_id: "",
      note: "",
    },
  });

  const transactionType = watch("transaction_type");
  console.log(transactionType);

  // Fungsi POST ke server
  const postTransaction = async (data) => {
    const res = await api.post("/addTransaction", data);
    console.log("ini respon dari useMutation ya", res.data.data);
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
      queryClient.invalidateQueries(["userInformation"]);
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
    <div className="w-full max-w-md mx-auto rounded-2xl bg-white p-6 shadow-lg">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        {showForm ? "Close Form" : "Add Transaction +"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* TYPE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Type</label>
            <select
              {...register("transaction_type")}
              className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* AMOUNT */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Amount</label>
            <input
              {...register("amount", {
                required: "Nominal wajib diisi",
                pattern: {
                  value: /^\d+(\.\d{1,2})$/,
                  message: "Hanya boleh angka atau desimal 2 digit",
                },
              })}
              className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="10000"
            />
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* ACCOUNT */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Account</label>
            <select
              {...register("account_id", { required: true })}
              className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {cards.map((item) => (
                <option key={item.account_id} value={item.account_id}>
                  {item.account_name}
                </option>
              ))}
            </select>
            {errors.account_id && (
              <p className="text-xs text-red-500">
                Please select account first
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Category</label>
            <select
              {...register("category_id")}
              className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
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

          {/* NOTE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Note</label>
            <input
              type="text"
              {...register("note", { required: "Wajib diisi" })}
              className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Contoh: makan siang"
            />
            {errors.note && (
              <p className="text-xs text-red-500">{errors.note.message}</p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={addTransaction.isPending}
            className="w-full rounded-xl bg-amber-500 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition disabled:opacity-50"
          >
            {addTransaction.isPending ? "Saving..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
