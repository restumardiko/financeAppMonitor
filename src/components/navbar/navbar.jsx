"use client";
import {
  Home,
  ContactRound,
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
      <AnaliticIcon
        onClick={() => {
          router.push("/mainpage/analitic");
        }}
      />
      <CardIcon
        onClick={() => {
          router.push("/mainpage/wallet");
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
