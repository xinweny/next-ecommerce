"use client";

import { useEffect } from "react";
import { Route } from "next";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import qs from "qs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  stringArrayStore,
  type StringArrayStore,
  numberRangeStore,
  type NumberRangeStore,
} from "@/schemas/filters";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { RangeSlider } from "../ui/slider";
import { Button } from "../ui/button";

import { Currency } from "./currency";

interface SelectFilterProps {
  values: {
    label: string;
    value: string;
  }[];
  name: string;
  title: string;
}

export function SelectFilter({
  values,
  name,
  title,
}: SelectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<StringArrayStore>({
    defaultValues: {
      [name]: [],
    },
    resolver: zodResolver(stringArrayStore),
  });
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: StringArrayStore) => {
    const currentParams = qs.parse(searchParams.toString());

    const query = {
      ...currentParams,
      [name]: data[name].length > 0
        ? JSON.stringify(data[name])
        : null,
    };

    const url = `${pathname}?${qs.stringify(query, { skipNulls: true })}`;

    router.push(url as Route, { scroll: false });
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());

    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <Form {...form}>
      <form>
        <h3 className="font-semibold">{title}</h3>
        {values.map(({ label, value }) => (
          <FormField
            key={value}
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div key={value} className="flex gap-2 items-center">
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, value])
                          : field.onChange(field.value?.filter((v: string) => v !== value));
                      }}
                      disabled={isSubmitting}
                    />
                    <FormLabel className="text-sm">{label}</FormLabel>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
}

interface RangeFilterProps {
  min: number;
  max: number;
  step: number;
  name: string;
  title: string;
}

export function RangeFilter({
  min,
  max,
  step,
  name,
  title,
}: RangeFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<NumberRangeStore>({
    defaultValues: {
      [name]: [min, max],
    },
    resolver: zodResolver(numberRangeStore),
  });
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: NumberRangeStore) => {
    const currentParams = qs.parse(searchParams.toString());

    const query = {
      ...currentParams,
      [name]: data[name].length === 2
        ? JSON.stringify(data[name])
        : null,
    };

    const url = `${pathname}?${qs.stringify(query, { skipNulls: true })}`;

    router.push(url as Route, { scroll: false });
  };

  const range = watch(name);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs font-bold">
          <Currency value={range[0]} />
          <span> - </span>
          <Currency value={range[1]} />
        </span>
        <div className="flex items-center gap-4">
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <RangeSlider
                    min={min}
                    max={max}
                    defaultValue={[min, max]}
                    step={step}
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            variant="outline"
            disabled={isSubmitting}
          >
            Go
          </Button>
        </div>
      </form>
    </Form>
  );
}