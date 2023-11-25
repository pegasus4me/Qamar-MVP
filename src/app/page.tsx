import Image from "next/image";
import logo from "../../public/assets/LOGO.svg";

export default function Home() {
  return (
    <main className="m-auto flex justify-center items-center">
      <div className="p-4 mt-52">
        <Image src={logo} alt="logo" width={250} />
        <p className="font-semibold text-3xl text-center mt-5">grow each other.</p>
        <p className="text-center">coming soon</p>
      </div>
    </main>
  );
}
