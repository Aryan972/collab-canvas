import { useParams } from "react-router-dom";
import CanvasBoard from "../components/CanvasBoard";

export default function RoomPage() {
  const { roomId } = useParams();

  return <CanvasBoard roomId={roomId!} />; //passsing props to canvasboard to identify the room
}