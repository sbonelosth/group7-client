export interface RoomData {
  roomName: string;
  state: "ON" | "OFF";
  mode: "AUTO" | "MANUAL";
  ldrState: "BRIGHT" | "DARK";
  lastUpdated: string;
}
