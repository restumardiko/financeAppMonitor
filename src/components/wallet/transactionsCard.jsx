"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowBigDown,
  ArrowBigUp,
  LockKeyholeIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import api from "@/lib/api";

export default function TransactionsCard({ transactions }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [popup, setPopup] = useState({
    show: false,
    type: "", // "success" | "error"
    message: "",
  });
  const queryClient = useQueryClient();
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  //fungsi delete ke server
  const deleteFunction = async (id) => {
    console.log("ini id ya bro", id);
    const res = await api.delete(`/deleteTransaction/${id}`);
    console.log(
      "ini respon  dari useMutation buat delete transaction",
      res.data
    );
    return res.data.data;
  };
  //
  const deleteTransaction = useMutation({
    mutationFn: deleteFunction,

    onSuccess: () => {
      console.log("delete transaction success bro");
      queryClient.invalidateQueries(["account"]);
      queryClient.invalidateQueries(["userInformation"]);

      queryClient.invalidateQueries(["latestTransactions"]);

      //  POP OUT SUCCES
      //  POP OUT SUCCES
      setPopup({
        show: true,
        type: "success",
        message: "transaction successfully deleted",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["transaction"]);
        setPopup({ show: false, type: "", message: "" });
      }, 5000);
    },

    onError: (error) => {
      console.log("ERROR FULL:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR MESSAGE:", error.response?.data?.message);
      //popout error
      setPopup({
        show: true,
        type: "error",
        message: error.response?.data?.message,
      });

      setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
      }, 5000);
    },
  });

  // Submit form
  const onDeleteTransactionHandle = (id) => {
    deleteTransaction.mutate(id);
  };

  //time
  const now = new Date();
  const startOfDay = new Date(
    now.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }) +
      "T00:00:00+07:00"
  );
  const nextDay = new Date(startOfDay);
  nextDay.setDate(nextDay.getDate() + 1);

  // console.log("ini now", now);
  // console.log("ini startofday", startOfDay);
  // console.log("ini nextDay", nextDay);
  // console.log("ini  type of nextDay", typeof nextDay);
  // console.log("ini  type of created at", typeof transactions[0].created_at);

  return (
    <div>
      <div className="recent_transactions flex flex-col gap-3">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className="flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-row gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      item.type === "Income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.type === "Income" ? <ArrowBigDown /> : <ArrowBigUp />}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    •{" "}
                    {new Date(item.created_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* AMOUNT */}
                <div
                  className={`text-sm font-bold ${
                    item.type === "Income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Rp {Number(item.amount).toLocaleString("id-ID")}
                </div>
              </div>

              {openIndex === index && (
                <div className="rounded-lg bg-zinc-50 p-3 text-sm text-amber-500 border flex flex-row justify-between">
                  <div className="info_text">
                    <p>
                      <span className="font-semibold">Type: </span>
                      <span className="text-gray-600">{item.type}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Category: </span>
                      <span className="text-gray-600">
                        {item.category_name}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Note: </span>
                      <span className="text-gray-600"> {item.note || "-"}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Account: </span>
                      <span className="text-gray-600">
                        {" "}
                        {item.account_name || "-"}
                      </span>
                    </p>
                  </div>
                  <div className="trash_button my-auto">
                    {new Date(item.created_at) >= startOfDay &&
                    new Date(item.created_at) < nextDay ? (
                      <Trash2Icon
                        className="text-black"
                        onClick={() => onDeleteTransactionHandle(item.id)}
                      />
                    ) : (
                      <LockKeyholeIcon />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-zinc-100 p-4 text-center text-sm text-zinc-500">
            No transactions
          </div>
        )}
      </div>
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
