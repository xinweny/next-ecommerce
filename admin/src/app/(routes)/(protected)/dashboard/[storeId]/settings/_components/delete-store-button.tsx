"use client";

import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { deleteStore } from "@/actions/store";

interface DeleteStoreButtonProps {
  store: Store;
}

export function DeleteStoreButton({
  store,
}: DeleteStoreButtonProps) {
  const onDelete = async () => {
    const { success, error } = await deleteStore(store.id);

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success(success);
      redirect("/dashboard");
    }
  };

  return (
    <AlertModal
      title={`Delete ${store.name} store?`}
      onConfirm={onDelete}
    >
      <Button
        variant="destructive"
        size="icon"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </AlertModal>
  );
}