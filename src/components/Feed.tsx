import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchItems } from "../api/items";
import { type PaginatedItemsResponse, type User } from "../types/items";
import { useEffect, useCallback, useState } from "react";
import UserCard from "./UserCard";

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
      const loadedItems: number = (lastPage.page * lastPage.pageSize) as number;
      return loadedItems < lastPage.total ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#f9f9f9]">
        <div className="rounded-xl shadow-lg p-8 max-w-md w-full text-center bg-[#ffe3e3] border border-[#ff6e6b]">
          <h2 className="text-xl font-semibold mb-2 text-[#383838]">
            Something went wrong!
          </h2>
          <p className="mb-6 text-[#383838]">
            We couldn't load the feed. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg bg-[#2e7df4] hover:bg-[#0e66eb] text-[#f9f9f9]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#f9f9f9]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 mb-4 border-[#2e7df4] border-t-transparent"></div>
          <p className="text-lg font-medium text-[#383838]">Loading feed...</p>
        </div>
      </div>
    );
  }

  const items: User[] =
    data?.pages.flatMap((page) => (page as PaginatedItemsResponse).data) || [];

  // Track the number of items from previous render to detect new items
  const [previousItemCount, setPreviousItemCount] = useState(0);
  const [newItemStartIndex, setNewItemStartIndex] = useState(0);

  useEffect(() => {
    if (items.length > previousItemCount) {
      setNewItemStartIndex(previousItemCount);
    }
    setPreviousItemCount(items.length);
  }, [items.length, previousItemCount]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-[#f9f9f9] min-h-screen">
      <div className="w-full mx-auto">
        <div className="grid grid-auto-fit gap-4 sm:gap-6">
          {items.map((item, index) => (
            <UserCard
              key={item.id}
              user={item}
              isNew={index >= newItemStartIndex}
              index={index - newItemStartIndex}
            />
          ))}
        </div>

        {isFetchingNextPage && (
          <div className="flex justify-center items-center py-8">
            <div className="flex flex-col items-center gap-3">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#2e7df4] border-t-transparent"></div>
              <p className="font-medium animate-pulse text-[#383838]">
                Loading more items...
              </p>
            </div>
          </div>
        )}

        {isFetching && !isFetchingNextPage && (
          <div className="flex justify-center items-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#2e7df4] border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
