import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import papa from 'papaparse';
import { MessageCSV } from './types';
import { sleep } from './util';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const messageHistory: any[] = [];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/messages', async (req, res) => {
	res.status(200).json(messageHistory);
});

app.post('/messages', async (req, res) => {
	const { content, id } = req.body;
	const messageId = parseInt(id as string);

	const userMessage = { id, content, type: 'text', owner: 'user' };
	messageHistory.push(userMessage);

	const filePath = path.join(__dirname, '..', 'data', 'messages.csv');
	const file = await fs.readFile(filePath, 'utf-8');
	const { data } = papa.parse<MessageCSV>(file, {
		header: true,
		dynamicTyping: true,
	});
	const message = data.find((message) => message.ID === messageId);

	if (!message) {
		return res.status(404).json({ error: 'Message not found' });
	}

	const { ID, Content, Type, Delay, Owner, Widget, Reference } = message;
	const reply = {
		id: ID,
		content: Content,
		type: Type,
		owner: Owner,
		widget: Widget === 'None' ? undefined : Widget,
		reference: Reference,
	};
	messageHistory.push(reply);

	// Simulate a delay
	await sleep(Delay);

	res.status(200).json(reply);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
