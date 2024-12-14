import React from "react";
interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const LoadMoreButton = ({ onClick, isLoading }: LoadMoreButtonProps) => {
  return (
    <div className="flex justify-center my-8">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full 
                 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1A1D29]"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          "Load More"
        )}
      </button>
    </div>
  );
};
