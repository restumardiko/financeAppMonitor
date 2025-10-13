"use client";
import {
  Home,
  ContactRound,
  BadgeDollarSign,
  CreditCardIcon,
  ChartLineIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

function IconBuilder({ icon: Icon, ...props }) {
  return (
    <div className="">
      <Icon className="w-12 h-12 text-gray-600" {...props} />
    </div>
  );
}

function HomeIcon(props) {
  return <IconBuilder icon={Home} {...props} />;
}
function TransactionsIcon(props) {
  return <IconBuilder icon={BadgeDollarSign} {...props} />;
}
function AnaliticIcon(props) {
  return <IconBuilder icon={ChartLineIcon} {...props} />;
}
function CardIcon(props) {
  return <IconBuilder icon={CreditCardIcon} {...props} />;
}
function ProfileIcon(props) {
  return <IconBuilder icon={ContactRound} {...props} />;
}

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-around">
      <HomeIcon
        onClick={() => {
          router.push("/mainpage");
        }}
      />
      {/* <TransactionsIcon
        onClick={() => {
          router.push("/mainpage");
        }}
      /> */}
      <CardIcon
        onClick={() => {
          router.push("/mainpage/wallet");
        }}
      />
      <AnaliticIcon
        onClick={() => {
          router.push("/mainpage/analitic");
        }}
      />

      <ProfileIcon
        onClick={() => {
          router.push("/mainpage/profile");
        }}
      />
    </div>
  );
}
