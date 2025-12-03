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

export default function CardAccount({ cards }) {
  console.log("inimas", cards);

  // const name = data.account_name;
  // const balance = data.balance;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((item) => (
        <Card
          key={item.account_id}
          className="rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-emerald-700 font-semibold">
              {item.account_name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Total Balance</p>

            <p className="text-xl font-bold text-amber-600">
              Rp{" "}
              {Number(
                item.total_balance || item.initial_balance
              ).toLocaleString("id-ID")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
