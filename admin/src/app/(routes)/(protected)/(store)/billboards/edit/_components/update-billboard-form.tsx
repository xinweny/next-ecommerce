"use client";

import { Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { billboardSchema, type BillboardSchema } from "@/schemas/billboard";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { SubmitButton } from "@/components/form/submit-button";
import { ImageUpload } from "@/components/form/image-upload";
import { ImagePreview } from "@/components/form/image-preview";

import { updateBillboard } from "@/actions/billboard";

interface UpdateBillboardFormProps {
  billboard: Billboard;
}

export function UpdateBillboardForm({
  billboard,
}: UpdateBillboardFormProps) {
  const {
    id,
    label,
    imageUrl,
    title,
    description,
  } = billboard;

  const form = useForm<BillboardSchema>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label,
      imageUrl,
      title: title || "",
      description: description || "",
    },
  });

  const onSubmit = async (values: BillboardSchema) => {
    const { success, error } = await updateBillboard(id, values);

    if (success) toast.success(success);
    if (error) toast.error(error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 w-full"
      >
        <div className="flex flex-col gap-8">
          <FormInput
            name="label"
            label="Label"
          />
          <ImagePreview
            name="imageUrl"
            listClassName="mb-4 flex items-center gap-4"
            containerClassName="w-[860px] h-[480px]"
          />
          <ImageUpload
            label="Background Image"
            folder="/billboards"
            name="imageUrl"
          />
          <FormInput
            name="title"
            label="Title"
          />
          <FormTextarea
            name="description"
            label="Description"
          />
        </div>
        <SubmitButton className="ml-auto">
          Save Changes
        </SubmitButton>
      </form>
    </Form>
  );
}