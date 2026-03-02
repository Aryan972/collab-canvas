# CollabCanvas – Real-Time Collaborative Whiteboard

🔗 **Live Demo:** https://your-vercel-url.vercel.app  
📂 **GitHub Repository:** https://github.com/your-username/collab-canvas  

---

## Overview

CollabCanvas is a full-stack real-time collaborative whiteboard built using **React, TypeScript, Node.js, and Socket.io**.

It enables multiple users to draw simultaneously inside isolated rooms with live stroke synchronization, active user presence tracking, and board state replay for late joiners.

The system follows an event-driven WebSocket architecture and is deployed in production.


---

## Features

- Real-time multi-user drawing
- Room-based collaboration via dynamic URL routing
- Live active user presence tracking
- Stroke synchronization using WebSockets
- Board state replay for late joiners
- Synchronized clear events
- Copy room link with contextual popup feedback
- Full-screen distraction-free whiteboard layout
- Desktop + Mobile support using Pointer Events
- Optimized rendering using `useRef`
- Deployed frontend (Vercel) & backend (Render)

---

## Architecture

## Room-Based Architecture

Each session is uniquely identified via URL: /room/:roomId

Users inside the same room share:

- Drawing strokes
- Clear events
- Active user count
- Real-time updates

Rooms are fully isolated from each other.

---

## Event-Driven Flow

#### Drawing Flow

User → Emit `start` / `draw` →  
Server stores stroke →  
Broadcast to room →  
Other clients render stroke  

---

#### Clear Flow

User → Emit `start` / `draw` →  
Server stores stroke →  
Broadcast to room →  
Other clients render stroke  

---

#### Late Join Flow

User joins room →  
Server emits stored strokes →  
Client replays board state 

---

## Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Context API
- Tailwind CSS
- HTML5 Canvas API
- Pointer Events API
- Socket.io Client
- Vite

### Backend
- Node.js
- Express
- Socket.io
- Room-based in-memory state managment

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Engineering Highlights

-  Designed scalable room-scoped WebSocket broadcasting
- Implemented real-time presence tracking using Socket.io adapter
- Built late-join board replay mechanism
- Implemented pointer event handling for cross-device input support
- Optimized draw emission frequency for performance
- Managed WebSocket lifecycle using React Context
- Built full-screen responsive whiteboard layout

---

##  Local Development Setup

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
