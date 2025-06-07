import { ProductModel } from "@/types/product";
import { ProductCard } from "./product-card";

interface Props {
  products: ProductModel[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Search products..." />
      </div>
      <ul>
        {products.map((product, key) => {
          return <li key={key}>
            <ProductCard product={product}/>
          </li>;
        })}
      </ul>
    </div>
  );
};
