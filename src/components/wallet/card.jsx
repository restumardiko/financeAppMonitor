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
    <div className="flex flex-col md:flex-row">
      {cards.map((item, index) => (
        <Card
          key={item.account_id}
          onClick={() => handleClick(item.account_id)}
          className={`
            w-80
            rounded-md shadow p-4 transition-all duration-500
            hover:z-20 hover:-translate-y-2 hover:-translate-x-2 hover:scale-[1.02]
            ${
              activeId === item.account_id
                ? "bg-emerald-100 scale-105"
                : "bg-gray-50"
            }
            ${index === 0 ? "md:mt-0 ml-0" : "md:-ml-40 -mt-20"}
          `}
        >
          <CardHeader>
            <CardTitle className="text-xl text-emerald-700 font-semibold">
              {item.account_name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
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
