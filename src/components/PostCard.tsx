import { type Post } from "../types/items";
import { useEffect, useRef, type ReactElement } from "react";

interface PostCardProps {
  post: Post;
  isNew?: boolean;
  index?: number;
}

const PostCard = ({
  post,
  isNew = false,
  index = 0,
}: PostCardProps): ReactElement => {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationDelay: number = isNew ? index * 0.05 : 0;

  useEffect(() => {
    if (isNew && cardRef.current) {
      cardRef.current.style.setProperty("--delay", `${animationDelay}`);
    }
  }, [isNew, animationDelay]);

  return (
    <div
      ref={cardRef}
      className={`${
        isNew ? "card-enter" : ""
      } rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 border-2 bg-[#f9f9f9] border-[#abc8f4] hover:border-[#2e7df4] hover:-translate-y-1`}
    >
      <div className="flex flex-col gap-4">
        {/* Header with user info */}
        <div className="flex items-center gap-3">
          <img
            src={post.userAvatar}
            alt={post.userName}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-[3px] border-[#abc8f4] shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-[#383838] truncate">
              {post.userName}
            </h3>
          </div>
        </div>

        {/* Post title */}
        <h2 className="text-base sm:text-lg font-bold text-[#383838] line-clamp-2">
          {post.title}
        </h2>

        {/* Post description */}
        <p className="text-sm sm:text-base text-[#383838] opacity-80 line-clamp-3">
          {post.description}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
