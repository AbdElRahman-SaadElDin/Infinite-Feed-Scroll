import { type User } from "../types/items";
import { useEffect, useRef } from "react";

interface UserCardProps {
	user: User;
	isNew?: boolean;
	index?: number;
}

const UserCard = ({ user, isNew = false, index = 0 }: UserCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const animationDelay = isNew ? index * 0.05 : 0;

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
			<div className='flex flex-col items-center gap-3 sm:gap-4'>
				<div className='shrink-0'>
					<img
						src={user.avatar}
						alt={user.name}
						className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-[3px] border-[#abc8f4]'
					/>
				</div>
				<div className='flex-1 text-center min-w-0 w-full'>
					<h2 className='text-base sm:text-lg font-semibold mb-1 truncate text-[#383838]'>
						{user.name}
					</h2>
					<p className='text-sm sm:text-base truncate text-[#383838]'>
						{user.email}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
