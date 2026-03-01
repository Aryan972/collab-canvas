import { useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";

type DrawingCanvasProps = {
  roomId: string;
  color: string;
  lineWidth: number;
  onClearRef: React.RefObject<(() => void) | null>;
};


export default function DrawingCanvas({
  roomId,
  color,
  lineWidth,
  onClearRef,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  const { socket } = useSocket();
  console.log("Socket inside DrawingCanvas:", socket);

  const context = useSocket();
  console.log("Full socket context: ", context);

  //room logic
  useEffect(() => {
    if(!socket) return;

    socket.emit("join-room", roomId); //whenever socket available -> join room
    console.log("Joined room:", roomId);
  }, [socket, roomId]);

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


  //start drawing
  function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!contextRef.current) return;

    isDrawingRef.current = true;
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    //emit start event to sync among multiple users
    if(socket) {
      socket.emit("start", {
          roomId,
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          color,
          lineWidth,
      });
    }
  }

  //drawing while moving
  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current || !contextRef.current) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    //emit draw event
    if(socket) {
      socket.emit("draw", {
        roomId,
        x,
        y,
        color,
        lineWidth,
      });
    }
  }

  function stopDrawing() {
    if (!contextRef.current) return;

    isDrawingRef.current = false;
    contextRef.current.closePath();
  }

  function clearBoard() {
    console.log("Local clear triggered");

    if (!canvasRef.current || !contextRef.current) return;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    //emit clear event
    if(socket) {
      console.log("Emitting clear event");
      socket.emit("clear", {
        roomId,
      });
    } else{
      console.log("Socket is null during clear");
    }
  }

  // expose clear function to parent
  useEffect(() => {
    onClearRef.current = clearBoard;
  }, [clearBoard]);

  //listen for remote start
  useEffect(() => {
    if (!socket) return;

    const handleStart = (data: {
      x: number;
      y: number;
      color: string;
      lineWidth: number;
    }) => {
      const context = contextRef.current;
      if (!context) return;

      context.beginPath();
      context.strokeStyle = data.color;
      context.lineWidth = data.lineWidth;
      context.moveTo(data.x, data.y);
    };

    socket.on("start", handleStart);

    return () => {
      socket.off("start", handleStart);
    };
  }, [socket]);

  //Listen for remote draw
  useEffect(() => {
    if (!socket) return;

    const handleDraw = (data: {
      x: number;
      y: number;
      color: string;
      lineWidth: number;
    }) => {
      const context = contextRef.current;
      if (!context) return;

      context.strokeStyle = data.color;
      context.lineWidth = data.lineWidth;
      context.lineTo(data.x, data.y);
      context.stroke();
    };

    socket.on("draw", handleDraw);

    return () => {
      socket.off("draw", handleDraw);
    };
  }, [socket]);

  //listen for remote clear
  useEffect(() => {
    if (!socket) return;

    const handleClear= () => {
      if( !canvasRef.current || !contextRef.current) return;

      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    };

    socket.on("clear", handleClear);

    return () => {
      socket.off("clear", handleClear);
    };
  }, [socket]);

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