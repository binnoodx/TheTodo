const day = date.toLocaleDateString(undefined, { weekday: 'long' }); // e.g., "Saturday"
const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }); // e.g., "10:00 AM"