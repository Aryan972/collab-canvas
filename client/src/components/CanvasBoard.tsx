import { useRef, useState } from "react";
import Toolbar from "./Toolbar";
import DrawingCanvas from "./DrawingCanvas";

export default function CanvasBoard() {
  // Shared state (single source of truth)
  const [color, setColor] = useState<string>("black");
  const [lineWidth, setLineWidth] = useState<number>(3);

  // Clear function reference from DrawingCanvas
  const clearRef = useRef<(() => void) | null>(null);

  function handleClear() {
    if (clearRef.current) {
      clearRef.current();
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-6">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-2xl border-2 border-gray-300">

        <Toolbar
          color={color}
          setColor={setColor}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
          onClear={handleClear}
        />

        <DrawingCanvas
          color={color}
          lineWidth={lineWidth}
          onClearRef={clearRef}
        />

      </div>
    </div>
  );
}