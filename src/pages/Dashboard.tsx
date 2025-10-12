import { useMernAccess } from 'mern-access-client';
import { useRoom } from '../context/room';
import type { RoomData } from '../types';
import { getAuthHeaders } from '../services/rooms';
import { formatLastUpdated } from '../utils/utils';

function Dashboard() {
  const { user } = useMernAccess();
  const { rooms, refreshRooms, temperature, isOccupied } = useRoom();

  // ---- Toggle ON/OFF ----
  async function toggleRoom(room: RoomData) {
    try {
      const nextState = room.state === 'ON' ? 'OFF' : 'ON';
      const nextMode = 'MANUAL';

      const res = await fetch('http://localhost:3000/rooms/action', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          roomName: room.roomName,
          action: nextState,
          mode: nextMode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to toggle');
      refreshRooms?.();
    } catch (err: any) {
      alert(`Error toggling ${room.roomName}: ${err.message || err}`);
    }
  }

  // ---- Switch AUTO / MANUAL mode ----
  async function toggleMode(room: RoomData) {
    try {
      const nextMode = room.mode === 'AUTO' ? 'MANUAL' : 'AUTO';

      const res = await fetch('http://localhost:3000/rooms/action', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          roomName: room.roomName,
          mode: nextMode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change mode');
      refreshRooms?.();
    } catch (err: any) {
      alert(`Error changing mode for ${room.roomName}: ${err.message || err}`);
    }
  }

  return (
    <div className='dashboard-container-outer'>
    <div className='dashboard-container-inner'>
      <header>
        <h1>Smart Room Lighting Control</h1>
        <div>Welcome, {user?.username || 'User'}</div>
        <button className='logout-btn' onClick={() => { localStorage.removeItem('7eb6b9dc1bca0e08618ab35d115762dd'); window.location.reload(); }}>Logout</button>
      </header>

      {<div className="controls dark">
        <h2>Monitor</h2>
        <div className="control-group">
          <div>Temperature: {temperature} °C</div>
          <div>Occupancy: {isOccupied ? 'Occupied' : 'Vacant'}</div>
        </div>
      </div>}

      <div className="room-container">
        {rooms.length === 0 ? (
          <p>No rooms available.</p>
        ) : (
          rooms.map((room) => (
            <div className={`room ${room.ldrState === 'DARK' && 'dark'}`} key={room.roomName}>
              <h2>{room.roomName} <span className={`status-indicator ${room.state === "ON" && "on"}`}>{room.state}</span></h2>
              <div
                className="light-bulb"
                style={{
                  background: room.state === 'ON' ? 'yellow' : '#ccc',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  margin: '10px auto'
                }}
              ></div>
              <button onClick={() => toggleRoom(room)}>
                Turn {room.state === 'ON' ? 'OFF' : 'ON'}
              </button>
              <button onClick={() => toggleMode(room)}>
                Set {room.mode === 'AUTO' ? 'Manual' : 'Auto'}
              </button>
              <div style={{ marginTop: 10, fontSize: 12 }}>
                Last updated: {formatLastUpdated(room.lastUpdated)}<br />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Dashboard;