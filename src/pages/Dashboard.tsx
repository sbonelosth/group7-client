import { useMernAccess } from 'mern-access-client';
import { useRoom } from '../context/room';
import type { RoomData } from '../types';
import { getAuthHeaders } from '../services/rooms';
import { formatLastUpdated } from '../utils/utils';
import { CheckCircle, Eye, EyeOff, LogOut, Thermometer, Users, User, XCircle } from 'lucide-react';
import { useState } from 'react';

function Dashboard() {
  const { user } = useMernAccess();
  const { rooms, refreshRooms, temperature, isOccupied } = useRoom();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    <div className="w-full sm:h-screen flex flex-col justify-center items-center bg-[#2c3e5011] backdrop-blur-sm">
      <div className="w-11/12 max-w-[640px] my-5 mx-auto flex flex-col items-center">
        <header className="w-full bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white p-6 text-center mb-6 rounded-2xl shadow-lg relative">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="sm:text-left sm:mb-0 mb-4">
                <h1 className="text-2xl font-bold">Smart Lighting Control</h1>
                <div className="text-blue-200">Room Management</div>
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                <div className="text-left">
                  <div className="font-semibold text-white">{user?.username || 'User'}</div>
                  <div className="text-sm text-blue-200 flex items-center space-x-1">
                    <span>{user?.email}</span>
                    {user?.isEmailVerified && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-[#3498db] to-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-200/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#3498db] to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 truncate text-left">{user?.username || 'User'}</div>
                        <div className="text-sm text-gray-600 truncate flex items-center space-x-1">
                          <span>{user?.email}</span>
                          {user?.isEmailVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        localStorage.removeItem('7eb6b9dc1bca0e08618ab35d115762dd');
                        window.location.reload();
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Enhanced Monitor Section with Icons */}
        <div className="w-full bg-gradient-to-br from-[#34495e] to-[#2c3e50] text-white p-6 rounded-2xl shadow-lg mb-8 border border-white/10">
          <h2 className="text-xl font-bold mb-6 flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-300" />
            </div>
            <span>Room Monitor</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temperature Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Thermometer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200 font-medium">Temperature</div>
                    <div className="text-2xl font-bold text-white">{temperature}°C</div>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full animate-pulse ${temperature && temperature > 25 ? 'bg-red-400' : temperature && temperature < 18 ? 'bg-blue-400' : 'bg-green-400'
                  }`}></div>
              </div>
            </div>

            {/* Occupancy Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${isOccupied
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                      : 'bg-gradient-to-br from-gray-400 to-slate-500'
                    }`}>
                    {isOccupied ? (
                      <Users className="w-6 h-6 text-white" />
                    ) : (
                      <EyeOff className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-blue-200 font-medium">Occupancy</div>
                    <div className={`text-2xl font-bold ${isOccupied ? 'text-green-300' : 'text-gray-300'
                      }`}>
                      {isOccupied ? 'Occupied' : 'Vacant'}
                    </div>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full animate-pulse ${isOccupied ? 'bg-green-400' : 'bg-gray-400'
                  }`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-5 flex-wrap justify-center">
          {rooms.length === 0 ? (
            <p className="text-center">No rooms available.</p>
          ) : (
            rooms.map((room) => (
              <div
                className={`w-[50%] min-w-[300px] rounded-xl p-5 text-center shadow-sm ${room.ldrState === 'DARK' ? 'bg-[#34495e] text-white border-[#2c3e50]' : 'bg-white border border-[#bdc3c7]'
                  }`}
                key={room.roomName}
              >
                <h2 className="flex justify-center items-center gap-2.5 mb-4">
                  {room.roomName}
                  <span className={`font-bold px-2.5 py-1 rounded text-sm text-white ${room.state === "ON" ? "bg-[#2ecc71]" : "bg-[#e74c3c]"
                    }`}>

                  </span>
                </h2>
                <div
                  className={`light-bulb w-10 h-10 rounded-full mx-auto my-2.5 border-2 border-[#95a5a6] transition-all ${room.state === 'ON' ? 'on' : 'bg-[#ccc]'
                    }`}
                ></div>
                <button
                  className="w-full py-3 bg-[#007bff] text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-[#0056b3] mt-4"
                  onClick={() => toggleRoom(room)}
                >
                  Turn {room.state === 'ON' ? 'OFF' : 'ON'}
                </button>
                <button
                  className="w-full py-3 bg-[#3498db] text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-[#2980b9] mt-2"
                  onClick={() => toggleMode(room)}
                >
                  Set {room.mode === 'AUTO' ? 'Manual' : 'Auto'}
                </button>
                <div className="mt-2.5 text-xs">
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