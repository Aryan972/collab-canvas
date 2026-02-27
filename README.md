# CollabCanvas – Real-Time Collaborative Whiteboard

CollabCanvas is a real-time collaborative whiteboard built using **React, TypeScript, Node.js, and Socket.io**.  
Multiple users can draw simultaneously and see updates instantly across connected clients.

---

## Live Features

-  Real-time drawing synchronization
-  Color and stroke width selection
-  Clear board sync across all users
-  WebSocket-based communication
-  Clean component-based architecture
-  Optimized rendering using `useRef`

---

## Architecture

The application follows a clean separation of concerns:

- **CanvasBoard** – State coordinator
- **Toolbar** – UI controls (color, width, clear)
- **DrawingCanvas** – Canvas rendering engine
- **SocketContext** – Global WebSocket management

### Real-Time Event Flow

**Drawing**
User → Emit `start` / `draw` → Server → Broadcast → Other Clients Render

**Clear**
User → Emit `clear` → Server → Broadcast → All Clients Clear

---

## Tech Stack

### Frontend
- React
- TypeScript
- Context API
- Tailwind CSS
- HTML5 Canvas API
- Socket.io Client

### Backend
- Node.js
- Express
- Socket.io
- Event-driven architecture

---

## Engineering Challenges Solved

- Managed WebSocket lifecycle correctly using Context API
- Resolved stale closure issue in event handlers
- Prevented unnecessary re-renders using `useRef`
- Ensured proper listener registration after socket initialization
- Implemented real-time bidirectional communication

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
