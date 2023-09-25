import { Stack } from '@mui/material';
import { ChatBubble } from './ChatBubble';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Message } from './MessageInput';
import { getMessages } from '../apis/messagesApis';

export const ChatHistory = () => {
	const { data } = useQuery({
		queryKey: ['messages'],
		queryFn: getMessages,
	});

	const queryClient = useQueryClient();

	return (
		<Stack spacing={2} direction="column" sx={{ flexGrow: 1 }}>
			{data?.map((message: Message) => {
				return (
					<ChatBubble
						key={message.id}
						message={message.content}
						owner={message.owner}
					/>
				);
			})}
			{queryClient.isMutating() ? <ChatBubble loading /> : null}
		</Stack>
	);
};
