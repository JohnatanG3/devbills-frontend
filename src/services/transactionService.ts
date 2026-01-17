import type {
	CreateTransactionDTO,
	MonthlyItem,
	Transaction,
	TransactionFilter,
	TransactionSummary,
} from "../types/transactions";
import { api } from "./api";

export type CreateTransactionInput = Omit<
	Transaction,
	"id" | "userId" | "category" | "createdAt" | "updatedAt"
>;

export const getTransactions = async (
	filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
	const response = await api.get<Transaction[]>("/transactions", {
		params: { ...filter },
	});
	return response.data;
};

export const getTransactionsSummary = async (
	month: number,
	year: number,
): Promise<TransactionSummary> => {
	const response = await api.get<TransactionSummary | TransactionSummary[]>(
		"/transactions/summary",
		{
			params: { month, year },
		},
	);

	const emptySummary: TransactionSummary = {
		totalExpenses: 0,
		totalIncomes: 0,
		balance: 0,
		expensesByCategory: [],
	};

	if (Array.isArray(response.data)) {
		return response.data[0] ?? emptySummary;
	}

	return response.data ?? emptySummary;
};

export const getTransactionsMonthly = async (
	month: number,
	year: number,
	months?: number,
): Promise<{ history: MonthlyItem[] }> => {
	try {
		const response = await api.get<{ history: MonthlyItem[] }>(
			"/transactions/historical",
			{
				params: { month, year, months },
			},
		);

		const history = (response.data.history ?? []).map((item) => ({
			name: "name" in item ? item.name : (item as { month?: string }).month ?? "",
			income: item.income ?? 0,
			expense: item.expense ?? 0,
		}));

		return { history };
	} catch (erro) {
		console.error("Erro ao carregar histórico de transações", erro);
		return { history: [] };
	}
};

export const deleteTransaction = async (id: string): Promise<void> => {
	await api.delete(`/transactions/${id}`);
};

export const createTransaction = async (
	transactionData: CreateTransactionDTO,
): Promise<Transaction> => {
	const response = await api.post<Transaction>(
		"/transactions",
		transactionData,
	);
	return response.data;
};
