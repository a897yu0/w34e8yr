import clsx from "clsx";
import React from "react";

import type { ResizableVerticalWrapperProps } from "@/types/props/ResizableVerticalWrapperProps";

function getValueInCorrectRange(minValue: number, value: number): number {
  if (minValue < 0) {
    throw new Error(`Minimum value (${minValue}) cannot be negative`);
  }

  console.assert(minValue >= 0);
  return Math.max(value, minValue);
}

function ResizableVerticalWrapper(props: ResizableVerticalWrapperProps): React.JSX.Element {
  const minHeight: number = props.minHeight;
  // const defaultHeight: number = props.defaultHeight;
  const userHeight: number = props.userHeight;
  const setUserHeight: (height: number) => void = props.setUserHeight;

  if (minHeight < 0) {
    throw new Error(`Minimum height (${minHeight}) cannot be negative`);
  }

  const children: React.JSX.Element = props.children;

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const tableResizerRef = React.useRef<HTMLDivElement>(null);

  // const initHeight: number = 177;
  // const minHeight: number = 77;

  const [height, setHeight] = React.useState<number>(getValueInCorrectRange(minHeight, userHeight));
  const [isResizableTableDragging, setIsResizableTableDragging] = React.useState<boolean>(false);

  const handleTableResizerPointerDown = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Don't preventDefault here for touch events
    if ('touches' in e) {
      // Just start dragging, preventDefault will happen in touchmove
    } else {
      e.preventDefault(); // Only prevent for mouse events
    }

    setIsResizableTableDragging(true);
  }, []);

  const handleTableResizerPointerMove = React.useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizableTableDragging || !tableContainerRef.current) {
      return;
    }

    // Prevent default behavior and stop event propagation
    e.preventDefault();
    e.stopPropagation();

    const containerRect = tableContainerRef.current.getBoundingClientRect();

    // Get Y position from either mouse or touch event
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    if (clientY === undefined) {
      return;
    }

    if (clientY < containerRect.top) {
      return;
    }

    console.assert(containerRect.top <= clientY);
    const height = (clientY - containerRect.top);

    console.assert(minHeight >= 0);
    const newHeight = Math.max(height, minHeight);

    setHeight(newHeight);
    setUserHeight(newHeight);

  }, [isResizableTableDragging, minHeight]);

  const handleTableResizerPointerUp = React.useCallback(() => {
    setIsResizableTableDragging(false);
  }, []);

  const handleManualExpansion = () => {
    setHeight((prevHeight: number) => {
      const newHeight: number = (prevHeight + 77);

      console.assert(newHeight >= 0);
      setUserHeight(newHeight);
      return newHeight;
    });
  };

  const handleManualReduction = () => {
    setHeight((prevHeight: number) => {
      console.assert(minHeight >= 0);
      const newHeight: number = Math.max(prevHeight - 77, minHeight);

      console.assert(newHeight >= 0);
      setUserHeight(newHeight);
      return newHeight;
    });
  };

  // Resizable sidebar handlers
  React.useEffect(() => {
    if (isResizableTableDragging) {
      document.addEventListener('mousemove', handleTableResizerPointerMove);
      document.addEventListener('mouseup', handleTableResizerPointerUp);
      document.addEventListener('touchmove', handleTableResizerPointerMove, { passive: false });
      document.addEventListener('touchend', handleTableResizerPointerUp);

      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
      document.body.style.touchAction = 'none'; // Prevent scrolling on mobile
    }

    return () => {
      document.removeEventListener('mousemove', handleTableResizerPointerMove);
      document.removeEventListener('mouseup', handleTableResizerPointerUp);
      document.removeEventListener('touchmove', handleTableResizerPointerMove);
      document.removeEventListener('touchend', handleTableResizerPointerUp);

      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
    };
  }, [isResizableTableDragging, handleTableResizerPointerMove, handleTableResizerPointerUp]);

  return (
    <div className="w-full h-fit flex flex-col justify-between items-center">
      <div
        ref={tableContainerRef}
        className="w-full overflow-auto border border-black relative"
        style={{
          height: `${height}px`
        }}
      >
        <div className="absolute w-fit h-fit">
          {children}
        </div>
      </div>

      <div
        ref={tableResizerRef}
        className={clsx(
          "w-full h-1 cursor-row-resize ",
          isResizableTableDragging ? 'bg-blue-500' : 'bg-gray-400',
        )}
        onMouseDown={handleTableResizerPointerDown}
        onTouchStart={handleTableResizerPointerDown}
      >
      </div>

      <div className="w-full h-7 flex flex-row justify-end items-center gap-1">
        <div className="h-full aspect-square cursor-pointer" onClick={() => handleManualReduction()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </div>
        <div className="h-full aspect-square cursor-pointer" onClick={() => handleManualExpansion()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

    </div>
  );
}

export default ResizableVerticalWrapper;
