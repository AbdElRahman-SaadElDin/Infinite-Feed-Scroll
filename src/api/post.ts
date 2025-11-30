import axios from "axios";
import { type PaginatedPostsResponse } from "../types/items";

export const fetchPosts = async (
  page: number
): Promise<PaginatedPostsResponse> => {
  const res = await axios.get<PaginatedPostsResponse>(
    `/api/posts?page=${page}`
  );
  return res.data;
};
