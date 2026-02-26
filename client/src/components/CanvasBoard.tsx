import { useEffect, useRef } from 'react';

export default function CanvasBoard() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);          //crearting reference(initially null). It gives direct acces to DOM element, No re-render when ref changes
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawingRef = useRef(false);                                //store drawing state with triggering re-render

    //run once on mount -> equivalent to componentDidMount
    useEffect(() => {
        const canvas = canvasRef.current;                              //checking the null ref -> canvas.current points to actual canvas DOM element
        if(!canvas) return;

        const context = canvas.getContext("2d");                      //it will give us the drawing engine
        if(!context) return;
        
        //set Default drawing style
        context.lineCap = "round"; //shape 
        context.lineWidth = 3; //thickness
        context.strokeStyle = "black"; 

        contextRef.current = context;
    }, []); 

    function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {  //the typescript will tell us what typeof event it is and what element triggers it
        const context = contextRef.current;
        if(!context) return;

        isDrawingRef.current = true;
        document.body.style.overflow="hidden";      

        context.beginPath();                                          //starts a new drawing path  
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //to get cursor position inside canvas
    }

    function draw(e: React.MouseEvent<HTMLCanvasElement>) {
        const context = contextRef.current;
        if(!context || !isDrawingRef.current) return;

        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //draw line from previous position to new position
        context.stroke();                                             //paints this line
    }

    function stopDrawing() {
        const context = contextRef.current;
        if(!context) return;

        context.closePath();                                          //close current path
        isDrawingRef.current = false;
        document.body.style.overflow="auto";

    }

    function clearBoard(){                                          //to clear the board -> it's just clearing pixels so re-render is not reqiired(not using usestate)
        const canvas = canvasRef.current;
        const context = contextRef.current;

        if(!canvas || !context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center items-center p-6"> {/* Layout container -> centers canvas with full screen height and clean background */}
            <div className="bg-gray-100 p-8 rounded-2xl shadow-2xl border-2 border-gray-300">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    CollabCanvas Board
                </h2>
                
                <button 
                    onClick={clearBoard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"    
                >
                    Clear
                </button>
                <canvas
                    ref={canvasRef}
                    width={800}                                           //setting as attribute will set internal pixels
                    height={500}
                    className="bg-white rounded-md border-4 border-black cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>
        </div>
    )
}
