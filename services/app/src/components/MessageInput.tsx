import { Paper, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { PostMessageArgs, postMessage } from '../apis/messagesApis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageOwner } from './ChatBubble';
import { useRef } from 'react';

export type MessageType = 'text' | 'image';

export interface Message {
	id: number;
	content: string;
	type: MessageType;
	owner: MessageOwner;
}

export const MessageInput = () => {
	const { register, handleSubmit, reset } = useForm<{ message: string }>();
	const queryClient = useQueryClient();
	const messageIdRef = useRef<number>(0);

	const mutation = useMutation<Message, unknown, PostMessageArgs>({
		mutationFn: (payload) => postMessage(payload),
		onSuccess: (data) => {
			const isSystem = data.owner === 'system';

			if (isSystem) {
				const messages =
					queryClient.getQueryData<Message[]>(['messages']) || [];
				queryClient.setQueryData(['messages'], [...messages, data]);
			}
			reset();
		},
	});

	const onSubmit = ({ message }: { message: string }) => {
		const messages = queryClient.getQueryData<Message[]>(['messages']) || [];

		const payload: Message = {
			id: messageIdRef.current,
			content: message,
			type: 'text',
			owner: 'user',
		};

		const messageList = [...messages, payload];

		queryClient.setQueryData(['messages'], messageList);
		messageIdRef.current = messageList.length;
		mutation.mutate({
			content: message,
			id: messageIdRef.current,
		});
	};

	return (
		<Paper sx={{ p: 3 }}>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 2 }}
			>
				<Box
					component="input"
					sx={{ outline: 'none', border: 'none', fontSize: 16, flexGrow: 1 }}
					placeholder="Type your message here"
					autoFocus
					{...register('message')}
				/>
				<Button variant="contained" type="submit" endIcon={<SendIcon />}>
					Send
				</Button>
			</Box>
		</Paper>
	);
};
