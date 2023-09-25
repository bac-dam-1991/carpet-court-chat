import { Paper, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { postMessage } from '../apis/messagesApis';
import { useMutation } from '@tanstack/react-query';

export type MessageType = 'text' | 'image';

export interface Message {
	id: number;
	content: string;
	type: MessageType;
}

export const MessageInput = () => {
	const { register, handleSubmit, reset } = useForm();

	const mutation = useMutation<MessageType, unknown, number>({
		mutationFn: (id) => postMessage(id),
		onSuccess: (data) => {
			console.log(data);
			reset();
		},
	});

	const onSubmit = () => {
		mutation.mutate(1);
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
