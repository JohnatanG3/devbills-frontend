import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectProps {
	month: number;
	year: number;
	onMonthChange: (month: number) => void;
	onYearChange: (year: number) => void;
}

const monthNames: readonly string[] = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

const MonthYearSelect = ({
	month,
	year,
	onMonthChange,
	onYearChange,
}: MonthYearSelectProps) => {
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from(
		{ length: 11 },
		(_, i) => currentYear - 5 + i,
	);

	const handleNextMonth = (): void => {
		if (month === 12) {
			onMonthChange(1);
			onYearChange(year + 1);
		} else {
			onMonthChange(month + 1);
		}
	};

	const handlePrevMonth = (): void => {
		if (month === 1) {
			onMonthChange(12);
			onYearChange(year - 1);
		} else {
			onMonthChange(month - 1);
		}
	};

	return (
		<div className="gap-4 flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700">
			<button
				type="button"
				className="cursor-pointer p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 active:opacity-60 transition-colors border border-gray-700"
				aria-label="Mês Anterior"
				onClick={handlePrevMonth}
			>
				<ChevronLeft />
			</button>
			<div className="flex gap-4">
				<label htmlFor="month-select" className="sr-only">
					Selecionar Mês
				</label>
				<select
					name=""
					value={month}
					onChange={(e) => onMonthChange(Number(e.target.value))}
					id="month-select"
					className="bg-gray-800 cursor-pointer border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500"
				>
					{monthNames.map((name, index) => (
						<option value={index + 1} key={name}>
							{name}
						</option>
					))}
				</select>

				<label htmlFor="year-select" className="sr-only">
					Selecionar Ano
				</label>
				<select
					name=""
					value={year}
					onChange={(e) => onYearChange(Number(e.target.value))}
					id="year-select"
					className="bg-gray-800 cursor-pointer border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500"
				>
					{years.map((name) => (
						<option value={name} key={name}>
							{name}
						</option>
					))}
				</select>
			</div>

			<button
				type="button"
				className="cursor-pointer p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 active:opacity-60 transition-colors border border-gray-700"
				aria-label="Próximo Mês"
				onClick={handleNextMonth}
			>
				<ChevronRight />
			</button>
		</div>
	);
};

export default MonthYearSelect;
