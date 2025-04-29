import seat3 from "../../assets/seat3.svg";
import coffeTable from "../../assets/coffetabe2.svg";
import chain2 from "../../assets/chain2.svg";
import Selected from "../../assets/State=Selected.svg";
import Default from "../../assets/State=Default.svg";
import { useState } from "react";
import fire2 from "../../assets/1F525_Fire_v13_Still 1.svg";
import vase2 from "../../assets/vase2.svg";
import seat4 from "../../assets/seet4.svg";
import Image from "next/image";

interface Feature {
  id: number;
  name: string;
  image: string;
  price: number;
  left: number;
}

const FeatureCard2 = () => {
  const features: Feature[] = [
    {
      id: 1,
      name: 'Mercer41 Annemargaret 90.5" Round Arm Sofa Polyester/Polyester Blend in Blue, Size 34.5 H x 90.5 W x 35.5 D in | Wayfair',
      image: seat3,
      price: 92372.97,
      left: 25,
    },
    {
      id: 2,
      name: 'Turin Modern Coffee Tables 14.57"D+17.72"D',
      image: coffeTable,
      price: 63436.03,
      left: 53,
    },
    {
      id: 3,
      name: "Chain Design Drop Earrings",
      image: chain2,
      price: 6073.07,
      left: 31,
    },
    {
      id: 4,
      name: "Snuggle Circular Hollow Ceramic Vase - Donuts Vase - Nordic Flower Pot - Home Decoration - Living Room Decoration - Ceramic Vase",
      image: vase2,
      price: 80020.24,
      left: 51,
    },
    {
      id: 5,
      name: "Modern White Velvet 3-Seater Sofa Channel Tufted Upholstered Luxury Solid Wood",
      image: seat4,
      price: 70977.04,
      left: 67,
    },
  ];

  const [selectedItems, setSelectedItems] = useState<Feature[]>([]);
  const handleImageClick = (deal: Feature) => {
    const isItemSelected = selectedItems.some((item) => item.id === deal.id);
    if (isItemSelected) {
      // Item is already selected, remove it from the selection
      setSelectedItems(selectedItems.filter((item) => item.id !== deal.id));
    } else {
      // Item is not selected, add it to the selection
      setSelectedItems([...selectedItems, deal]);
    }
  };

  return (
    <>
      <div className="2xl:max-w-[510px] xl:max-w-[510px] lg:max-w-[330px] md:max-w-[510px] sm:max-w-[330px] xs:max-w-[320px] 2xs:max-w-[310] grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 2xs:grid-cols-1 gap-3">
        {features.map((deal, index) => (
          <div
            className={`${
              index === features.length - 1 ? "w-[336px]" : "w-[160px]"
            } hover:bg-gradient-to-r from-[#F6CEEC] to-[#D939cd] p-0.5 hover:rounded-2xl border border-[#eaecf0] rounded-xl`}
            key={index}
          >
            <div
              className={`flex flex-col justify-between items-center flex-grow-0 flex-shrink-0 h-72 relative overflow-hidden pb-3 rounded-xl bg-white ) ${
                index === features.length - 1 ? "w-[330px] " : "w-[154px]"
              }`}
            >
              <div className="self-stretch flex-grow-0 flex-shrink-0 h-40 relative overflow-hidden bg-[#d0d5dd]">
                <div className=" relative m-0 p-0">
                  {selectedItems.some((item) => item.id === deal.id) ? (
                    <Image
                      src={Selected}
                      alt="Selected"
                      className="absolute top-2 right-2  cursor-pointer"
                      onClick={() => handleImageClick(deal)}
                    />
                  ) : (
                    <Image
                      src={Default}
                      alt="Default"
                      className="absolute top-2 right-2  cursor-pointer"
                      onClick={() => handleImageClick(deal)}
                    />
                  )}
                  <Image
                    src={deal.image}
                    alt="Product"
                    className="h-40 w-full left-[-1px] top-[-1px] object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-end items-start self-stretch flex-grow-0 flex-shrink-0 gap-1 px-3">
                <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0">
                  <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden">
                    <div className="line-clamp-1 text-xs font-medium text-left text-black">
                      {deal.name}
                    </div>
                  </div>
                  <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
                    <p className="flex-grow-0 flex-shrink-0 text-xs text-center text-[#870064]">
                      Kshs.
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-[#870064]">
                      {deal.price}
                    </p>
                  </div>
                </div>
                <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-1">
                  <div className="flex justify-start items-start flex-grow relative overflow-hidden rounded-lg bg-[#ffb8ec]">
                    <div
                      className="bg-[#870064] h-1 rounded-full"
                      style={{ width: `${deal.left}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1">
                    <div className="flex-grow-0 flex-shrink-0 w-4 h-4 relative overflow-hidden">
                      <Image
                        src={fire2}
                        alt="Fire2"
                        className="w-4 h-4 absolute left-[-0.52px] top-[-0.52px] object-cover"
                      />
                    </div>
                    <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#870064]">
                      {deal.left}
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 text-xs text-center text-[#870064]">
                      {" "}
                      Left
                    </p>
                  </div>
                </div>
                <div className="myBtn flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#d0d5dd]">
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#344054]">
                    Add to Cart
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 absolute left-28 top-0 gap-2 p-2">
                <svg
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0 w-8 h-8 relative"
                  preserveAspectRatio="none"
                >
                  <g filter="url(#filter0_b_2633_36297)">
                    <g filter="url(#filter1_b_2633_36297)">
                      <rect width={32} height={32} rx={16} fill="#F9FAFB" />
                      <path
                        d="M18.7409 10C21.0891 10 22.6668 12.235 22.6668 14.32C22.6668 18.5425 16.1187 22 16.0002 22C15.8816 22 9.3335 18.5425 9.3335 14.32C9.3335 12.235 10.9113 10 13.2594 10C14.6076 10 15.4891 10.6825 16.0002 11.2825C16.5113 10.6825 17.3928 10 18.7409 10Z"
                        stroke="#66004B"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_b_2633_36297"
                      x={-40}
                      y={-40}
                      width={112}
                      height={112}
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    ></filter>
                    <filter
                      id="filter1_b_2633_36297"
                      x={-40}
                      y={-40}
                      width={112}
                      height={112}
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    ></filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeatureCard2;
