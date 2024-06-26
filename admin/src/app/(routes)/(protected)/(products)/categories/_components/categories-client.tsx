"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { CategoryIncludePayload } from "@/db/query/category";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import {
  DataTable,
  DataTableQueryForm,
  DataTableSearch,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { CategoryRow, columns } from "./columns";

interface CategoriesClientProps {
  categories: CategoryIncludePayload[];
  totalCount: number;
}

export function CategoriesClient({
  categories,
  totalCount,
}: CategoriesClientProps) {
  const router = useRouter();

  const data = categories.map(({ id, name, slug, billboard, _count }) => {
    return {
      id,
      name,
      slug,
      productCount: _count.products,
      subcategoryCount: _count.subcategories,
      billboard: billboard
        ? { id: billboard.id, label: billboard.label }
        : null,
    };
  }) satisfies CategoryRow[];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Categories"
          description="Manage product categories"
        />
        <Button onClick={() => {
          router.push("/categories/add");
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Category</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
        queryForm={<DataTableQueryForm>
          <DataTableSearch placeholder="Search category name" />
        </DataTableQueryForm>}
      />
    </div>
  );
}