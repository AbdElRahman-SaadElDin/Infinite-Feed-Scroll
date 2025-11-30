import { SearchIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const location = useLocation();
  const isPostsPage = location.pathname === "/posts";

  return (
    <nav className="w-full bg-[#eee] border-b-2 border-[#abc8f4] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-[#383838] hover:text-[#2e7df4] transition-colors"
          >
            Infinite Feed
          </Link>

          {/* Filters Container */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Tabs */}
            <div className="flex gap-2 bg-[#ffe3e3] p-1 rounded-lg border border-[#ff807d]">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  !isPostsPage
                    ? "bg-[#2e7df4] text-[#f9f9f9] shadow-md"
                    : "text-[#383838] hover:bg-[#ff807d] hover:text-[#f9f9f9]"
                }`}
              >
                Users
              </Link>
              <Link
                to="/posts"
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  isPostsPage
                    ? "bg-[#2e7df4] text-[#f9f9f9] shadow-md"
                    : "text-[#383838] hover:bg-[#ff807d] hover:text-[#f9f9f9]"
                }`}
              >
                Posts
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64 lg:w-80">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border-2 border-[#abc8f4] bg-[#f9f9f9] text-[#383838] placeholder:text-[#383838] placeholder:opacity-60 focus:outline-none focus:border-[#2e7df4] focus:ring-2 focus:ring-[#abc8f4] transition-all duration-200"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#383838] opacity-60" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#383838] opacity-60 hover:opacity-100 hover:text-[#e95856] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
