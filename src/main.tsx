import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { MernAccessProvider } from 'mern-access-client'
import { RoomProvider } from './context/room.tsx'
import config from '../mern-access.config'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <MernAccessProvider config={config}>
        <RoomProvider>
          <ToastContainer position="top-center" autoClose={3000} />
          <App />
        </RoomProvider>
      </MernAccessProvider>
    </Router>
  </StrictMode>,
)
