"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { loginSchema } from "../../../schema";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [viewstatus, setViewStatus] = useState("password");
  const [serverError, setServerError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const response = await api.post("/login", values);
      localStorage.setItem("access_token", response.data.token);
      router.push("/mainpage");
    } catch (err: any) {
      if (err.response?.status === 404) {
        setServerError("Akun tidak ditemukan");
        form.setFocus("email");
      } else if (err.response?.status === 401) {
        form.setError("password", { message: "Password salah" });
        form.setFocus("password");
      } else {
        setServerError("Terjadi kesalahan. Coba lagi nanti.");
      }
    }
  }

  function handleView() {
    setViewStatus((prev) => (prev === "password" ? "text" : "password"));
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center  p-6 md:p-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Server Error */}
              {serverError && (
                <p className="text-sm text-red-500 text-center">
                  {serverError}
                </p>
              )}

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={viewstatus}
                          {...field}
                          className="pr-16"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={handleView}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-900"
                        >
                          {viewstatus === "password" ? "Show" : "Hide"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 "
              >
                Log In
              </Button>

              {/* Footer */}
              <div className="text-center text-sm text-zinc-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signUp"
                  className="font-medium text-amber-500 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
