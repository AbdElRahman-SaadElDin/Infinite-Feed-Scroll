import { http, HttpResponse } from "msw";
import type { PaginatedItemsResponse, User } from "../types/items";

import { faker } from "@faker-js/faker";

const TOTAL_ITEMS = 280;
const ITEMS_PER_PAGE = 20;

export const handlers = [
	http.get("/api/items", ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const delay = Math.random() * 700 + 300;

		const start = (page - 1) * ITEMS_PER_PAGE;
		const items: User[] = Array.from(
			{ length: Math.min(ITEMS_PER_PAGE, TOTAL_ITEMS - start) },
			(_, i) => ({
				id: start + i + 1,
				name: faker.person.fullName(),
				email: faker.internet.email(),
				avatar: faker.image.avatar(),
			})
		);

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(
					HttpResponse.json(
						{
							data: items,
							total: TOTAL_ITEMS,
							page,
							pageSize: ITEMS_PER_PAGE,
							totalPages: Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE),
						} satisfies PaginatedItemsResponse,
						{ headers: { "x-delay": String(delay) } }
					)
				);
			}, delay);
		});
	}),
];
