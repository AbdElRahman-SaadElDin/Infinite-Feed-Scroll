import axios from "axios";
import { type PaginatedPostsResponse } from "../types/items";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5173";

export const fetchPosts = async (
	page: number
): Promise<PaginatedPostsResponse> => {
	const res = await axios.get<PaginatedPostsResponse>(
		`${API_BASE}/api/posts?page=${page}`
	);
	return res.data;
};
