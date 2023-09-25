import { Paper, Stack, Typography } from '@mui/material';
import { LoadingDot } from './LoadingDot';

export type MessageOwner = 'user' | 'system';

export interface ChatBubbleProps {
	message?: string;
	owner?: MessageOwner;
	loading?: boolean;
	loadingText?: string;
}

export const ChatBubble = ({
	message,
	owner,
	loading,
	loadingText,
}: ChatBubbleProps) => {
	const isSystem = owner === 'system';

	if (loading) {
		return (
			<Stack spacing={0.5}>
				<Paper
					sx={{
						p: 2,
						backgroundColor: (theme) => theme.palette.primary.main,
						display: 'flex',
						gap: 1,
						alignSelf: 'flex-start',
					}}
				>
					<LoadingDot />
					<LoadingDot />
					<LoadingDot />
				</Paper>
				<Typography variant="caption" color="text.secondary">
					{loadingText}
				</Typography>
			</Stack>
		);
	}

	return (
		<Paper
			sx={{
				width: 500,
				p: 2,
				backgroundColor: (theme) =>
					isSystem ? theme.palette.primary.main : 'white',
				color: (theme) =>
					isSystem
						? theme.palette.primary.contrastText
						: theme.palette.text.primary,
				alignSelf: isSystem ? 'flex-start' : 'flex-end',
			}}
		>
			{message}
		</Paper>
	);
};
