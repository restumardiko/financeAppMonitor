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
      // update cache
      console.log("ini new Account yang di return dari useMutate", newAccount);
      queryClient.setQueryData(["account"], (old = []) => [newAccount, ...old]);

      //refetch server
      //queryClient.invalidateQueries(["account"]);
    },
    onError: (err) => {
      console.log(err.response?.data || err.message);
      // rollback kalau gagal
      queryClient.setQueryData(["account"], context.prevData);
    },
  });

  const onSubmit = async (data) => {
    addAccount.mutate(data);
  };

  return (
    <div className="">
      <h1>Wallet</h1>
      <div className="add_account_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" {...register("name", { required: true })} />
            {errors.name && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="balance">Balance:</label>
            <input
              id="balance"
              {...register("initial_balance", {
                required: "Nominal wajib diisi",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/, // hanya angka + max 2 angka desimal
                  message: "Hanya boleh angka atau desimal 2 digit",
                },
              })}
            ></input>
            {errors.balance && <p>{errors.balance.message}</p>}
          </div>
          <div>
            <label htmlFor="account_type">type:</label>
            <select {...register("account_type")}>
              <option value="cash">cash</option>
              <option value="e-wallet">e-wallet</option>
              <option value="other">other</option>
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="cardList">
        {isLoading ? (
          <>Loading...</>
        ) : isError ? (
          <>Error loading data</>
        ) : !data || data.length === 0 ? (
          <>Please make account first</>
        ) : (
          <div>
            <CardAccount cards={data} />
            <div className="transactions">
              <CreateNewTransaction cards={data} />
            </div>
          </div>
        )}
      </div>

      <div className="recent_transaction">
        <p>transactions</p>
        <TransactionsHistory />
      </div>
      <Link href="../mainpage/transactions">
        <div className="see_more">See More {">>"}</div>
      </Link>
    </div>
  );
}
