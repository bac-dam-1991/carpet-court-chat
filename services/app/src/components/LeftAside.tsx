import { Paper, Stack, Box, Typography } from '@mui/material';

const AgentIdle = '/public/mark_typing.png';

export const LeftAside = () => {
	return (
		<Paper sx={{ width: 240, flexShrink: 0, display: 'flex' }}>
			<Stack sx={{ p: 2, mt: 'auto' }} spacing={3}>
				<Box sx={{ width: 200 }}>
					<Box
						component="img"
						src={AgentIdle}
						sx={{ width: '100%', height: 'auto' }}
					/>
				</Box>
				<Stack spacing={1}>
					<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
						Carpet Court
					</Typography>
					<Typography color="GrayText" variant="body2">
						Consultation Tool
					</Typography>
				</Stack>
				<Stack direction={'row'} spacing={1} alignItems={'center'}>
					<Box
						component={'div'}
						sx={{
							width: 12,
							height: 12,
							borderRadius: 6,
							backgroundColor: 'success.main',
						}}
					/>
					<Typography color="GrayText" variant="caption">
						Online
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
};
