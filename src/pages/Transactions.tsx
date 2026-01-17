import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import MonthYearSelect from "../components/MonthYearSelect";
import {
	deleteTransaction,
	getTransactions,
} from "../services/transactionService";
import { type Transaction, TransactionType } from "../types/transactions";
import { formatCurrency, formatDate } from "../utils/formatters";

const Transactions = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [filteredTransactions, setFilteredTransactions] = useState<
		Transaction[]
	>([]);
	const [deletingId, setDeletingId] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("");

	const fetchTransactions = async (): Promise<void> => {
		try {
			setLoading(true);
			setError("");
			const data = await getTransactions({ month, year });
			setTransactions(data);
			setFilteredTransactions(data);
		} catch (error) {
			setError("Erro ao Buscar Transações. Por favor, Tente Novamente!");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string): Promise<void> => {
		try {
			setDeletingId(id);
			await deleteTransaction(id);
			toast.success("Transação Deletada com Sucesso!");
			setFilteredTransactions((prev) =>
				prev.filter((transaction) => transaction.id !== id),
			);
		} catch (error) {
			console.error(error);
			toast.error("Erro ao Deletar Transação. Por favor, Tente Novamente!");
		} finally {
			setDeletingId("");
		}
	};

	const confirmDelete = (id: string): void => {
		if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
			handleDelete(id);
		}
	};

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setSearchText(event.target.value);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Depois eu faço isso>
	useEffect(() => {
		fetchTransactions();
	}, [month, year]);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			const normalizedSearch = searchText.trim().toUpperCase();
			if (!normalizedSearch) {
				setFilteredTransactions(transactions);
				return;
			}

			setFilteredTransactions(
				transactions.filter((transaction) =>
					transaction.description.toUpperCase().includes(normalizedSearch),
				),
			);
		}, 300);

		return () => window.clearTimeout(timeoutId);
	}, [searchText, transactions]);

	const hasTransactions = transactions.length > 0;
	const hasResults = filteredTransactions.length > 0;

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 mb:mb-0">Transações</h1>
				<Link
					to="/transacoes/nova"
					className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 active:scale-95 transition-all"
				>
					<Plus className="w-4 h-4 mr-2" />
					Nova Transação
				</Link>
			</div>

			<Card className="mb-6">
				<MonthYearSelect
					month={month}
					onMonthChange={setMonth}
					onYearChange={setYear}
					year={year}
				/>
			</Card>

			<Card className="mb-6">
				<Input
					placeholder="Buscar Transações..."
					icon={<Search className="w-4 h-4 mr-2" />}
					fullWidth
					onChange={handleSearchChange}
					value={searchText}
				/>
			</Card>

			<Card className="overflow-hidden">
				{loading ? (
					<div className="flex items-center justify-center">
						<div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
					</div>
				) : error ? (
					<div className="p-8 text-center">
						<AlertCircle className="w-12 h-12 text-red-700 mx-auto mb-4" />
						<p>{error}</p>
						<Button onClick={fetchTransactions} className="mx-auto mt-6">
							Tentar Novamente
						</Button>
					</div>
				) : !hasTransactions ? (
					<div className="p-8 text-center">
						<p className="text-gray-500 mb-4">Nenhuma Transação Encontrada!</p>
						<Link
							to="/transacoes/nova"
							className="w-fit mx-auto mt-6 bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 active:scale-95 transition-all"
						>
							<Plus className="w-4 h-4 mr-2" />
							Nova Transação
						</Link>
					</div>
				) : !hasResults ? (
					<div className="p-8 text-center">
						<p className="text-gray-500 mb-4">
							Nenhuma transação encontrada para a busca.
						</p>
						<Button onClick={() => setSearchText("")} className="mx-auto">
							Limpar busca
						</Button>
					</div>
				) : (
					<>
						<div className="md:hidden space-y-3 p-3">
							{filteredTransactions.map((transaction) => (
								<div
									key={transaction.id}
									className="bg-gray-800 border border-gray-700 rounded-xl p-4"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											{transaction.type === TransactionType.income ? (
												<ArrowUp className="w-4 h-4 text-primary-500" />
											) : (
												<ArrowDown className="w-4 h-4 text-red-700" />
											)}
											<span className="text-sm font-medium text-gray-50">
												{transaction.description}
											</span>
										</div>
										<button
											type="button"
											onClick={() => confirmDelete(transaction.id)}
											className="text-red-700 hover:text-red-600 hover:opacity-70 rounded-full cursor-pointer"
											disabled={deletingId === transaction.id}
											aria-label="Excluir transação"
										>
											{deletingId === transaction.id ? (
												<span className="inline-block w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></span>
											) : (
												<Trash2 className="w-4 h-4 text-red-700" />
											)}
										</button>
									</div>
									<div className="mt-3 flex items-center justify-between text-sm text-gray-400">
										<span>{formatDate(transaction.date)}</span>
										<span
											className={`${transaction.type === TransactionType.income ? "text-primary-500" : "text-red-700"}`}
										>
											{formatCurrency(transaction.amount)}
										</span>
									</div>
									<div className="mt-2 flex items-center text-sm text-gray-400">
										<div
											className="w-2 h-2 rounded-full mr-2"
											style={{ backgroundColor: transaction.category.color }}
										></div>
										<span>{transaction.category.name}</span>
									</div>
								</div>
							))}
						</div>

						<div className="hidden md:block overflow-x-auto">
							<table className="divide-y divide-gray-700 min-h-full w-full">
								<thead>
									<tr>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
										>
											Descrição
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
										>
											Data
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
										>
											Categoria
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
										>
											Valor
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
										>
											Ações
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-700">
									{filteredTransactions.map((transaction) => (
										<tr key={transaction.id} className="hover:bg-gray-800">
											<td className="px-3 py-4 text-sm text-gray-400 whitespace-nowrap">
												<div className="flex items-center">
													<div className="mr-2">
														{transaction.type === TransactionType.income ? (
															<ArrowUp className="w-4 h-4 text-primary-500" />
														) : (
															<ArrowDown className="w-4 h-4 text-red-700" />
														)}
													</div>
												</div>

												<span className="text-sm font-medium text-gray-50">
													{transaction.description}
												</span>
											</td>

											<td className="px-3 py-4 whitespace-nowrap">
												{formatDate(transaction.date)}
											</td>

											<td className="px-3 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div
														className="w-2 h-2 rounded-full mr-2"
														style={{
															backgroundColor: transaction.category.color,
														}}
													></div>
													<span className="text-sm text-gray-400">
														{transaction.category.name}
													</span>
												</div>
											</td>

											<td className="px-3 py-4 whitespace-nowrap">
												<span
													className={`${transaction.type === TransactionType.income ? "text-primary-500" : "text-red-700"}`}
												>
													{formatCurrency(transaction.amount)}
												</span>
											</td>

											<td className="px-3 py-4 whitespace-nowrap cursor-pointer">
												<button
													type="button"
													onClick={() => confirmDelete(transaction.id)}
													className="text-red-700 hover:text-red-600 hover:opacity-70 rounded-full cursor-pointer"
													disabled={deletingId === transaction.id}
													aria-label="Excluir transação"
												>
													{deletingId === transaction.id ? (
														<span className="inline-block w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></span>
													) : (
														<Trash2 className="w-4 h-4 text-red-700" />
													)}
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				)}
			</Card>
		</div>
	);
};

export default Transactions;
