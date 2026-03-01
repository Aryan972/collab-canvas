import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [roomInput, setRoomInput] = useState("");

  function createRoom() {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  }

  function joinRoom() {
    if (!roomInput.trim()) return;
    navigate(`/room/${roomInput}`);
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">CollabCanvas</h1>
      <p className="text-gray-500 mb-10 text-center max-w-md">
        Real-time collaborative whiteboard with room-based drawing and live synchronization.
      </p>

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <button
          onClick={createRoom}
          className="w-full bg-gray-900 hover:bg-gray-500 transition py-3 rounded-lg font-semibold transition"
        >
          Create New Room
        </button>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 text-black"
          />
          <button
            onClick={joinRoom}
            className="bg-gray-900 hover:bg-gray-500 px-4 rounded-lg"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}