import { useEffect, useRef } from "react";

type DrawingCanvasProps = {
  color: string;
  lineWidth: number;
  onClearRef: React.MutableRefObject<(() => void) | null>;
};

export default function DrawingCanvas({
  color,
  lineWidth,
  onClearRef,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  // Initialize canvas
  useEffect(function () {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    contextRef.current = context;
  }, []);

  // Sync color
  useEffect(function () {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  // Sync line width
  useEffect(function () {
    if (contextRef.current) {
      contextRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!contextRef.current) return;

    isDrawingRef.current = true;
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current || !contextRef.current) return;

    contextRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    contextRef.current.stroke();
  }

  function stopDrawing() {
    if (!contextRef.current) return;

    isDrawingRef.current = false;
    contextRef.current.closePath();
  }

  function clearBoard() {
    if (!canvasRef.current || !contextRef.current) return;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  }

  // expose clear function to parent
  useEffect(() => {
    onClearRef.current = clearBoard;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      className="bg-white rounded-md border-4 border-black"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
}