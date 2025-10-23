"use client";
import api from "@/lib/api";
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

export default function Wallet() {
  const fetchData = async () => {
    try {
      const res = await api.get("/account");
      console.log(res);

      setCards(res.data.data);

      //if()
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const [cards, setCards] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const rest = await api.post("/account", data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
              {...register("balance", {
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
        <CardAccount cards={cards} />
      </div>
      <div className="transactions">
        <CreateNewTransaction cards={cards} />
      </div>
      <div className="recent_transaction">
        <p>transactions</p>
        <TransactionsHistory />
      </div>
    </div>
  );
}
