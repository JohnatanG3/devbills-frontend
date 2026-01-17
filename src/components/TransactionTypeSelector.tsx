import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectorProps {
	value: TransactionType;
	id?: string;
	onChange: (type: TransactionType) => void;
}

const TransactionTypeSelector = ({
	value,
	id,
	onChange,
}: TransactionTypeSelectorProps) => {
	const transactionsTypeButtons = [
		{
			type: TransactionType.expense,
			label: "Despesa",
			activeClasses:
				"bg-red-700 border-red-500 text-white font-medium hover:bg-red-600 hover:shadow-md active:bg-red-700 active:shadow-inner transition-transform hover:scale-105 active:scale-95",
			inactiveClasses:
				"bg-transparent border-red-700 text-red-700 hover:bg-red-50 active:bg-red-100",
		},
		{
			type: TransactionType.income,
			label: "Receita",
			activeClasses:
				"bg-green-500 border-green-500 text-white font-medium hover:bg-green-600 hover:shadow-md active:bg-green-700 active:shadow-inner transition-transform hover:scale-105 active:scale-95",
			inactiveClasses:
				"bg-transparent border-green-300 text-green-500 hover:bg-green-50 active:bg-green-100",
		},
	];
	return (
		<div>
			<fieldset id={id} className="grid grid-cols-2 gap-4">
				{transactionsTypeButtons.map((item) => (
					<button
						key={item.type}
						type="button"
						onClick={() => onChange(item.type)}
						className={`flex items-center justify-center border rounded-md py-2 px-4 transition-all cursor-pointer ${value === item.type ? item.activeClasses : item.inactiveClasses}`}
					>
						{item.label}
					</button>
				))}
			</fieldset>
		</div>
	);
};

export default TransactionTypeSelector;
