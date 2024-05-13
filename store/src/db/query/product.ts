import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  DbQueryParams,
} from "@/lib/db-query";

import {
  bestsellerOrderItemGroupByArgs,
} from "./order";

const productsIncludeArgs = {
  category: {
    select: { id: true, name: true, slug: true, },
  },
  subcategory: {
    select: { id: true, name: true, slug: true },
  },
  brand: {
    select: { id: true, name: true, slug: true },
  },
  series: {
    select: { id: true, name: true, slug: true },
  },
  productItems: {
    include: { images: true },
  },
} satisfies Prisma.ProductInclude;

export type ProductsIncludePayload = Prisma.ProductGetPayload<{ include: typeof productsIncludeArgs }>;

export const getFeaturedProducts = cache(async (params: DbQueryParams<Prisma.OrderItemWhereInput>) => {
  const { filter, pagination } = params;

  const orderItems = await db.orderItem.groupBy({
    ...where(filter),
    ...bestsellerOrderItemGroupByArgs,
    ...paginate(pagination),
  });

  const productIds = orderItems.map(({ productId }) => productId);

  const products = await db.product.findMany({
    where: {
      categoryId: filter?.product?.categoryId,
      ...(productIds.length > 0 && {
        id: { in: productIds },
      }),
    },
    include: productsIncludeArgs,
    ...paginate(pagination),
  });

  return products;
});
