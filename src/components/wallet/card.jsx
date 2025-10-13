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
  console.log(cards);
  if (!cards || cards.length === 0) {
    return <div>kosong. Please bikin kartu dulu</div>;
  }

  // const name = data.account_name;
  // const balance = data.balance;
  return (
    <div className="single-card">
      {cards.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.account_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Balance: {item.balance}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
