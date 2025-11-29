// export interface Item {
// 	id: number;
// 	title: string;
// 	description: string;
// }

export interface User {
	id: number;
	name: string;
	email: string;
	avatar: string;
}

export interface PaginatedItemsResponse {
	data: User[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}
