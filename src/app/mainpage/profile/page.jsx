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
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import useUserInformation from "../../store/useUserInformation";
import { useEffect, useCallback, useState } from "react";

export default function Profile() {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      const result = await api.delete("/logOut");

      console.log(result.data);
      router.push("/login");
    } catch (err) {
      console.log("iini dari client", err.error);
    }
  };
  const { name, email, total_balance, created_at, fetchInformation } =
    useUserInformation();
  console.log(name, email, created_at, total_balance);
  const stableFetch = useCallback(() => {
    fetchInformation();
  }, [fetchInformation]);

  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  return (
    <div>
      <div>
        <div className="user_name">{name}</div>
        <div className="email">{email}</div>
        <div className="join_date">{created_at}</div>
        <div className="log_out">
          <button
            onClick={() => {
              setIsShow(true);
            }}
          >
            LogOut
          </button>
          <div>
            {isShow && (
              <div className="pop_out bg-amber-400">
                <h1>are you sure?</h1>
                <button
                  onClick={() => {
                    setIsShow(false);
                  }}
                >
                  cancel
                </button>
                <button onClick={handleLogOut}> Ok</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
