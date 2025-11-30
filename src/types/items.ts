export interface Post {
  id: number;
  title: string;
  userName: string;
  userAvatar: string;
  description: string;
}

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

export interface PaginatedPostsResponse {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
