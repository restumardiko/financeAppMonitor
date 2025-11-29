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
//import useUserInformation from "../../store/useUserInformation";
import { useEffect, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Profile() {
  const [isShow, setIsShow] = useState(false);
  const queryClient = useQueryClient();

  const { name, email, created_at } =
    queryClient.getQueryData(["userInformation"]) || {};
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
  //const { name, email, created_at, fetchInformation } = useUserInformation();

  //const registeredAccount = created_at.split("T")[0];
  //console.log(registeredAccount);

  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-md">
      {/* User Info */}
      <div className="space-y-1 text-center">
        <div className="text-base sm:text-lg font-semibold text-zinc-900 break-words">
          {name}
        </div>
        <div className="text-xs sm:text-sm text-zinc-500 break-words">
          {email}
        </div>
        <div className="text-xs text-zinc-400">Joined: {created_at}</div>
      </div>

      {/* Logout Button */}
      <div className="mt-5 sm:mt-6 flex justify-center">
        <button
          onClick={() => setIsShow(true)}
          className="w-full sm:w-auto rounded-xl bg-red-500 px-5 py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>

      {/* Confirm Modal */}
      {isShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-[320px] rounded-2xl bg-white p-5 sm:p-6 shadow-xl text-center space-y-4">
            <h1 className="text-base sm:text-lg font-semibold text-zinc-900">
              Are you sure?
            </h1>

            <p className="text-xs sm:text-sm text-zinc-500">
              You will be logged out from your account.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setIsShow(false)}
                className="w-full rounded-xl border border-zinc-300 py-2 text-xs sm:text-sm hover:bg-zinc-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogOut}
                className="w-full rounded-xl bg-red-500 py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-600 transition"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
