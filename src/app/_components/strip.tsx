import Marquee from "react-fast-marquee";

const Strip = () => {
  return (
    <Marquee className="bg-neutral-100 p-2 overflow-hidden font-medium rounded-sm mb-20" 
    speed={70}>
      Thank you for testing out Qamar. the product is still in pre-alpha, if you face bugs or errors please email us at contact@qamarstudio.com
    </Marquee>
  );
};
export default Strip;
