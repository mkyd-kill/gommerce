import Link from "next/link";
import Image from "next/image";
import Tshirt from "../../assets/T-shirt.svg";
import dress from "../../assets/Dress.svg";
import health from "../../assets/Stethoscope.svg";
import laptop from "../../assets/Laptop.svg";
import headphone from "../../assets/Headphone.svg";
import jewery from "../../assets/Ring.svg";
import plus from "../../assets/2795_PlusSign_1024px_01_02 1.svg";
import bag from "../../assets/Shopping bags.svg";
import { CategoryModel } from "@/types/category";

const Category = () => {
  const categories: CategoryModel[] = [
    {
      id: 1,
      name: "Men Clothes",
      image: Tshirt,
      style: {
        backgroundColor: "white",

      },
    },
    {
      id: 2,
      name: "Women Clothes",
      image: dress,
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: 3,
      name: "Health ",
      image: health,
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: 4,
      name: "Laptop",
      image: laptop,
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: 5,
      name: "Headphone",
      image: headphone,
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: 6,
      name: "Jewelry",
      image: jewery,
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: 7,
      name: "All Categories",
      image: plus,
      style: {
        backgroundColor: "rgba(234, 234, 234, 1)",
      },
    },
  ];

  return (
    <div className="mx-4 my-2">
      <div className="flex px-4">
        <Image src={bag} alt="Category" />
        <p className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-center mt-2 text-black">
          Popular Categories
        </p>
      </div>

      <div className="px-2 gap-2 justify-center items-center grid 2xl:grid-cols-7 xl:grid-cols-7 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 sm:gap-3 xs:grid-cols-2 xs:gap-2 2xs:grid-cols-2 my-8">
        {categories.map((category) => (
          <Link href="/catalog" key={category.id}>
            <div className="min-w-[100px] max-w-[130px] min-h-[40px] hover:bg-gradient-to-r from-[#F6CEEC] to-[#D939cd] p-0.5 hover:rounded-2xl border border-[#eaecf0] rounded-xl ">
              <div
                style={{
                  backgroundColor: category.style.backgroundColor,
                }}
                className="myComponent h-[120px] max-h-[128px] flex flex-col justify-center items-center  rounded-xl "
              >
                <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1">
                  <Image
                    priority={true}
                    src={category.image}
                    alt="Tshirt"
                    className="flex-grow-0 flex-shrink-0"
                  />
                </div>
                <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-center text-black">
                    {category.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
