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
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-zinc-200 bg-white">
      <div className="flex justify-around items-center py-3">
        <Link
          href="/mainpage"
          className="flex flex-col items-center gap-1 text-xs text-zinc-600 hover:text-black"
        >
          <HomeIcon />
          <span>Home</span>
        </Link>

        <Link
          href="/mainpage/wallet"
          className="flex flex-col items-center gap-1 text-xs text-zinc-600 hover:text-black"
        >
          <CardIcon />
          <span>Wallet</span>
        </Link>

        <Link
          href="/mainpage/analitic"
          className="flex flex-col items-center gap-1 text-xs text-zinc-600 hover:text-black"
        >
          <AnaliticIcon />
          <span>Analytic</span>
        </Link>

        <Link
          href="/mainpage/profile"
          className="flex flex-col items-center gap-1 text-xs text-zinc-600 hover:text-black"
        >
          <ProfileIcon />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}
