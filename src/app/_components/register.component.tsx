"use client";
import { FC, useState, useEffect, useLayoutEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation";
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import z from "zod";

const formSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    role: z.enum(["student", "coach"], {
      required_error: "You need to select a role.",
    }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code : "custom",
        message : "the two passwords did not match"
      })
    }
  });

type Register = z.infer<typeof formSchema>;

const Register: FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [message, setMesage] = useState("")

  useEffect(()=> {
    if(message !== "") {
      toast({
        title : message
      })
    }
  },[message])

  const form = useForm<Register>({
    resolver: zodResolver(formSchema),
  });


  const onSubmit:SubmitHandler<Register> = async(values:Register) => {
    const {name, email, role, password} = values
    try {
      const res = await axios.post("/api/auth/register", {
        name: name,
        email : email,
        role : role,
        password :password
      })
      if(res.status === 200) {
        router.push("/login")
      } 
    } catch (error : any) {
      console.error(error)
    }
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="border max-w-[500px] m-auto p-3 shadow-lg rounded-md"
      >
      <div className="mb-4 p-3">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <p className="opacity-40">Enter your email below to create your account</p>
      </div>
      
      <div className="flex flex-col gap-4 p-3">
        <Input
        placeholder="pseudonym"
        type="text"
        {...form.register("name")}
        />
        <Input
        placeholder="email address"
        type="email"
        {...form.register('email')}
        />
        <Input
        placeholder="password"
        type="password"
        {...form.register("password")}
        />
        <Input
        placeholder="confirm password"
        type="password"
        {...form.register("confirmPassword")}
        />
      
      
      <FormField
        control={form.control}
        name="role"
        render={({field}) => (
          <Select
          onValueChange={field.onChange}
          >
            <SelectTrigger className=''>
              <SelectValue placeholder="select your Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="coach">Coach</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />  
      </div>
      <Button type="submit"
      className="mt-5 w-full bg-[#230E49] hover:bg-indigo-950"
      // @ts-ignores
      // onClick={() => form.formState.errors[""].message === "the two passwords did not match" && setMesage(form.formState.errors[""].message) }
      >Create an account</Button>
      <div className="mt-4">
        <h3 className="text-sm">already a member <span className="underline decoration-dotted opacity-50"><Link href="/login">Login</Link></span></h3>
      </div>
      </form>
      <Toaster/>
    </Form>
  );
};
export default Register;
