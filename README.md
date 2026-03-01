# CollabCanvas – Real-Time Collaborative Whiteboard

CollabCanvas is a real-time collaborative whiteboard built using **React, TypeScript, Node.js, and Socket.io**.  
Multiple users can draw simultaneously inside isolated rooms with live synchronization.

---

## Live Features

- Real-time multi-user drawing
- Color and stroke width selection
- Clear board synchronization
- Room-based collaboration via URL
- WebSocket-based bidirectional communication
- Optimized rendering using `useRef`
- Clean component-based architecture

---

## Room-Based Architecture

Each room is uniquely identified via URL: /room/:roomId

Users joining the same room share the same canvas state.  
Events are scoped using Socket.io rooms to ensure isolation.

### Room Flow

1. User navigates to `/room/:roomId`
2. Client emits `join-room`
3. Server joins socket to that room
4. All drawing & clear events are broadcast only inside that room

The application follows a clean separation of concerns:

- **CanvasBoard** – State coordinator
- **Toolbar** – UI controls (color, width, clear)
- **DrawingCanvas** – Canvas rendering engine
- **SocketContext** – Global WebSocket management

## Real-Time Event Flow

### Drawing
User → Emit `start` / `draw` (with roomId) → Server → Broadcast to room → Other clients render stroke

### Clear
User → Emit `clear` (with roomId) → Server → Broadcast to room → All room members clear board

---

## Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Context API
- Tailwind CSS
- HTML5 Canvas API
- Socket.io Client

### Backend
- Node.js
- Express
- Socket.io
- Room-based event broadcasting

---

## Engineering Highlights

- Implemented URL-driven room architecture
- Designed event-scoped WebSocket communication
- Fixed stale closure issue in React event handlers
- Managed socket lifecycle using Context API
- Prevented unnecessary re-renders using `useRef`
- Ensured backend stability with proper event payload handling

---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd collab-canvas

### 2. Start Backend
cd server
npm install
npm run start

### 3. Start Frontend
cd client
npm install
npm run dev

Frontend runs at: http://localhost:5173

Backend runs at: http://localhost:5000

Open the app in two browser tabs to test real-time collaboration.
