import axios from "axios";

export const fetchItems = async (page: number) => {
	const res = await axios.get(`/api/items?page=${page}`);
	return res.data;
};
