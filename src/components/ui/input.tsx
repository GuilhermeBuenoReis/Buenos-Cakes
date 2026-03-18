import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
	"w-full min-w-0 border text-base transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			variant: {
				default:
					"h-9 rounded-md border-input bg-transparent px-3 py-1 shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
				subtle:
					"h-13 rounded-[1.15rem] border-[#e8e1e1] bg-[#fffdfb] px-4 text-slate-700 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.25)] placeholder:text-slate-400 focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100/80 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Input({
	className,
	type,
	variant,
	...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(inputVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Input, inputVariants };
