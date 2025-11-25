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
    <div className="single-card">
      {cards.map((item) => (
        <Card key={item.account_id}>
          <CardHeader>
            <CardTitle>{item.account_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Balance: {item.total_balance || item.initial_balance}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
