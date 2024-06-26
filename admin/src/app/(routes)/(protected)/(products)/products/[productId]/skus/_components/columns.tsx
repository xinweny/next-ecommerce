"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { ProductItemImage } from "@prisma/client";

import { ToggleSort } from "@/components/ui/data-table";
import { ImageCarousel } from "@/components/shared/image-carousel";
import { Currency } from "@/components/shared/currency";

import { CellAction } from "./cell-action";
import { UpdateStockForm } from "../../../_components/update-stock-form";
import { UpdateArchivedForm } from "../../../_components/update-archived-form";

export interface ProductItemRow {
  id: number;
  name: string;
  product: {
    id: number;
    name: string;
  };
  sku: string;
  stock: number;
  price: number;
  images: ProductItemImage[];
  isArchived: boolean;
}

export const columns: ColumnDef<ProductItemRow>[] = [
  {
    accessorKey: "imageUrls",
    header: "Images",
    cell: ({ row }) => (row.original.images.length > 0 ? (
      <ImageCarousel
        imageUrls={row.original.images.map(image => image.imageUrl)}
      />
    ) : null),
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
    accessorKey: "name",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Name"
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
    cell: ({ row }) => <Currency value={row.original.price} />,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Stock"
      />
    ),
    cell: ({ row }) => (
      <UpdateStockForm
        productItemId={row.original.id}
        stock={row.original.stock}
      />
    ),
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Archived"
      />
    ),
    cell: ({ row }) => (
      <UpdateArchivedForm
        id={row.original.id}
        isArchived={row.original.isArchived}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];