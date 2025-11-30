import axios from "axios";
import { type PaginatedItemsResponse } from "../types/items";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5173";

// export const fetchItems = async (
//   page: number
// ): Promise<PaginatedItemsResponse> => {
//   const res = await axios.get<PaginatedItemsResponse>(
//     `/api/items?page=${page}`
//   );
//   return res.data;
// };

export const fetchItems = async (
	page: number
): Promise<PaginatedItemsResponse> => {
	const res = await axios.get<PaginatedItemsResponse>(
		`${API_BASE}/api/items?page=${page}`
	);
	return res.data;
};
