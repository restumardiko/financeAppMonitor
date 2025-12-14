"use client";
import api from "@/lib/api";
import Link from "next/link";
import CreateNewTransaction from "../../../components/wallet/CreateNewTransaction";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CardAccount from "../../../components/wallet/card";
import TransactionsHistory from "../../../components/wallet/transactions_hystory";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export default function Wallet() {
  //state buat add account nanti wajib bikin component baru buat form jangan disini
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "", // "success" | "error"
    message: "",
  });

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const res = await api.get("/showAccount");
      console.log("ini data dari account", res.data.data);

      return res.data.data;
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fungsi POST ke server
  const postAccount = async (data) => {
    const res = await api.post("/addAccount", data);
    console.log("ini yang mau tak post ke server", data);
    return res.data.data;
  };

  const addAccount = useMutation({
    mutationFn: postAccount,
    onSuccess: (newAccount) => {
      const normalized = {
        account_id: newAccount.id,
        account_name: newAccount.account_name,
        total_balance: newAccount.initial_balance,
      };
      // update cache
      console.log("ini new Account yang di return dari useMutate", newAccount);
      queryClient.setQueryData(["account"], (old = []) => [normalized, ...old]);

      //refetch server
      queryClient.invalidateQueries(["userInformation"]);
      reset();
      //  POP OUT SUCCES
      setPopup({
        show: true,
        type: "success",
        message: "Account successfully added ✔",
      });

      setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
        setShowForm(false);
      }, 5000);
    },
    onError: (err) => {
      console.log(err.response?.data || err.message);
      //pop out gagal
      setPopup({
        show: true,
        type: "error",
        message: "Failed to add account ❌",
      });

      setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
      }, 5000);
      // rollback kalau gagal
      queryClient.setQueryData(["account"], context.prevData);
    },
  });

  const onSubmit = async (data) => {
    addAccount.mutate(data);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <h1 className="text-2xl text-emerald-600 font-bold">Wallet</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-emerald-600 text-white w-40 py-2 rounded"
      >
        {showForm ? "Close Form" : "Add account +"}
      </button>

      {/* Add Account Form */}
      {showForm && (
        <div className="add_account_form">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                {...register("name", {
                  required: "this field is required",
                  maxLength: {
                    value: 18,
                    message: "too much bro",
                  },
                })}
                className="border p-2 rounded"
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Balance */}
            <div className="flex flex-col gap-1">
              <label htmlFor="balance">Balance</label>
              <input
                id="balance"
                className="border p-2 rounded"
                {...register("total_balance", {
                  required: "Nominal wajib diisi",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/, // angka + max 2 desimal
                    message: "Hanya boleh angka atau desimal 2 digit",
                  },
                })}
              />
              {errors.total_balance && (
                <p className="text-sm text-red-500">
                  {errors.total_balance.message}
                </p>
              )}
            </div>

            {/* Account Type */}
            <div className="flex flex-col gap-1">
              <label htmlFor="account_type">Type</label>
              <select
                id="account_type"
                {...register("account_type")}
                className="border p-2 rounded"
              >
                <option value="cash">Cash</option>
                <option value="e-wallet">E-Wallet</option>
                <option value="bank">Bank</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-emerald-700 text-white px-4 py-2 w-full rounded-xl text-sm font-semibold  hover:bg-emerald-800 transition disabled:opacity-50"
            >
              Submit
            </button>
          </form>
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
                  onClick={() =>
                    setPopup({ show: false, type: "", message: "" })
                  }
                  className="mt-4 rounded-lg bg-white/20 px-5 py-2 text-sm hover:bg-white/30 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Card List */}
      <div className="cardList">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading data</p>
        ) : !data || data.length === 0 ? (
          <p>Please make account first</p>
        ) : (
          <div className="space-y-6">
            <div className="">
              <CardAccount cards={data} />
            </div>

            <CreateNewTransaction cards={data} />
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="recent_transaction space-y-2">
        <p className="font-semibold text-amber-600 ">Transactions</p>
        <TransactionsHistory />
      </div>

      {/* See More */}
      <Link href="../mainpage/transactions">
        <div className="see_more text-emerald-800 underline cursor-pointer">
          See More &gt;&gt;
        </div>
      </Link>
    </div>
  );
}
