"use client";
import Link from "next/link";
import {
  Home,
  ContactRound,
  BadgeDollarSign,
  CreditCardIcon,
  ChartLineIcon,
} from "lucide-react";

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
  return (
    <div className="flex flex-row justify-around">
      <Link href="/mainpage">
        <HomeIcon />
      </Link>
      <Link href="/mainpage/wallet">
        <CardIcon />
      </Link>
      <Link href="/mainpage/analitic">
        <AnaliticIcon />
      </Link>
      <Link href="/mainpage/profile">
        <ProfileIcon />
      </Link>
    </div>
  );
}
