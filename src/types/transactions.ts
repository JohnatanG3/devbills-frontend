import type { Category, CategorySummary } from "./category";

export const TransactionType = {
	expense: "expense",
	income: "income",
} as const;

export type TransactionType =
	(typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
	id: string;
	userId: string;
	description: string;
	amount: number;
	date: string | Date;
	type: TransactionType;
	category: Category;
	categoryId: string;
	updatedAt: string | Date;
	createdAt: string | Date;
}

export interface CreateTransactionDTO {
	description: string;
	amount: number;
	date: string | Date;
	type: TransactionType;
	categoryId: string;
}

export interface TransactionFilter {
	month: number;
	year: number;
	categoryId?: string;
	type?: TransactionType;
}

export interface TransactionSummary {
	totalExpenses: number;
	totalIncomes: number;
	balance: number;
	expensesByCategory: CategorySummary[];
}

export interface MonthlyItem {
	name: string;
	expense: number;
	income: number;
}
