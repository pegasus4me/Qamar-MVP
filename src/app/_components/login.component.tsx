"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster"

import { signIn } from "next-auth/react";
import { Tlogin } from "@/types/auth";
import z from "zod";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(4),
});
type Register = z.infer<typeof loginSchema>;

const Login = () => {

  const { toast } = useToast()
  const form = useForm<Register>({
    resolver: zodResolver(loginSchema),
  });

  const LoginHandler: SubmitHandler<Tlogin> = async (data: Tlogin) => {
    try {
      let signin = await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      
      toast({
        title : "successfully connected"
      })
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(LoginHandler)}
        className="border max-w-[500px] m-auto p-3 shadow-lg rounded-md"
      >
        <div className="mb-4 p-3">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="opacity-40">welcome back</p>
        </div>

        <div className="flex flex-col gap-4 p-3">
          <Input
            placeholder="email address"
            type="email"
            {...form.register("email")}
          />
          <Input
            placeholder="password"
            type="password"
            {...form.register("password")}
          />
        </div>

        <Button
          type="submit"
          className="mt-5 w-full bg-[#230E49] hover:bg-indigo-950"
        >
          Login
        </Button>
      </form>
      <Toaster/>
    </Form>
  );
};

export default Login;
