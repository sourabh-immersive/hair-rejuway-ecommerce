import ProductSliders from "./ProductSliders";
import { getProducts } from "@/api/products";

interface Props {
  heading: string;
  category: string;
}

const SectionSliderProductCard: React.FC<Props> = async ({
  heading,
  category,
}) => {
  try {
    const fetchedProducts = await getProducts({
      product_type: category,
      paginate: 10,
    });
    if (fetchedProducts.data === undefined) {
      return (
        <div className="text-center text-red-500">
          {/* <p>No products found.</p> */}
        </div>
      );
    }
    return (
      <div>
        <ProductSliders heading={heading} initialData={fetchedProducts.data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center text-red-500">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default SectionSliderProductCard;
