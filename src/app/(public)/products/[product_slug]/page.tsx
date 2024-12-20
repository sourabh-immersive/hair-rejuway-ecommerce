import { Product } from "@/data/data";
import { getProductBySlug } from "@/api/products";
import ProductDetails from "./ProductDetails";

export interface ProductDetailsItemsProps {
  data?: Product;
}

interface Variation {
  attribute_id: number;
  product_qty: string;
  price: number;
  sale_price: number;
  gst_price: number;
  total_price: number;
  attribute: { attribute_title: string; attribute_value: string }[];
}

const ProductDetailPage = async ({
  params,
}: {
  params: { product_slug: string };
}) => {
  const { product_slug } = params;
  const ProductDetail = await getProductBySlug(product_slug);

  return (
    <>
    <ProductDetails data={ProductDetail.data} />
    </>
  )
};

export default ProductDetailPage;
