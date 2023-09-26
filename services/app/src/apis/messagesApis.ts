import axios from 'axios';

export interface PostMessageArgs {
	content: string;
	id: number;
}

export const postMessage = async ({ content, id }: PostMessageArgs) => {
	const response = await axios.post('http://localhost:3002/messages', {
		content,
		id,
	});
	return response.data;
};

export const getMessages = async () => {
	const response = await axios.get('http://localhost:3002/messages');
	return response.data;
};
