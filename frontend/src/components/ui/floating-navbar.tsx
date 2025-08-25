// React import not required in newer JSX runtimes
import { cn } from "@/lib/utils";
import { useAuth } from "../../context/AuthContext";
import type { JSX } from "react";
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border rounded-full",
        "border-white border-3",
        "bg-black",
        "shadow-none",
        "z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
        "backdrop-blur-md",
        "transition-colors duration-300",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative items-center flex space-x-1",
            "text-gray-300 hover:text-white",
            "transition-colors duration-200",
            "px-3 py-1 rounded-full",
            "hover:bg-gray-800"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm font-medium">
            {navItem.name}
          </span>
        </a>
      ))} 
      {isAuthenticated && user ? (
        <button
          className={cn(
            "border text-sm font-medium relative px-4 py-2 rounded-full",
            " border-gray-600",
            " text-white",
            "bg-transparent hover:bg-gray-800",
            "transition-colors duration-200"
          )}
        >
          <a href="/profile">{user.username}</a>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      ) : ( 
        <button
          className={cn(
            "border text-sm font-medium relative px-4 py-2 rounded-full",
            " border-gray-600",
            " text-white",
            "bg-transparent hover:bg-gray-800",
            "transition-colors duration-200"
          )}
        >
          <a href="/login">Login</a>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      )}
    </div>
  );
};
