const endpointUrl = import.meta.env.VITE_AUTHAPI_URL;

export const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('7eb6b9dc1bca0e08618ab35d115762dd') || ''}`
});

export const roomService = {
    // Send action to backend
    async publishAction(data: any) {
        try {
            const response = await fetch(`${endpointUrl}/rooms/publish`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                return { success: false, error: { title: response.statusText, message: error.error } };
            }
            const result = await response.json();
            return { success: true, data: result };
        } catch (error: any) {
            return { success: false, error: { title: 'Oops', message: 'An unexpected error occurred' } };
        }
    },

    // Fetch one room
    async fetchRoomData() {
        try {
            const response = await fetch(`${endpointUrl}/rooms`, {
                method: 'GET',
                headers: getAuthHeaders()
            });
            if (!response.ok) {
                const error = await response.json();
                return { success: false, error: { title: response.statusText, message: error.error } };
            }
            const result = await response.json();
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: { title: 'Oops', message: 'An unexpected error occurred' } };
        }
    }
};