import { productImgs } from "@/contains/fakeData";
import productVariantImg2 from "@/images/products/v2.jpg";
import productVariantImg3 from "@/images/products/v3.jpg";
import productVariantImg4 from "@/images/products/v4.jpg";
import productVariantImg5 from "@/images/products/v5.jpg";
import productVariantImg6 from "@/images/products/v6.jpg";
//
import productSport1 from "@/images/products/sport-1.png";
import productSport2 from "@/images/products/sport-2.png";
import productSport3 from "@/images/products/sport-3.png";
import productSport4 from "@/images/products/sport-4.png";
import productSport5 from "@/images/products/sport-5.png";
import productSport6 from "@/images/products/sport-6.png";
import productSport7 from "@/images/products/sport-7.png";
import productSport8 from "@/images/products/sport-8.png";
import { StaticImageData } from "next/image";

//

export interface ProductVariant {
  id: number;
  title: string;
  thumbnail?: StaticImageData | string;
  color?: string;
  featuredthumbnail: StaticImageData | string;
}

interface productDetails {
  packing_id: number,
  packing_size: string,
  price: string,
  packing_qty: string,
  sale_price: string,
  GST_price: string,
  total_price: string
}

export interface Product {
  id: number;
  title: string;
  price: number;
  product_details: productDetails[];
  thumbnail: StaticImageData | string;
  description: string;
  category: string;
  tags: string[];
  link: "/product-detail/";
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
  rating?: string;
  numberOfReviews?: number;
}

const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    title: "Black",
    thumbnail: productVariantImg6,
    featuredthumbnail: productImgs[0],
  },
  {
    id: 2,
    title: "White",
    thumbnail: productVariantImg2,
    featuredthumbnail: productImgs[1],
  },
  {
    id: 3,
    title: "Orange",
    thumbnail: productVariantImg3,
    featuredthumbnail: productImgs[2],
  },
  {
    id: 4,
    title: "Sky Blue",
    thumbnail: productVariantImg4,
    featuredthumbnail: productImgs[3],
  },
  {
    id: 5,
    title: "Natural",
    thumbnail: productVariantImg5,
    featuredthumbnail: productImgs[4],
  },
];
const DEMO_VARIANT_COLORS: ProductVariant[] = [
  {
    id: 1,
    title: "Violet",
    color: "bg-violet-400",
    featuredthumbnail: productImgs[0],
  },
  {
    id: 2,
    title: "Yellow",
    color: "bg-yellow-400",
    featuredthumbnail: productImgs[1],
  },
  {
    id: 3,
    title: "Orange",
    color: "bg-orange-400",
    featuredthumbnail: productImgs[2],
  },
  {
    id: 4,
    title: "Sky Blue",
    color: "bg-sky-400",
    featuredthumbnail: productImgs[3],
  },
  {
    id: 5,
    title: "Green",
    color: "bg-green-400",
    featuredthumbnail: productImgs[4],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Rey Nylon Backpack",
    description: "Brown cockroach wings",
    price: 74,
    product_details: [],
    thumbnail: productImgs[16],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
    rating: "4.4",
    numberOfReviews: 98,
  },
  {
    id: 2,
    title: 'Round Buckle 1" Belt',
    description: "Classic green",
    price: 68,
    product_details: [],
    thumbnail: productImgs[1],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% Discount",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 3,
    title: "Waffle Knit Beanie",
    description: "New blue aqua",
    price: 132,
    product_details: [],
    thumbnail: productImgs[15],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 4,
    title: "Travel Pet Carrier",
    description: "Dark pink 2023",
    price: 28,
    product_details: [],
    thumbnail: productImgs[3],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 5,
    title: "Leather Gloves",
    description: "Perfect mint green",
    price: 42,
    product_details: [],
    thumbnail: productImgs[4],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 6,
    title: "Hoodie Sweatshirt",
    description: "New design 2023",
    price: 30,
    product_details: [],
    thumbnail: productImgs[5],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 7,
    title: "Wool Cashmere Jacket",
    description: "Matte black",
    price: 12,
    product_details: [],
    thumbnail: productImgs[8],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 8,
    title: "Ella Leather Tote",
    description: "Cream pink",
    price: 145,
    product_details: [],
    thumbnail: productImgs[7],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
    rating: "4.9",
    numberOfReviews: 98,
  },
];

export const SPORT_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Mastermind Toys",
    description: "Brown cockroach wings",
    price: 74,
    product_details: [],
    thumbnail: productSport1,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 2,
    title: "Jump Rope Kids",
    description: "Classic green",
    price: 68,
    product_details: [],
    thumbnail: productSport2,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% Discount",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 3,
    title: "Tee Ball Beanie",
    description: "New blue aqua",
    price: 132,
    product_details: [],
    thumbnail: productSport3,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 4,
    title: "Rubber Table Tennis",
    description: "Dark pink 2023",
    price: 28,
    product_details: [],
    thumbnail: productSport4,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 5,
    title: "Classic Blue Rugby",
    description: "Perfect mint green",
    price: 42,
    product_details: [],
    thumbnail: productSport5,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 6,
    title: "Manhattan Toy WRT",
    description: "New design 2023",
    price: 30,
    product_details: [],
    thumbnail: productSport6,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 7,
    title: "Tabletop Football ",
    description: "Matte black",
    price: 12,
    product_details: [],
    thumbnail: productSport7,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 8,
    title: "Pvc Catching Toy",
    description: "Cream pink",
    price: 145,
    product_details: [],
    thumbnail: productSport8,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
    rating: "4.9",
    numberOfReviews: 98,
  },
];
