export type MessageType = 'text' | 'image';

export interface MessageCSV {
	ID: number;
	Content: string;
	Type: MessageType;
	Delay: number;
	Owner: 'user' | 'system';
	Widget: string;
	Reference: string;
}
