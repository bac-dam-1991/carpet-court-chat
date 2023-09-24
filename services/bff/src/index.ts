import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import papa from 'papaparse';
import { MessageCSV } from './types';
import { sleep } from './util';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/messages/:id', async (req, res) => {
	const messageId = parseInt(req.params.id as string);
	const filePath = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'data',
		'messages.csv'
	);
	const file = await fs.readFile(filePath, 'utf-8');
	const { data } = papa.parse<MessageCSV>(file, {
		header: true,
		dynamicTyping: true,
	});
	const message = data.find((message) => message.ID === messageId);

	if (!message) {
		return res.status(404).json({ error: 'Message not found' });
	}

	const { ID, Content, Type, Delay } = message;

	// Simulate a delay
	await sleep(Delay);

	res.status(200).json({ id: ID, content: Content, type: Type });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
