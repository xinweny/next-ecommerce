"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  billboard: {
    id: number;
    label: string;
  } | null;
  productCount: number;
  subcategoryCount: number;
}

export const columns: ColumnDef<CategoryRow>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Name"
      />
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Slug"
      />
    ),
  },
  {
    accessorKey: "billboardLabel",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Billboard"
      />
    ),
    cell: (({ row }) => row.original.billboard?.label || ""),
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Products"
      />
    ),
  },
  {
    accessorKey: "subcategoryCount",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Subcategories"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];