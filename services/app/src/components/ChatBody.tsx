import { Stack } from '@mui/material';
import { ChatHistory } from './ChatHistory';
import { MessageInput } from './MessageInput';

export const ChatBody = () => {
	return (
		<Stack spacing={3} direction={'column'} sx={{ flexGrow: 1 }}>
			<ChatHistory />
			<MessageInput />
		</Stack>
	);
};
