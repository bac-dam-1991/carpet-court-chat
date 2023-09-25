import { Box, Paper, Stack } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './apis/query';
import { LeftAside } from './components/LeftAside';
import { ChatBody } from './components/ChatBody';
import { RightAside } from './components/RightAside';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<QueryClientProvider client={queryClient}>
				<Box
					sx={{
						height: '100%',
						p: 3,
						display: 'flex',
						alignItems: 'center',
						justifyItems: 'center',
						m: 'auto',
						backgroundColor: '#fdfdfd',
					}}
				>
					<Paper
						sx={{
							height: 800,
							width: '100%',
							border: '1px solid #eaeaea',
							overflow: 'hidden',
							maxWidth: 1440,
							m: 'auto',
						}}
					>
						<Stack
							spacing={3}
							sx={{
								p: 3,
								height: '100%',
								background: 'linear-gradient(118deg, #F7F8F8 0%, #EEEFEF 100%)',
							}}
							direction={'row'}
						>
							<LeftAside />
							<ChatBody />
							<RightAside />
						</Stack>
					</Paper>
				</Box>
			</QueryClientProvider>
		</LocalizationProvider>
	);
};

export default App;
