"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatIDR } from "../../lib/idrCurrency";
import { useState } from "react";

export default function CardAccount({ cards }) {
  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
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
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-xl font-bold text-amber-600">
              {formatIDR.format(item.total_balance || item.initial_balance)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
