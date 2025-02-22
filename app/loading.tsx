import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
    : "w-full";

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <div className="flex flex-col items-center gap-3 p-4">
        <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
        {text && (
          <p
            className={`${textSizes[size]} font-medium text-gray-700 dark:text-gray-200`}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
