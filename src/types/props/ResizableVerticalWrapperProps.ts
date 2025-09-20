interface ResizableVerticalWrapperProps {
  minHeight: number;
  defaultHeight: number;
  userHeight: number;
  setUserHeight: (height: number) => void;

  children: React.JSX.Element;
}

export type { ResizableVerticalWrapperProps };
