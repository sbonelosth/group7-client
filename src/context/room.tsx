// create room context using react context api and room service
import React, { createContext, useContext, useState, useEffect } from "react";
import type { RoomData } from "../types";
import { roomService } from "../services/rooms";
import { useMernAccess } from "mern-access-client";
import { useNavigate } from "react-router-dom";

interface RoomContextType {
    rooms: RoomData[];
    temperature?: number | null;
    isOccupied?: boolean | null;
    refreshRooms: () => Promise<void>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rooms, setRooms] = useState<RoomData[]>([]);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [isOccupied, setIsOccupied] = useState<boolean | null>(null);
    const { user, isAuthenticated, isLoading } = useMernAccess();
    const navigate = useNavigate();

    const fetchRooms = async () => {
        if (isAuthenticated) {
            const res = await roomService.fetchRoomData();
            setTemperature(res.data[0]?.temperature || null);
            setIsOccupied(res.data[0]?.occupancy || null);
            setRooms(res.data || []);
        }
    };

    useEffect(() => {
        if (isLoading) return; // wait until loading completes

        if (['/auth', '/verify', '/reset'].includes(location.pathname)) return;

        if (!isAuthenticated || !user) {
            navigate('/auth');
            return;
        }

        fetchRooms();

        const interval = setInterval(fetchRooms, 1000);

        return () => clearInterval(interval);
    }, [isAuthenticated, isLoading, navigate]);


    return (
        <RoomContext.Provider value={{ rooms, temperature, isOccupied, refreshRooms: fetchRooms }}>
            {children}
        </RoomContext.Provider>
    );
}

export const useRoom = (): RoomContextType => {
    const context = useContext(RoomContext);
    if (!context) {
        throw new Error("useRoom must be used within a RoomProvider");
    }
    return context;
}