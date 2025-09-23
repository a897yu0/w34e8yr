interface ResizableVerticalWrapperProps {
  defaultLayoutHeight: number;
  layoutHeight: number;
  setLayoutHeight: (height: number) => void;

  minHeight: number;
  
  className?: string;

  children: React.JSX.Element;
}

export type { ResizableVerticalWrapperProps };
