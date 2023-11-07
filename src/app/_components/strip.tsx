import Marquee from "react-fast-marquee";

const Strip = () => {
  return (
    <Marquee className="bg-neutral-100 p-2 overflow-hidden font-medium mb-10 max-w-[70%] m-auto rounded-sm" 
    speed={70}>
      Thank you for testing out Qamar. the product is still in pre-alpha, if you face bugs or errors please email us at contact@qamarstudio.com
    </Marquee>
  );
};
export default Strip;
