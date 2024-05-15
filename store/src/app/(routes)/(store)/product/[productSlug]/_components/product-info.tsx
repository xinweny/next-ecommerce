import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Currency } from "@/components/shared/currency";

import { ProductItemIncludePayload, ProductIncludePayload } from "@/db/query/product";


interface ProductInfoProps {
  product: ProductIncludePayload;
  productItem: ProductItemIncludePayload;
  setProductItem: React.Dispatch<React.SetStateAction<ProductItemIncludePayload>>;
}

export function ProductInfo({
  product,
  productItem,
  setProductItem,
}: ProductInfoProps) {
  const {
    brand,
    productItems,
  } = product;

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <span>{brand.name}</span>
      </div>
      <Separator className="my-4" />
      <Currency className="block text-2xl text-gray-900" value={productItem.price} />
      <div className="flex items-center gap-4">
        {productItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => { setProductItem(item); }}
            size="sm"
            className="rounded-full px-4"
            variant={productItem.id === item.id ?"default" : "outline"}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <Separator className="my-4" />
      <p>{product.description}</p>
    </div>
  );
}