import clipboard from "../../assets/Clipboard.svg";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import FeatureCard2 from "./FeatureCard2";

function FeaturedProduct() {
  return (
    <div className="mx-4">
      <div className="flex px-4">
        <Image src={clipboard} alt="Featured Product" />
        <p className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-center mt-2 text-black">
          Featured Products
        </p>
      </div>
      <div
        className="justify-center items-center 2xl:flex xl:flex lg:flex gap-2 my-8"
      >
        <div className="">
          <FeatureCard />
        </div>
        <div className="">
          <FeatureCard2 />
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;