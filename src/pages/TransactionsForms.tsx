import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import {
	type ChangeEvent,
	type FormEvent,
	useEffect,
	useId,
	useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import { getCategories } from "../services/categoryService";
import { createTransaction } from "../services/transactionService";
import type { Category } from "../types/category";
import {
	type CreateTransactionDTO,
	TransactionType,
} from "../types/transactions";

interface FormData {
	description: string;
	amount: number;
	date: string;
	categoryId: string;
	type: TransactionType;
}

const initialFormData = {
	description: "",
	amount: 0,
	date: "",
	categoryId: "",
	type: TransactionType.expense,
};

const TransactionsForms = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const formId = useId();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			const response = await getCategories();
			console.log("Categorias recebidas:", response);
			setCategories(response);
		};

		fetchCategories();
	}, []);

	const handleTransactionType = (itemType: TransactionType): void => {
		setFormData((prev) => ({ ...prev, type: itemType }));
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	): void => {
		const { name, value } = event.target;
		if (name === "amount") {
			const parsedValue = Number(value);
			setFormData((prev) => ({
				...prev,
				[name]: Number.isNaN(parsedValue) ? 0 : parsedValue,
			}));
			return;
		}

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const filteredCategories = categories.filter(
		(category) => category.type === formData.type,
	);

	const validateForm = (): boolean => {
		if (
			!formData.description ||
			formData.amount <= 0 ||
			!formData.date ||
			!formData.categoryId
		) {
			setError("Por favor, preencha todos os campos corretamente!");
			return false;
		}

		return true;
	};

	const handleCancel = (): void => {
		navigate("/transacoes");
	};

	const handleSubmit = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		try {
			if (!validateForm()) {
				return;
			}

			const trasactionData: CreateTransactionDTO = {
				amount: formData.amount,
				categoryId: formData.categoryId,
				date: `${formData.date}T12:00:00.000Z`,
				description: formData.description,
				type: formData.type,
			};

			await createTransaction(trasactionData);
			toast.success("Transação Salva com Sucesso!");
			navigate("/transacoes");
		} catch (error) {
			toast.error("Erro ao salvar a transação. Tente novamente.");
			console.error("Erro ao salvar a transação:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-app py-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Nova Transação</h1>
				<Card>
					{error && (
						<div className="flex items-center justify-center bg-red-700 border-red-700 rounded-xl p-4 mb-6 gap-2">
							<AlertCircle className="w-4 h-4 text-wite font-bold" />
							<p className="text-wite font-bold">{error}</p>
						</div>
					)}

					<form action="" onSubmit={handleSubmit}>
						<div className="flex mb-4 gap-2 flex-col">
							<label htmlFor={formId} className="mb-4">
								Tipo de Transação
							</label>
							<TransactionTypeSelector
								id={formId}
								value={formData.type}
								onChange={handleTransactionType}
							/>
						</div>

						<Input
							label="Descrição"
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Ex: Supermercado, Salário, etc..."
							required
						/>

						<Input
							label="Valor"
							name="amount"
							type="number"
							step="0.01"
							//min="0.01"
							value={formData.amount}
							onChange={handleChange}
							placeholder="R$ 0,00"
							icon={<DollarSign className="w-4 h-4 " />}
							//required
						/>

						<Input
							label="Data"
							name="date"
							type="date"
							value={formData.date}
							onChange={handleChange}
							icon={<Calendar className="w-4 h-4" />}
							//required
						/>

						<Select
							label="Categoria"
							name="categoryId"
							value={formData.categoryId}
							onChange={handleChange}
							icon={<Tag className="w-4 h-4" />}
							//required
							options={[
								{ value: "", label: "Selecione uma Categoria" },
								...filteredCategories.map((category) => ({
									value: category.id,
									label: category.name,
								})),
							]}
						/>

						<div className="flex justify-end gap-2 mt-6">
							<Button
								variant="outline"
								onClick={handleCancel}
								type="button"
								disabled={loading}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								disabled={loading}
								variant={
									formData.type === TransactionType.expense
										? "danger"
										: "success"
								}
							>
								{loading ? (
									<div className="flex items-center justify-center">
										<div className="w-4 h-4 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
									</div>
								) : (
									<Save className="w-4 h-4 mr-2 " />
								)}
								Salvar
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default TransactionsForms;
