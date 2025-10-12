import { defineMernAccessConfig } from "mern-access-client";

export default defineMernAccessConfig({
  baseUrl: "http://localhost:3000/auth", // endpoint URL for your mern-access backend
  storageKey: "7eb6b9dc1bca0e08618ab35d115762dd", // where the ACCESS token is stored
  onAuthError: (err) => console.warn("[mern-access-client] auth error:", err)
});