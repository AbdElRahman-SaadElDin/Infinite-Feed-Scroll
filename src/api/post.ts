import axios from "axios";

export const fetchPosts = async (page: number) => {
  const res = await axios.get(`/api/posts?page=${page}`);
  return res.data;
};
