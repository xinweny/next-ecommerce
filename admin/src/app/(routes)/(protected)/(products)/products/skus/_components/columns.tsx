"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";

import { ProductItemCellCarousel } from "./product-item-cell-carousel";

import { CellAction } from "./cell-action";

export interface ProductItemRow {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
  imageUrls: string[];
  product: {
    id: number;
    name: string;
  };
}

export const columns: ColumnDef<ProductItemRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="ID"
      />
    ),
  },
  {
    accessorKey: "imageUrls",
    header: "",
    cell: ({ row }) => (row.original.imageUrls.length > 0 ? (
      <ProductItemCellCarousel imageUrls={row.original.imageUrls} />
    ) : null),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Product"
      />
    ),
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}`}>{row.original.product.name}</Link>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Name"
      />
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="SKU"
      />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Stock"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Price"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];