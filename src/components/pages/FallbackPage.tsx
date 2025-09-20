import type { FallbackPageProps } from "@/types/props/FallbackPageProps";

function FallbackPage(props: FallbackPageProps): React.JSX.Element {
  props;

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Animated dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

export default FallbackPage;
