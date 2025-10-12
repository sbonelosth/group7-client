export function formatLastUpdated(isoString: string): string {
  if (!isoString) return "Unknown";

  try {
    const date = new Date(isoString);
    date.setHours(date.getHours() + 2); // Adjust to South African time (UTC+2)
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    // --- Relative formatting ---
    if (diffSec < 10) return "just now";
    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;

    // --- For older timestamps ---
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      month: "short",
      day: "2-digit",
    };

    if (diffDay === 1) {
      return `yesterday at ${date.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false })}`;
    }

    return date.toLocaleString("en-ZA", options);
  } catch {
    return "Invalid date";
  }
}
