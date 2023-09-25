import { Box, Button, Paper, Stack, Fade } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	PostMessageArgs,
	getMessages,
	postMessage,
} from '../apis/messagesApis';
import { Message } from './MessageInput';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { convertTo12HourFormat, range } from '../utils/date-utils';
import { useRef } from 'react';

const timeSlots = range(9, 13).map((item) =>
	convertTo12HourFormat(`${item}:00`)
);

export const RightAside = () => {
	const { data } = useQuery<Message[]>({
		queryKey: ['messages'],
		queryFn: getMessages,
	});
	const widgetRef = useRef<string | undefined>();
	const referenceRef = useRef<string | undefined>();

	const queryClient = useQueryClient();

	const mutation = useMutation<Message, unknown, PostMessageArgs>({
		mutationFn: (payload) => postMessage(payload),
		onSuccess: (data) => {
			const isSystem = data.owner === 'system';

			if (isSystem) {
				const messages =
					queryClient.getQueryData<Message[]>(['messages']) || [];
				queryClient.setQueryData(['messages'], [...messages, data]);
			}
		},
	});

	if (!data) return null;

	const last = data[data?.length - 1];
	const widget = last?.widget;
	if (widget) {
		widgetRef.current = widget;
		referenceRef.current = last?.reference;
	}

	const onSubmit = () => {
		const message = `You have selected Tuesday 9:00 AM on 26th September`;

		const messages = queryClient.getQueryData<Message[]>(['messages']) || [];

		const payload: Message = {
			id: 12,
			type: 'text',
			content: message,
			owner: 'system',
		};

		const messageList = [...messages, payload];

		queryClient.setQueryData(['messages'], messageList);

		mutation.mutate({
			content: message,
			id: 13,
		});
	};

	return (
		<Paper
			sx={{
				px: widgetRef.current ? 3 : 0,
				opacity: widgetRef.current ? 1 : 0,
				py: 3,
				minWidth: widgetRef.current ? 500 : 0,
				maxWidth: widgetRef.current ? 500 : 0,
				overflow: 'hidden',
				transition: (theme) => theme.transitions.easing.easeInOut,
				transitionDuration: '800ms',
			}}
		>
			{widgetRef.current === 'DatePicker' && (
				<Fade in timeout={400}>
					<Stack direction={'row'} spacing={2}>
						<DateCalendar defaultValue={dayjs()} minDate={dayjs()} />
						<Stack spacing={2} sx={{ flexGrow: 1, pt: 3 }}>
							{timeSlots.map((item, index) => (
								<Button
									variant="outlined"
									fullWidth
									key={index}
									onClick={() => onSubmit()}
								>
									{item}
								</Button>
							))}
						</Stack>
					</Stack>
				</Fade>
			)}
			{widgetRef.current === 'Image' && (
				<>
					{referenceRef.current === '/public/carpet_court_kids.png' && (
						<Fade in timeout={400}>
							<Box sx={{ width: 450 }}>
								<Box
									src={referenceRef.current}
									component="img"
									sx={{ width: '100%' }}
								/>
							</Box>
						</Fade>
					)}
					{referenceRef.current === '/public/carpet_samples.jpg' && (
						<Fade in timeout={400}>
							<Box sx={{ width: 450 }}>
								<Box
									src={referenceRef.current}
									component="img"
									sx={{ width: '100%' }}
								/>
							</Box>
						</Fade>
					)}
					{/* To add more images, copy the code snippet from README.md below here. */}
				</>
			)}
		</Paper>
	);
};
