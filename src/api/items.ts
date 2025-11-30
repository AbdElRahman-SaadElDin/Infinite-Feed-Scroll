import axios from "axios";
import { type PaginatedItemsResponse } from "../types/items";

export const fetchItems = async (
  page: number
): Promise<PaginatedItemsResponse> => {
  const res = await axios.get<PaginatedItemsResponse>(
    `/api/items?page=${page}`
  );
  return res.data;
};
