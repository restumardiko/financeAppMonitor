"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { signupSchema } from "../../../schema";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const [viewstatus, setViewStatus] = useState<"password" | "text">("password");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function handleView() {
    setViewStatus((prev) => (prev === "password" ? "text" : "password"));
  }

  async function onSubmit(values: SignupFormValues) {
    try {
      setIsLoading(true);
      setServerError("");
      setServerSuccess("");

      const response = await api.post("/signUp", values);

      //  tampilkan pesan sukses dari server
      setServerSuccess(
        response.data?.message || "Account created successfully"
      );

      setTimeout(() => {
        router.push("/mainpage");
      }, 1000);
    } catch (error: any) {
      if (error.response) {
        setServerError(error.response.data?.message || "Signup failed");
      } else {
        setServerError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center  p-6 md:p-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Make your account first to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/*  SERVER SUCCESS */}
              {serverSuccess && (
                <p className="text-sm text-green-500 text-center">
                  {serverSuccess}
                </p>
              )}

              {/*  SERVER ERROR */}
              {serverError && (
                <p className="text-sm text-red-500 text-center">
                  {serverError}
                </p>
              )}

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="your nickname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>

              {/* Footer */}
              <div className="text-center text-sm text-zinc-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-amber-500 hover:underline"
                >
                  Log In
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
