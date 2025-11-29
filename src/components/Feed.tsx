import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchItems } from "../api/items";
import { type PaginatedItemsResponse, type User } from "../types/items";
import { useEffect } from "react";

const Feed = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		isError,
		refetch,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ["items"],
		queryFn: ({ pageParam = 1 }) => fetchItems(pageParam as number),
		getNextPageParam: (lastPage: PaginatedItemsResponse) => {
			const loadedItems = lastPage.page * lastPage.pageSize;
			return loadedItems < lastPage.total ? lastPage.page + 1 : undefined;
		},
		initialPageParam: 1,
	} as any);

	const handleScroll = () => {
		if (
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
			hasNextPage
		) {
			fetchNextPage();
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [hasNextPage]);

	if (isError) {
		return (
			<div>
				<p>Something went wrong!</p>
				<button onClick={() => refetch()}>Retry</button>
			</div>
		);
	}

	if (isLoading) {
		return <div>Loading feed...</div>;
	}

	const items: User[] =
		data?.pages.flatMap((page) => (page as PaginatedItemsResponse).data) || [];

	return (
		<div>
			{items.map((item) => (
				<div
					key={item.id}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						marginBottom: "1rem",
					}}
				>
					<img
						src={item.avatar}
						alt={item.name}
						style={{ width: 48, height: 48, borderRadius: "50%" }}
					/>
					<div>
						<h2>{item.name}</h2>
						<p>{item.email}</p>
					</div>
				</div>
			))}

			{isFetchingNextPage && <div>Loading more items...</div>}
			{isFetching && !isFetchingNextPage && <div>Loading feed...</div>}
		</div>
	);
};

export default Feed;
