import { Stack } from '@mui/material';
import { ChatBubble } from './ChatBubble';
import { useIsMutating, useQuery } from '@tanstack/react-query';
import { Message } from './MessageInput';
import { getMessages } from '../apis/messagesApis';
import { useRef, useEffect } from 'react';

export const ChatHistory = () => {
	const { data } = useQuery({
		queryKey: ['messages'],
		queryFn: getMessages,
	});
	const containerRef = useRef<HTMLDivElement | null>(null);

	const isMutating = useIsMutating();

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [data]);

	return (
		<Stack
			spacing={2}
			direction="column"
			sx={{
				flexGrow: 1,
				overflow: 'auto',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				scrollBehavior: 'smooth',
			}}
			ref={containerRef}
		>
			{data?.map((message: Message) => {
				return (
					<ChatBubble
						key={message.id}
						message={message.content}
						owner={message.owner}
					/>
				);
			})}
			{!isMutating ? null : (
				<ChatBubble loading loadingText="Carpet Court is typing..." />
			)}
		</Stack>
	);
};
