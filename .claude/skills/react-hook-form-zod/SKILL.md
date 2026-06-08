---
name: react-hook-form-zod
description: Build forms with React Hook Form + Zod validation wired through the shadcn Form components, with accessible labels, descriptions, and error messages.
metadata:
  version: "1.0"
  framework: react
  related-skills:
    - shadcn-ui-component
    - tanstack-query-ssr
tier: 1
triggers:
  - form
  - input
  - validation
  - zod
  - react-hook-form
  - useForm
  - submit
  - schema
summary: |
  Define a Zod schema, infer the type, and call useForm with zodResolver. Wrap
  the UI in <Form {...form}> and each field in <FormField> →
  FormItem/FormLabel/FormControl/FormMessage from @/components/ui/form. The form
  must be a Client Component. Submit handlers usually call a TanStack Query
  mutation.
---

# Forms — React Hook Form + Zod

## Overview

| Aspect       | Details                                              |
| ------------ | ---------------------------------------------------- |
| Goal         | Type-safe, accessible, validated forms               |
| Components   | `@/components/ui/form` + `@/components/ui/input`      |
| Validation   | Zod + `@hookform/resolvers/zod`                      |
| Verification | `npm run typecheck`, component test                  |

## Critical rules

**Schema is the source of truth: infer the form type from the Zod schema with `z.infer`. Forms are Client Components (`"use client"`). Use `FormField` + `FormMessage` so validation errors render accessibly — don't hand-roll error display.**

## Pattern

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export function SignupForm({
  onSubmit,
}: {
  onSubmit: (values: FormValues) => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
```

## Common mistakes

| Mistake                                | Fix                                          |
| -------------------------------------- | -------------------------------------------- |
| Separate type + schema, out of sync    | `type T = z.infer<typeof schema>`            |
| Manual error `<p>` under inputs        | `<FormMessage />` reads RHF error state      |
| Form as a Server Component             | Add `"use client"`                           |
| Uncontrolled inputs without `field`    | Spread `{...field}` from `render`            |

## Checklist

- [ ] Zod schema + inferred type
- [ ] `zodResolver` + `defaultValues`
- [ ] Fields use `FormField`/`FormControl`/`FormMessage`
- [ ] `"use client"` present
