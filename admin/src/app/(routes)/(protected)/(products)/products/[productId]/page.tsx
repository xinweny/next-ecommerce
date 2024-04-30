import { getProductById, getQueriedProductItems } from "@/db/query/product";

import { redirect } from "next/navigation";

import { ProductClient } from "./_components/product-client";

interface ProductPageProps {
  params: { productId: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductPage({
  params: { productId },
  searchParams: {
    id,
    name,
    query,
    page,
    limit,
    sku,
    isArchived,
    price,
    stock,
  }
}: ProductPageProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  const productItems = await getQueriedProductItems({
    filter: {
      productId: product.id,
      sku: {
        contains: query,
        mode: "insensitive",
      },
    },
    pagination: { page, limit },
    sort: {
      id,
      name,
      sku,
      isArchived,
      price,
      stock,
    },
  })

  return (
    <ProductClient
      product={product}
      productItems={productItems}
    />
  );
}