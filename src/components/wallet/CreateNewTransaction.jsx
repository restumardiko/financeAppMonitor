"use client";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { CornerRightUp, CornerRightDown } from "lucide-react";

export default function CreateNewTransaction({ cards }) {
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "", // "success" | "error"
    message: "",
  });
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    reset,
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
  // change border on form either it income or expense

  const transactionType = watch("transaction_type");
  let ringClass = "focus:ring-amber-400";
  let bgClass = "bg-emerald-700 hover:bg-emerald-800";

  if (transactionType === "income") {
    ringClass = "focus:ring-emerald-700";
    bgClass = "bg-emerald-700 hover:bg-emerald-800";
  } else if (transactionType === "expense") {
    ringClass = "focus:ring-red-500";
    bgClass = "bg-red-500 hover:bg-red-800";
  }

  console.log("ini transactions type", transactionType);

  // Fungsi POST ke server
  const postTransaction = async (data) => {
    const res = await api.post("/addTransaction", data);
    console.log("ini respon dari useMutation ya", res.data.data);
    return res.data.data;
  };
  const addTransaction = useMutation({
    mutationFn: postTransaction,

    onSuccess: (newTransaction) => {
      queryClient.setQueryData(["latestTransactions"], (old = []) => [
        newTransaction,
        ...old,
      ]);

      queryClient.invalidateQueries(["account"]);
      queryClient.invalidateQueries(["userInformation"]);
      reset();

      //  POP OUT SUCCES
      setPopup({
        show: true,
        type: "success",
        message: "Transaction successfully added ✔",
      });

      setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
        setShowForm(false);
      }, 2500);
    },

    onError: () => {
      //  POP OUT GAGAL
      setPopup({
        show: true,
        type: "error",
        message: "Failed to add transaction ❌",
      });

      setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
      }, 5000);
    },
  });

  // Submit form
  const onSubmit = (data) => {
    addTransaction.mutate(data);
  };
  useEffect(() => {
    if (!transactionType) return;

    reset({
      transaction_type: transactionType,
      amount: "",
      category_id: "",
      account_id: "",
      note: "",
    });
  }, [transactionType, reset]);

  return (
    <div className="w-full  bg-white  space-y-10">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-emerald-600 text-white  py-2 rounded w-40"
      >
        {showForm ? "Close" : "Add Transaction +"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* TYPE */}
          <div className="flex flex-col gap-1">
            <label className="">Type</label>
            <select
              {...register("transaction_type", { required: true })}
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${ringClass}`}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.transaction_type && (
              <p className="text-xs text-red-500">
                What type of your transaction bro ?
              </p>
            )}
          </div>

          {/* AMOUNT */}
          <div className="flex flex-col gap-1">
            <label className="">Amount</label>
            <input
              {...register("amount", {
                required: "Nominal wajib diisi",
                pattern: {
                  value: /^\d+$/,
                  message: "Hanya boleh angka, tanpa titik maupun desimal yak",
                },
              })}
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${ringClass}`}
              placeholder="10000"
            />
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* ACCOUNT */}
          <div className="flex flex-col gap-1">
            <label className="">Account</label>
            <select
              {...register("account_id", { required: true })}
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${ringClass}`}
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
            <label className="">Category</label>
            <select
              {...register("category_id", { required: true })}
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${ringClass}`}
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
            {errors.category_id && (
              <p className="text-xs text-red-500">
                Please select category first
              </p>
            )}
          </div>

          {/* NOTE */}
          <div className="flex flex-col gap-1">
            <label className="">Note</label>
            <input
              type="text"
              {...register("note", { required: "Wajib diisi" })}
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${ringClass}`}
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
            className={`w-full rounded-xl ${bgClass} py-2 text-sm font-semibold text-white hover:bg-amber-600 transition disabled:opacity-50`}
          >
            {addTransaction.isPending ? "Saving..." : "Submit"}
          </button>
        </form>
      )}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className={`w-[90%] max-w-sm rounded-2xl p-6 text-center shadow-xl text-white
        ${popup.type === "success" ? "bg-emerald-600" : "bg-red-600"}
      `}
          >
            <h2 className="mb-2 text-lg font-bold">
              {popup.type === "success" ? "Success " : "Error ❌"}
            </h2>

            <p className="text-sm">{popup.message}</p>

            <button
              onClick={() => setPopup({ show: false, type: "", message: "" })}
              className="mt-4 rounded-lg bg-white/20 px-5 py-2 text-sm hover:bg-white/30 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
