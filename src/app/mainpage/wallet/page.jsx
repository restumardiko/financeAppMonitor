"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Wallet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data); // Form data when submitted
  };
  useEffect(() => {}, []);
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
            <label htmlFor="type">type:</label>
            <select {...register("type")}>
              <option value="cash">cash</option>
              <option value="e-wallet">e-wallet</option>
              <option value="other">other</option>
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="cardList">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Rp.xxxxxxxxxx</p>
          </CardContent>
          <CardFooter>
            <p>6 persen less than last month</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
