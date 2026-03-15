import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-sm font-bold transition-all disabled:cursor-not-allowed disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-200 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"bg-rose-500 text-white shadow-sm hover:bg-[#e1324f] hover:shadow-lg hover:shadow-rose-500/20 disabled:bg-slate-200 disabled:text-slate-400",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border-2 border-slate-200 bg-transparent text-slate-600 hover:border-rose-500 hover:text-rose-500 disabled:border-slate-100 disabled:text-slate-300",
				secondary:
					"bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400",
				ghost:
					"bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:text-slate-300",
				toolbarIcon:
					"bg-transparent text-slate-600 hover:bg-transparent hover:text-[#ff4b61] focus-visible:border-rose-300 focus-visible:ring-rose-100 disabled:text-slate-300",
				link: "text-primary underline-offset-4 hover:underline",
			},

			size: {
				default: "h-10 px-4 py-2.5 has-[>svg]:px-3",
				xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-9 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-11 rounded-lg px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
