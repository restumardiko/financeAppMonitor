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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-96"
              >
                {/* Server Error Display */}
                {serverError && (
                  <p className="text-red-500 text-sm">{serverError}</p>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type={viewstatus} {...field} className="pr-20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="button" onClick={handleView}>
                  {viewstatus === "password" ? "Show" : "Hide"}
                </button>

                <Button type="submit" className="w-full">
                  Log In
                </Button>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signUp" className="underline underline-offset-4">
                    Sign Up
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
