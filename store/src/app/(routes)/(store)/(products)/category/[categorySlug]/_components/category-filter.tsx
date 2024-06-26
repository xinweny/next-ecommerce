import { CategoryIncludePayload } from "@/db/query/category";

import {
  Filters,
  MobileFilters,
  SelectFilter,
  RangeFilter,
} from "@/components/shared/filters";

import { getProductItemsPriceRange } from "@/db/query/product";
import { getBrands } from "@/db/query/brand";

interface CategoryFilterProps {
  category: CategoryIncludePayload;
}

export async function CategoryFilter({
  category,
}: CategoryFilterProps) {
  const [priceRange, brands] = await Promise.all([
    getProductItemsPriceRange({
      product: { categoryId: category.id },
    }),
    getBrands({
      products: {
        some: { categoryId: category.id }
      },
    }),
  ]);

  const filters = <>
    <SelectFilter
      name="subcategoryIds"
      values={category.subcategories.map(({ id, name }) => ({
        label: name,
        value: id,
      }))}
      title="Subcategories"
    />
    <SelectFilter
      name="brandIds"
      values={brands.map(({ id, name }) => ({
        label: name,
        value: id,
      }))}
      title="Brands"
    />
    <RangeFilter
      name="priceRange"
      title="Price"
      min={priceRange?._min.price || 0}
      max={priceRange?._max.price || 100_000}
      step={10}
    />
    <SelectFilter
      name="inStock"
      values={[{
        label: "In Stock",
        value: true,
      }]}
      title="Availability"
    />
  </>

  return (
    <>
      <Filters>{filters}</Filters>
      <MobileFilters>{filters}</MobileFilters>
    </>
  );
}