import { ChevronDown } from "lucide-react";
import { type ReactNode, type SelectHTMLAttributes, useId } from "react";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	icon?: ReactNode;
	fullWidth?: boolean;
	options: SelectOption[];
}

const Select = ({
	label,
	error,
	options,
	icon,
	fullWidth = true,
	className = "",
	id,
	...rest
}: SelectProps) => {
	const selectId = useId();

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4`}>
			{label && (
				<label
					htmlFor={selectId}
					className="block text-sm font-medium text-gray-50 mb-2"
				>
					{label}
				</label>
			)}

			<div className="relative">
				{icon && (
					<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-400">
						{icon}
					</div>
				)}

				<select
					id={selectId}
					{...rest}
					className={`block w-full bg-gray-800 py-3 pl-10 pr-4 rounded-xl text-gray-50 text-sm border ${error ? "border-red-700" : "border-gray-700"} ${error ? "focus:border-red-700" : "focus:border-primary-500"} outline-none appearance-none`}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
					<ChevronDown className="w-4 h-4 text-gray-50" />
				</div>
			</div>

			{error && <p className="mt-1 text-sm text-red-700">{error}</p>}
		</div>
	);
};

export default Select;
