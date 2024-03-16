"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/app/_components/ui/form-input";
import { FormFeedback } from "@/app/_components/ui/form-feedback";
import { CardWrapper } from "../../_components/card-wrapper";
import { SubmitButton } from "@/app/_components/ui/submit-button";

import { register } from "@/actions/auth";

export function RegisterForm() {
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setSuccess(undefined);

    const { error, success } = await register(values);

    if (error) form.setError("root.serverError", { message: error });
    if (success) setSuccess(success);
  };

  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Johann"
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Strauss"
              />
            </div>
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="johannstrauss@waltz.com"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
            />
          </div>
          <FormFeedback success={success} />
          <SubmitButton className="w-full">
            Register
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}