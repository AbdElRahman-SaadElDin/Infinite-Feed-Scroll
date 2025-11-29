import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchItems } from "../api/items";
import { type Item, type PaginatedItemsResponse } from "../types/items";
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
			<div style={{ padding: "20px", color: "red" }}>
				<p>Something went wrong!</p>
				<button onClick={() => refetch()}>Retry</button>
			</div>
		);
	}

	if (isLoading) {
		return <div>Loading feed...</div>;
	}

	const items: Item[] =
		data?.pages.flatMap((page) => (page as PaginatedItemsResponse).data) || [];

	return (
		<div>
			{items.map((item) => (
				<div key={item.id}>
					<h2>{item.title}</h2>
					<p>{item.description}</p>
				</div>
			))}

			{isFetchingNextPage && <div>Loading more items...</div>}
			{isFetching && !isFetchingNextPage && <div>Loading feed...</div>}
		</div>
	);
};

export default Feed;
