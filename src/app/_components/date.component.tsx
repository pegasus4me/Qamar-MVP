"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { IDateContext } from "@/lib/contexProvider";
import { useContext } from "react";
import { ContextProvider } from "@/lib/contexProvider";

const dateschema = z.object({
  date: z.string(),
});

type date = z.infer<typeof dateschema>;

const DateComponent = ({ dates, name }: { dates: Date[] | undefined, name :string }) => {
  const { date, setDate } = useContext<IDateContext>(ContextProvider);

  const form = useForm<date>({
    resolver: zodResolver(dateschema),
  });

  function onSubmit(data: date) {
    setDate(data.date as string);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-medium text-lg mt-5">chose your interview Date</FormLabel>
              <Select onValueChange={field.onChange} 
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a avalaible date" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>chose your date</SelectLabel>
                    {dates?.length !== 0
                      ? dates?.map((date: Date, index: number) => {
                          const convert = new Date(date);
                          return (
                            <SelectItem value={date.toString()} key={index}>
                              {convert.toString().slice(0, 31)}
                            </SelectItem>
                          );
                        })
                      : null}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                interviews with {name} will be peformed on Zoom
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit"
        className="bg-[#230E49]"
        >select this date</Button>
      </form>
    </Form>
  );
};
export default DateComponent;
