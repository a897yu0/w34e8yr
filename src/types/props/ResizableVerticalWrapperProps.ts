interface ResizableVerticalWrapperProps {
  minHeight: number;
  defaultHeight: number;
  userHeight: number;
  setUserHeight: (height: number) => void;

  className?: string;

  children: React.JSX.Element;
}

export type { ResizableVerticalWrapperProps };
