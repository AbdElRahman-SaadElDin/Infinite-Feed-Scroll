export interface Item {
  id: number;
  title: string;
  description: string;
}

export interface PaginatedItemsResponse {
  data: Item[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
