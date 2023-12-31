"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { TPost } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { DateTimePicker } from "@/app/_components/dateTime.component";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import z from "zod";
import axios from "axios";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Default from '../../../../../../public/assets/default.jpg'
import { StaticImageData } from "next/image";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number().or(z.string().transform(Number)),
  yearsExperience: z.string(),
  sessionFormat: z.string(),
  imageUrl: z.any(),
  currentCompany: z.string(),
  isBooked: z.boolean().optional(),
  localisation: z.string(),
  linkedin: z.string().optional(),
  whatsApp: z.string().optional(),
  twitter: z.string().optional(),
  experienceField: z.string(),
});
export type Post = z.infer<typeof postSchema>;

const Create = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const [avalaibles, setAvaibilties] = useState<Date[]>([]);
  const [imgUrl, setImgUrl] = useState<string | StaticImageData | undefined>("https://www.jsconsulting.kz/assets/img/noImg.jpg");

  useEffect(() => {}, [session]);

  const formValidation = useForm<Post>({
    resolver: zodResolver(postSchema),
  });

  const PostSubmit: SubmitHandler<
    Omit<TPost, "userId" | "profilePic">
  > = async (data: Omit<TPost, "userId" | "profilePic">) => {
    // error handling

    if (Object.keys(formValidation.formState.errors).length !== 0) {
      toast({
        title: "un error occured, retry",
      });
    }

    data.disponibilities = avalaibles;
    data.imageUrl = imgUrl as string;
    const {
      imageUrl,
      description,
      sessionFormat,
      title,
      yearsExperience,
      localisation,
      currentCompany,
      disponibilities,
      twitter,
      whatsApp,
      linkedin,
      price,
      experienceField,
    } = data;

    try {
      // first endpoint call -- save post details
      const res = await axios.post("/api/post", {
        imageUrl,
        userId: params.id,
        description,
        localisation,
        sessionFormat,
        title,
        yearsExperience,
        currentCompany,
        disponibilities,
        twitter,
        whatsApp,
        linkedin,
        price,
        experienceField,
        authorName: session?.user.name,
      });

      if (res.status === 200) {
        toast({
          title: "succes! post created",
          description: "redirect...",
        });

        router.push(`/coaches/${res.data.createPost.id}`);
      } else {
        toast({
          title: "something goes wrong",
          description: "retry in few minutes",
        });
      }
    } catch (error: any) {
      console.error("une erreur est survenue", error);
    }
  };

  return (
    <Form {...formValidation}>
      <form
        className=" p-4 flex flex-col gap-4 border border-dashed max-w-[1600px] m-auto mt-11 min-h-[400px] rounded-sm border-slate-300 sm:max-w-[80%]"
        onSubmit={formValidation.handleSubmit(PostSubmit)}
      >
        <Label>1.upload your profile picture <span className="opacity-40 text-xs">(optional)</span></Label>
        <UploadDropzone<OurFileRouter>
          className="ut-button:bg-[#230E49] ut-label:text-md"
          endpoint="image"
          onClientUploadComplete={(res) => {
            setImgUrl(res?.[0].url);
            toast({
              title: "image uploaded",
              description : "image succesfully uploaded you can continue!"
            });
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          onUploadBegin={(name) => {
            console.log("Uploading: ", name);
          }}
        /> 
        <Label>2.Choose the Zoom format you use</Label>
        <FormField
          control={formValidation.control}
          name="sessionFormat"
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="">
                <SelectValue placeholder="what Zoom format you prefer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video call">Video call</SelectItem>
                <SelectItem value="audio call only ">
                  Audio call only
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {/* video ou audiao */}
        

        <Label>Post title</Label>
        <Input placeholder="Post title" {...formValidation.register("title")} />
        <Label>Description</Label>
        <Textarea
          placeholder="description of what you are offering"
          {...formValidation.register("description")}
        />
        <Label>Price/ hour in $</Label>
        <Input placeholder="Price" {...formValidation.register("price")} />

        <div className="flex border flex-col p-4 gap-4 border-dotted rounded-md border-slate-300">
          <Label>experience in years</Label>
          <Input
            placeholder="ex:10"
            className="flex-row"
            {...formValidation.register("yearsExperience")}
          />

          <Label>currentCompany</Label>
          <Input
            placeholder="ex:Deloitte"
            {...formValidation.register("currentCompany")}
          />

          <Label>field of specialisation</Label>
          <Input
            placeholder="ex:Consultant"
            className="flex-row"
            {...formValidation.register("experienceField")}
          />
          <Label>localisation</Label>
          <Input
            placeholder="ex:United States"
            {...formValidation.register("localisation")}
          />
        </div>
        <Label className="text-lg">
          Social medias <span className="text-xs opacity-40">(optional)</span>
        </Label>
        <div className="flex items-center p-4 gap-4 border-dotted rounded-md">
          <Label className="text-xl opacity-40">
            <AiFillLinkedin />
          </Label>
          <Input
            placeholder="www.linkedin.com/in/your_account"
            {...formValidation.register("linkedin")}
          />
          <Label className="text-xl opacity-40">
            <AiOutlineWhatsApp />
          </Label>
          <Input
            placeholder="whatsapp link"
            {...formValidation.register("whatsApp")}
          />
          <Label className="text-xl opacity-40">
            <FaSquareXTwitter />
          </Label>
          <Input
            placeholder="www.twitter.com/your_account"
            {...formValidation.register("twitter")}
          />
        </div>
        <Label className="text-lg">Select yours avalaibles times</Label>

        <DateTimePicker
          date={new Date()}
          setDate={(date: Date) => {
            setAvaibilties((previous: Date[]) => {
              // Vérifie si la date existe déjà dans le tableau
              const isDateAlreadyInArray = previous.some(
                (existingDate) => existingDate.getTime() === date.getTime()
              );
              // Si la date n'existe pas déjà, ajoutez-la au tableau
              if (!isDateAlreadyInArray) {
                return [...previous, date];
              }

              return previous;
            });
          }}
        />
        
        <Button
          type="submit"
          className="mt-5 w-full bg-[#230E49] hover:bg-indigo-950 max-w-[500px] m-auto">
          create post
        </Button>
      </form>
      <Toaster />
    </Form>
  );
};

export default Create;
