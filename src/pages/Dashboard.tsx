import { ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import type { PieLabelRenderProps } from "recharts";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Card from "../components/Card";
import MonthYearSelect from "../components/MonthYearSelect";
import {
	getTransactionsMonthly,
	getTransactionsSummary,
} from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import { formatCurrency } from "../utils/formatters";

const initialSummary: TransactionSummary = {
	totalExpenses: 0,
	totalIncomes: 0,
	balance: 0,
	expensesByCategory: [],
};

const Dashboard = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState(currentDate.getMonth() + 1);
	const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
	const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);
	const [summaryLoading, setSummaryLoading] = useState<boolean>(true);
	const [monthlyLoading, setMonthlyLoading] = useState<boolean>(true);

	useEffect(() => {
		async function loadTransactionsSummary() {
			try {
				setSummaryLoading(true);
				const response = await getTransactionsSummary(month, year);
				setSummary(response || initialSummary);
			} finally {
				setSummaryLoading(false);
			}
		}

		loadTransactionsSummary();
	}, [month, year]);

	useEffect(() => {
		async function loadTransactionsMonthly() {
			try {
				setMonthlyLoading(true);
				const response = await getTransactionsMonthly(month, year, 4);
				setMonthlyItemsData(response.history);
			} finally {
				setMonthlyLoading(false);
			}
		}

		loadTransactionsMonthly();
	}, [month, year]);

	const renderPieChartLabel = (props: PieLabelRenderProps) => {
		const { name, percent } = props; // name vem do nameKey, percent é calculado pelo Pie
		return percent !== undefined
			? `${name}: ${(percent * 100).toFixed(1)}%`
			: `${name}: 0%`;
	};

	const formatToolTipValue = (value: number | string): string => {
		const numberValue =
			typeof value === "number" ? value : parseFloat(value) || 0;
		return formatCurrency(numberValue);
	};

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
				<MonthYearSelect
					month={month}
					year={year}
					onMonthChange={setMonth}
					onYearChange={setYear}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card
					icon={<Wallet size={20} className="text-primary-500" />}
					title="Saldo"
					hover
					glowEffect={summary.balance > 0}
				>
					{summaryLoading ? (
						<div className="mt-2 h-7 w-32 rounded-md bg-gray-800 animate-pulse"></div>
					) : (
						<p
							className={`text-2xl font-semibold mt-2 ${summary.balance > 0 ? "text-primary-500" : "text-red-700"}`}
						>
							{formatCurrency(summary.balance)}
						</p>
					)}
				</Card>

				<Card
					icon={<ArrowUp size={20} className="text-primary-500" />}
					title="Receitas"
					hover
				>
					{summaryLoading ? (
						<div className="mt-2 h-7 w-32 rounded-md bg-gray-800 animate-pulse"></div>
					) : (
						<p className="text-2xl font-semibold mt-2 text-primary-500">
							{formatCurrency(summary.totalIncomes)}
						</p>
					)}
				</Card>

				<Card
					icon={<Wallet size={20} className="text-red-700" />}
					title="Despesas"
					hover
				>
					{summaryLoading ? (
						<div className="mt-2 h-7 w-32 rounded-md bg-gray-800 animate-pulse"></div>
					) : (
						<p className="text-2xl font-semibold mt-2 text-red-700">
							{formatCurrency(summary.totalExpenses)}
						</p>
					)}
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
				<Card
					icon={<TrendingUp size={20} className="text-primary-500" />}
					title="Despesas por Categoria"
					className="min-h-80"
					hover
				>
					{summaryLoading ? (
						<div className="h-72 mt-4 rounded-xl bg-gray-800 animate-pulse"></div>
					) : summary.expensesByCategory.length > 0 ? (
						<div className="h-72 mt-4">
							<ResponsiveContainer>
								<PieChart>
									<Pie
										data={summary.expensesByCategory}
										cx="50%"
										cy="50%"
										outerRadius={80}
										dataKey="amount"
										nameKey="categoryName"
										label={renderPieChartLabel}
									>
										{summary.expensesByCategory.map((entry) => (
											<Cell key={entry.categoryId} fill={entry.categoryColor} />
										))}
									</Pie>
									<Tooltip formatter={formatToolTipValue} />
								</PieChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div className="flex items-center justify-center h-64 text-gray-500">
							Nenhuma Despesa Registrada no Período.
						</div>
					)}
				</Card>

				<Card
					icon={<Calendar size={20} className="text-primary-500" />}
					title="Histórico Mensal"
					className="min-h-80 p-2.5"
					hover
				>
					<div className="h-72 mt-4">
						{monthlyLoading ? (
							<div className="h-full rounded-xl bg-gray-800 animate-pulse"></div>
						) : monthlyItemsData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={monthlyItemsData} margin={{ left: 40 }}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="rgba(255, 255, 255, 0.1)"
									/>
									<XAxis
										dataKey="name"
										stroke="#94A3B8"
										tick={{ style: { textTransform: "capitalize" } }}
									/>
									<YAxis
										stroke="#94A3B8"
										tickFormatter={formatCurrency}
										tick={{ style: { fontSize: 14 } }}
									/>
									<Tooltip
										formatter={formatCurrency}
										contentStyle={{
											backgroundColor: "#1A1A1A",
											borderColor: "#2A2A2A",
										}}
										labelStyle={{ color: "#F8F8F8" }}
									/>
									<Legend />
									<Bar dataKey="expense" name="Despesas" fill="#FF6384" />
									<Bar dataKey="income" name="Receitas" fill="#37E359" />
								</BarChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-64 text-gray-500">
								Nenhuma Despesa Registrada no Período.
							</div>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
