"use client";
import {
  Home,
  ContactRound,
  CreditCardIcon,
  ChartLineIcon,
} from "lucide-react";

function IconBuilder({ icon: Icon, ...props }) {
  return (
    <div className="">
      <Icon
        className="w-12 h-12 text-orange-500 cursor-pointer hover:text-blue-500"
        {...props}
      />
    </div>
  );
}

function HomeIcon(props) {
  return <IconBuilder icon={Home} {...props} />;
}
function AnaliticIcon() {
  return <IconBuilder icon={ChartLineIcon} />;
}
function CardIcon() {
  return <IconBuilder icon={CreditCardIcon} />;
}
function ProfileIcon() {
  return <IconBuilder icon={ContactRound} />;
}

export default function Navbar() {
  return (
    <div className="flex flex-row justify-around">
      <HomeIcon onClick={() => console.log("home icon clicked")} />
      <AnaliticIcon />
      <CardIcon />
      <ProfileIcon />
    </div>
  );
}
