import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  function createRoom() { //creating a unique room id
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        onClick={createRoom}
        className="px-6 py-3 bg-blue-600 text-white rounded-md"
      >
        Create Room
      </button>
    </div>
  );
}