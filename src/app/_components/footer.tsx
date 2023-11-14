import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import { Twitter } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { FaSlack } from "react-icons/fa6";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-neutral-100 max-w-[70%] m-auto mb-5 rounded-md p-3  ">
      <div className="flex justify-around items-center">
        <div>
          <Image src={logo} alt="logo"></Image>
        </div>
        <div className=" font-medium text-neutral-500 mt-3 flex  flex-col gap-1 p-2">
          <a href="mailto:contact@qamarstudio.com" className="text-[#230E49]">
            contact us
          </a>
          <Link
            href="/coaches"
            className="flex hover:text-[#230E49] transition-all"
          >
            browse coaches
          </Link>
          <Link
            href="/coaches"
            className="flex hover:text-[#230E49] transition-all"
          >
            login
          </Link>
          <Link
            href="/coaches"
            className="flex hover:text-[#230E49] transition-all"
          >
            register
          </Link>
          <a
            href="https://join.slack.com/t/qamarstudio/shared_invite/zt-26lf9rxdw-0N5_RGIkWu1Te2LRdOQxuA"
            className="flex hover:text-[#230E49] transition-all"
          >
            community
          </a>
        </div>
      </div>
      <div className="flex gap-2 text-end mt-2 p-2 items-center">
        <a href="https://www.linkedin.com/company/qamar-studio/about/">
          <FaLinkedin className="text-xl" />
        </a>
        <a href="https://twitter.com/QamarStudio_">
          <Twitter />
        </a>
        <a href="https://join.slack.com/t/qamarstudio/shared_invite/zt-26lf9rxdw-0N5_RGIkWu1Te2LRdOQxuA">
          <FaSlack className="text-xl" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
