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
						backgroundColor: (theme) => theme.palette.primary.light,
						display: 'flex',
						gap: 1,
						alignSelf: 'flex-start',
						borderTopLeftRadius: 0,
					}}
				>
					<LoadingDot delay={0} />
					<LoadingDot delay={100} />
					<LoadingDot delay={200} />
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
				maxWidth: 500,
				p: 2,
				backgroundColor: (theme) =>
					isSystem ? theme.palette.primary.light : 'white',
				color: (theme) =>
					isSystem
						? theme.palette.primary.contrastText
						: theme.palette.text.primary,
				alignSelf: isSystem ? 'flex-start' : 'flex-end',
				borderTopLeftRadius: isSystem ? 0 : 12,
				borderTopRightRadius: isSystem ? 12 : 0,
				fontSize: 14,
			}}
		>
			<span dangerouslySetInnerHTML={{ __html: message || '' }} />
		</Paper>
	);
};
