import { redirect } from "next/navigation";

import { getStoreById } from "@/db/query/store";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { DeleteStoreButton } from "./_components/delete-store-button";
import { UpdateStoreForm } from "./_components/update-store-form";

interface StoreSettingsPageProps {
  params: { storeId: string };
};

export default async function StoreSettingsPage({
  params,
}: StoreSettingsPageProps) {
  const store = await getStoreById(params.storeId);

  if (!store) redirect("/dashboard");

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <DeleteStoreButton store={store} />
      </div>
      <Separator />
      <UpdateStoreForm store={store} />
    </>
  );
}