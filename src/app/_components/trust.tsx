"use client";
import Microsoft from "../../asset/micorsoft.png";
import Mc from "../../asset/McKinsey_&_Company-Logo.wine.png";
import Deloitte from "../../asset/2560px-Deloitte-logo-black.svg.png";
import BSG from "../../asset/BCG-boston-consulting-group-logo-PNG-min-copie.png";
import Nvidia from "../../asset/Nvidia_logo.svg.png";
import Slalom from "../../asset/slalom-p.png";
import kpmg from "../../asset/kpmg-logo.png";
import IBM from "../../asset/ibm-logo-black-transparent.png";
import cisco from "../../asset/cisco-logo-black-transparent.png";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import pwc from "../../asset/PngItem_1984452.png";
function Trust() {
  return (
    <>
      <Marquee gradient={false} gradientWidth={300} speed={50} autoFill={true}

      >
        <article className="flex items-center opacity-60">
          <div className="m-5">
            <Image src={Microsoft} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={Mc} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={Deloitte} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={BSG} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={Nvidia} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={Slalom} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={kpmg} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={IBM} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={cisco} width={160} alt="logo" />
          </div>
          <div className="m-5">
            <Image src={pwc} width={160} alt="logo" />
          </div>
        </article>
      </Marquee>
    </>
  );
}

export default Trust;
