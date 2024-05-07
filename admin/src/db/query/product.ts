import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const productIncludeArgs = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    brand: {
      select: { id: true, name: true },
    },
    series: {
      select: { id: true, name: true },
    },
    category: {
      select: { id: true, name: true },
    },
    subcategory: {
      select: { id: true, name: true },
    },
  },
});

const productItemGroupByArgs = {
  by: "productId",
  _count: true,
  _sum: { stock: true },
} satisfies Prisma.ProductItemGroupByArgs;

type ProductItemGroupByPayload = Awaited<Prisma.GetProductItemGroupByPayload<typeof productItemGroupByArgs>>;

const productItemIncludeArgs = Prisma.validator<Prisma.ProductItemDefaultArgs>()({
  include: {
    product: { select: { id: true, name: true } },
    images: true,
  },
});

export type ProductIncludePayload = Prisma.ProductGetPayload<typeof productIncludeArgs>;

export type ProductItemIncludePayload = Prisma.ProductItemGetPayload<typeof productItemIncludeArgs>;

export type ProductIncludeGroupByPayload = ProductIncludePayload & {
  productItems: ProductItemGroupByPayload[0];
};

export const productSelectNameArgs = {
  id: true,
  name: true,
} satisfies Prisma.ProductSelect;

export type ProductSelectNamePayload = Prisma.ProductGetPayload<{ select: typeof productSelectNameArgs }>;

export const getProductById = cache(async (productId: number) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    ...productIncludeArgs,
  });

  return product;
});

export const getQueriedProducts = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, filter } = params;

    const products = await db.product.findMany({
      ...where(filter),
      ...orderBy(sort),
      ...paginate(pagination),
      ...productIncludeArgs,
    });

    const productIds = products.map(product => product.id);

    const productItems = await db.productItem.groupBy({
      where: { productId: { in: productIds } },
      ...productItemGroupByArgs,
    }).then(res => res.reduce((acc, next) => ({
      ...acc,
      [next.productId]: next,
    }), {} as { [key: number]: ProductItemGroupByPayload[0] }))
  
    return products.map(product => ({
      ...product,
      productItems: productItems[product.id],
    }));
  } catch (error) {
    return [];
  }
});

export const getProductsCount = cache(async () => {
  const count = await db.product.count();

  return count;
});

export const getProductItemsCount = cache(async () => {
  const count = await db.productItem.count();

  return count;
});

export const getQueriedProductItems = cache(async (params: DbQueryParams) => {
  const { pagination, sort, filter } = params;

  const productItems = await db.productItem.findMany({
    ...productItemIncludeArgs,
    ...where(filter),
    ...paginate(pagination),
    ...orderBy(sort),
  });

  return productItems;
});

export const getProductItemImagesByProductItemId = cache(async (productItemId: number) => {
  const productItemImages = await db.productItemImage.findMany({
    where: { productItemId },
  });

  return productItemImages;
});