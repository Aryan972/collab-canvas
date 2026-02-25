import { useEffect, useRef } from 'react';

export default function CanvasBoard() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null); //crearting reference(initially null). It gives direct acces to DOM element, No re-render when ref changes
    
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
    }, []); 

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100"> {/* Layout container -> centers canvas with full screen height and clean background */}
            <canvas
                ref={canvasRef}
                width={800} //setting as attribute will set internal pixels
                height={500}
                className="bg-white shadow-lg rounded-lg"
            />
        </div>
    )
}
