import { useRef, useState } from "react";
import Toolbar from "./Toolbar";
import DrawingCanvas from "./DrawingCanvas";

type CanvasBoardProps = {
  roomId: string;
};

export default function CanvasBoard({ roomId }: CanvasBoardProps) {
  // Shared state (single source of truth)
  const [color, setColor] = useState<string>("black");
  const [lineWidth, setLineWidth] = useState<number>(3);

  const [userCount, setUserCount] = useState(1); //to count the number of users
  const [copied, setCopied] = useState(false); //to show the pop up of link copied when user clicks

  // Clear function reference from DrawingCanvas
  const clearRef = useRef<(() => void) | null>(null);

  function handleClear() {
    if (clearRef.current) {
      clearRef.current();
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6 min-w-0">
          <Toolbar
            color={color}
            setColor={setColor}
            lineWidth={lineWidth}
            setLineWidth={setLineWidth}
            onClear={handleClear}
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 px-2 py-1 rounded-md font-mono text-gray-500">
            Room Id:{roomId}
          </div>

          <div className="bg-gray-200 px-2 py-1 rounded-md font-mono text-gray-500">
            Active Users:{userCount}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
              className="bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-gray-800 transition"
            >
              Copy Link
            </button>

            {copied && (
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow">
                Copied
              </div>
            )}
          </div>
        </div>
      </div>

      {/*FULL CANVAS AREA */}
      <div className="flex-1">
        <DrawingCanvas
          roomId={roomId}
          color={color}
          lineWidth={lineWidth}
          onClearRef={clearRef}
          onUserCountChange={setUserCount}
        />
      </div>
    </div>
  );
}
