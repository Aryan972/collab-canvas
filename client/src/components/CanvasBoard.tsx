import { useRef, useState } from "react";
import Toolbar from "./Toolbar";
import DrawingCanvas from "./DrawingCanvas";

type CanvasBoardProps = {
  roomId: string;
}

export default function CanvasBoard({roomId} : CanvasBoardProps) {
  // Shared state (single source of truth)
  const [color, setColor] = useState<string>("black");
  const [lineWidth, setLineWidth] = useState<number>(3);

  const [userCount, setUserCount] = useState(1);

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

        {/* Header */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Room: <span className="text-gray-600">{roomId}</span>
          </h2>

          <div className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
            {userCount} {userCount === 1 ? "User" : "Users"}
          </div>
          
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Copy Link
          </button>

        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 p-6">
        
          <Toolbar
            color={color}
            setColor={setColor}
            lineWidth={lineWidth}
            setLineWidth={setLineWidth}
            onClear={handleClear}
          />

          <DrawingCanvas
            roomId={roomId}
            color={color}
            lineWidth={lineWidth}
            onClearRef={clearRef}
            onUserCountChange={setUserCount}
          />
        </div>

      </div>
    </div>
  );
}
