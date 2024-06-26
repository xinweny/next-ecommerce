import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  values: {
    value: any;
    label: string;
  }[];
  disabled?: boolean;
}

export function FormSelect({
  name,
  label,
  placeholder,
  description,
  values,
  disabled = false,
}: FormSelectProps) {
  const form = useFormContext();

  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
            <Select
              disabled={isSubmitting || disabled}
              onValueChange={field.onChange}
              value={field.value?.toString()}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    ref={field.ref}
                    defaultValue={field.value}
                    placeholder={placeholder}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {values.map(({ value, label }) => (
                  <SelectItem
                    key={value}
                    value={value.toString()}
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}