import { cn } from "@/lib/utils";
import type { CartSheetArtworkVariant } from "./cart-sheet-context";

interface CartSheetArtworkProps {
	className?: string;
	variant: CartSheetArtworkVariant;
}

export function CartSheetArtwork({
	className,
	variant,
}: CartSheetArtworkProps) {
	return (
		<div
			className={cn(
				"relative size-[72px] shrink-0 overflow-hidden rounded-[18px] border border-slate-100 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.07)]",
				className,
			)}
		>
			{variant === "brigadeiros" ? <BrigadeirosArtwork /> : null}
			{variant === "pote" ? <PoteArtwork /> : null}
			{variant === "ursinho" ? <UrsinhoArtwork /> : null}
		</div>
	);
}

function BrigadeirosArtwork() {
	return (
		<svg
			aria-hidden="true"
			className="size-full"
			focusable="false"
			viewBox="0 0 88 88"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient id="brigadeiro-bg" x1="12" x2="78" y1="10" y2="78">
					<stop offset="0%" stopColor="#F6BE6B" />
					<stop offset="100%" stopColor="#FCEBD1" />
				</linearGradient>
			</defs>
			<rect fill="url(#brigadeiro-bg)" height="88" rx="22" width="88" />
			<ellipse cx="44" cy="60" fill="#F2D7AF" rx="26" ry="7" />
			<circle cx="33" cy="58" fill="#724228" r="11" />
			<circle cx="55" cy="56" fill="#5E331F" r="10" />
			<circle cx="33" cy="58" fill="#8F5535" fillOpacity="0.55" r="6.5" />
			<circle cx="55" cy="56" fill="#825032" fillOpacity="0.5" r="6" />
			{[
				[28, 54],
				[31, 50],
				[36, 52],
				[39, 57],
				[30, 61],
				[35, 64],
				[53, 50],
				[58, 52],
				[61, 56],
				[52, 59],
				[56, 63],
				[60, 60],
			].map(([cx, cy]) => (
				<circle cx={cx} cy={cy} fill="#3F2417" key={`${cx}-${cy}`} r="1.4" />
			))}
		</svg>
	);
}

function PoteArtwork() {
	return (
		<svg
			aria-hidden="true"
			className="size-full"
			focusable="false"
			viewBox="0 0 88 88"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient id="pote-bg" x1="10" x2="78" y1="12" y2="80">
					<stop offset="0%" stopColor="#F7F7F7" />
					<stop offset="100%" stopColor="#E8E6E4" />
				</linearGradient>
				<linearGradient id="pote-body" x1="34" x2="54" y1="34" y2="67">
					<stop offset="0%" stopColor="#B88B59" />
					<stop offset="100%" stopColor="#7A5339" />
				</linearGradient>
			</defs>
			<rect fill="url(#pote-bg)" height="88" rx="22" width="88" />
			<ellipse cx="44" cy="62" fill="#DBD8D4" rx="15" ry="5" />
			<path
				d="M34 34C34 29.582 37.582 26 42 26H46C50.418 26 54 29.582 54 34V36H34V34Z"
				fill="#F5E4D0"
			/>
			<path
				d="M36 36H52L48.5 61C48.2 63.24 46.29 64.9 44.03 64.9H43.97C41.71 64.9 39.8 63.24 39.5 61L36 36Z"
				fill="url(#pote-body)"
			/>
			<path
				d="M38 42C41 40.4 47 40.1 50 42.4"
				stroke="#E6B985"
				strokeLinecap="round"
				strokeWidth="2.5"
			/>
			<path
				d="M37.5 49.5C40.2 47.9 47.4 47.9 50.5 50.2"
				stroke="#E6B985"
				strokeLinecap="round"
				strokeWidth="2.5"
			/>
			<path
				d="M36.5 56.5C39.4 54.6 47.2 54.6 51 56.8"
				stroke="#E6B985"
				strokeLinecap="round"
				strokeWidth="2.5"
			/>
		</svg>
	);
}

function UrsinhoArtwork() {
	return (
		<svg
			aria-hidden="true"
			className="size-full"
			focusable="false"
			viewBox="0 0 88 88"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient id="ursinho-bg" x1="8" x2="76" y1="8" y2="80">
					<stop offset="0%" stopColor="#F1B786" />
					<stop offset="100%" stopColor="#F7D7BF" />
				</linearGradient>
			</defs>
			<rect fill="url(#ursinho-bg)" height="88" rx="22" width="88" />
			<circle cx="30" cy="33" fill="#A96338" r="9" />
			<circle cx="58" cy="33" fill="#A96338" r="9" />
			<circle cx="44" cy="42" fill="#B26C3F" r="21" />
			<ellipse cx="44" cy="47" fill="#F2D8BB" rx="12" ry="10" />
			<circle cx="37" cy="40" fill="#35231A" r="2.2" />
			<circle cx="51" cy="40" fill="#35231A" r="2.2" />
			<ellipse cx="44" cy="46" fill="#6C3C24" rx="3.8" ry="2.8" />
			<path
				d="M39.5 51.5C42.2 53.7 45.8 53.7 48.5 51.5"
				stroke="#6C3C24"
				strokeLinecap="round"
				strokeWidth="2"
			/>
			<path
				d="M31 63.5C31 58.8056 34.8056 55 39.5 55H48.5C53.1944 55 57 58.8056 57 63.5V66H31V63.5Z"
				fill="#B26C3F"
			/>
			<ellipse cx="44" cy="66" fill="#9F5F39" rx="15" ry="4" />
		</svg>
	);
}
