"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatIDR } from "../../lib/idrCurrency";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export default function CardAccount({ cards }) {
  const [popup, setPopup] = useState({
    show: false,
    type: "", // "success" | "error"
    message: "",
  });
  const [activeId, setActiveId] = useState(null);
  const queryClient = useQueryClient();

  const handleClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  //fungsi delete ke server
  const deleteFunction = async (account_id) => {
    const res = await api.delete("/deleteAccount", {
      data: { account_id },
    });
    console.log("ini respon  dari useMutation buat delete account", res.data);
    return res.data.data;
  };
  //
  const deleteAccount = useMutation({
    mutationFn: deleteFunction,

    onSuccess: () => {
      console.log("delete acccount success bro");
      queryClient.invalidateQueries(["account"]);
      queryClient.invalidateQueries(["userInformation"]);

      //  POP OUT SUCCES
      //  POP OUT SUCCES
      setPopup({
        show: true,
        type: "success",
        message: "Account successfully deleted",
      });
      setTimeout(() => {
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
  const handleTrash = (id) => {
    deleteAccount.mutate(id);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row ">
        {cards.map((item, index) => (
          <Card
            key={item.account_id}
            onClick={() => handleClick(item.account_id)}
            className={`
            flex-col
            justify-between
            md:w-80
            md:h-36
       
            rounded-md shadow  transition-all duration-500
            cursor-pointer 

            ${
              activeId === item.account_id
                ? "bg-gray-50 scale-105 z-30"
                : "bg-gray-50 scale-100 z-0"
            }

            ${index === 0 ? "mt-0 ml-0" : "md:-ml-40 -mt-24 md:-mt-0"}
          `}
          >
            <CardHeader className="min-h-8">
              <CardTitle
                className={
                  item.account_name.length >= 10
                    ? "text-xl md:text-lg text-emerald-700 font-semibold"
                    : "text-xl text-emerald-700 font-semibold"
                }
              >
                {item.account_name}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col ">
              <div className=" flex flex-row justify-between">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <div>
                  {item.is_deletable && (
                    <Trash2 onClick={() => handleTrash(item.account_id)} />
                  )}
                </div>
              </div>
              <p className="text-xl font-bold text-amber-600">
                {formatIDR.format(item.total_balance || item.initial_balance)}
              </p>
            </CardContent>
          </Card>
        ))}
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
