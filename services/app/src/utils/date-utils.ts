// Function to generate an array of numbers between two numbers
export const range = (start: number, end: number) => {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

// Function to convert 24 hours in format 14:00 to 12 hours format 2:00 PM
export const convertTo12HourFormat = (time: string) => {
	const [hours, minutes] = time.split(':').map(Number);
	return `${+hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${
		hours >= 12 ? 'PM' : 'AM'
	}`;
};
