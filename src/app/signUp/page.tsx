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
  const [viewstatus, setViewStatus] = useState("password");
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // confirmPassword: "",
    },
  });
  async function onSubmit(values: SignupFormValues) {
    try {
      const response = await api.post("/signUp", values);
      console.log(response.data);
      router.push("/mainpage");
    } catch (error: any) {
      if (error.response) {
        console.log("Server error:", error.response.data);
      } else {
        console.log("Error:", error.message);
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
          <CardTitle>Sign Up </CardTitle>
          <CardDescription>Make account first yaw</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-96"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input placeholder="yournickname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="button" onClick={handleView}>
                  {viewstatus === "password" ? "Show" : "Hide"}
                </button>

                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Log In
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
