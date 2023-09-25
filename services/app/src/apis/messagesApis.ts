import axios from 'axios';

export const postMessage = async (id: number) => {
	const response = await axios.post('http://localhost:3001/messages', { id });
	return response.data;
};
