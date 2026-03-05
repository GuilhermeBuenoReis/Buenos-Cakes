"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { z } from "zod";

type SetStateAction<T> = T | ((previousState: T) => T);

function parseWithFallback<TSchema extends z.ZodTypeAny>(
	schema: TSchema,
	value: unknown,
): z.infer<TSchema> {
	const parsedValue = schema.safeParse(value);

	if (parsedValue.success) {
		return parsedValue.data;
	}

	const fallbackValue = schema.safeParse(undefined);

	if (fallbackValue.success) {
		return fallbackValue.data;
	}

	throw new Error("The provided schema must define a default or catch value.");
}

export function useUrlState<TSchema extends z.ZodTypeAny>(
	key: string,
	schema: TSchema,
): [z.infer<TSchema>, (value: SetStateAction<z.infer<TSchema>>) => void] {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const state = parseWithFallback(schema, searchParams.get(key));

	const setState = useCallback(
		(value: SetStateAction<z.infer<TSchema>>) => {
			const currentValue = parseWithFallback(schema, searchParams.get(key));
			const nextValue =
				typeof value === "function"
					? (value as (previousState: z.infer<TSchema>) => z.infer<TSchema>)(
							currentValue,
						)
					: value;

			const validatedValue = parseWithFallback(schema, nextValue);
			const nextSearchParams = new URLSearchParams(searchParams.toString());

			nextSearchParams.set(key, String(validatedValue));

			const nextUrl = nextSearchParams.toString()
				? `${pathname}?${nextSearchParams.toString()}`
				: pathname;

			router.replace(nextUrl, { scroll: false });
		},
		[key, pathname, router, schema, searchParams],
	);

	return [state, setState];
}
