import { useEffect, useRef } from 'react';

export default function CanvasBoard() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null); //crearting reference(initially null). It gives direct acces to DOM element, No re-render when ref changes
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawingRef = useRef(false); //store drawing state with triggering re-render

    //run once on mount -> equivalent to componentDidMount
    useEffect(() => {
        const canvas = canvasRef.current; //checking the null ref -> canvas.current points to actual canvas DOM element
        if(!canvas) return;

        const context = canvas.getContext("2d"); //it will give us the drawing engine
        if(!context) return;
        
        //set Default drawing style
        context.lineCap = "round"; //shape 
        context.lineWidth = 3; //thickness
        context.strokeStyle = "black"; 

        contextRef.current = context;
    }, []); 

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const context = contextRef.current;
        if(!context) return;

        isDrawingRef.current = true;

        context.beginPath();                                          //starts a new drawing path  
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //to get cursor position inside canvas
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const context = contextRef.current;
        if(!context || !isDrawingRef.current) return;

        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //draw line from previous position to new position
        context.stroke();                                             //paints this line
    };

    const stopDrawing = () => {
        const context = contextRef.current;
        if(!context) return;

        context.closePath();                                        //close current path
        isDrawingRef.current = false;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100"> {/* Layout container -> centers canvas with full screen height and clean background */}
            <canvas
                ref={canvasRef}
                width={800} //setting as attribute will set internal pixels
                height={500}
                className="bg-white shadow-lg rounded-lg"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    )
}
