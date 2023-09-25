import { Stack } from '@mui/material';
import { ChatBubble } from './ChatBubble';

export const ChatHistory = () => {
	return (
		<Stack spacing={2} direction="column" sx={{ flexGrow: 1 }}>
			<ChatBubble message={'hello'} owner={'system'} />
			<ChatBubble message={'hello there'} owner={'user'} />
			<ChatBubble loading loadingText="Mark is typing..." />
		</Stack>
	);
};
