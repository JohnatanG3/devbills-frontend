import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariants =
	| "primary"
	| "secondary"
	| "outline"
	| "success"
	| "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariants;
	fullWidth?: boolean;
	isLoading?: boolean;
}

const Button = ({
	children,
	variant = "primary",
	fullWidth = false,
	isLoading = false,
	className = "",
	disabled = false,
	...rest
}: ButtonProps) => {
	const variantClasses = {
		primary:
			"bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:scale-95",
		secondary: "bg-gray-800 text-white hover:brightness-90 active:scale-95",
		outline:
			"border border-primary-500 text-primary-500 hover:bg-primary-500/10 active:scale-95",
		success: "bg-green-500 text-white hover:brightness-90 active:scale-95",
		danger: "bg-red-700 text-white hover:brightness-90 active:scale-95",
	};

	const renderLoading = () => (
		<div className="flex items-center justify-center gap-2">
			<svg
				className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<title>Loading Spinner</title>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			{children}
		</div>
	);

	return (
		<button
			type="button"
			className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
                ${variantClasses[variant]}
                ${isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""}
                ${className}
                ${fullWidth ? "w-full" : ""}
            `}
			disabled={isLoading || disabled}
			aria-busy={isLoading}
			{...rest}
		>
			{isLoading ? renderLoading() : children}
		</button>
	);
};

export default Button;
