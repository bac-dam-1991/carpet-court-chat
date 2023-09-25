import { Stack } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './apis/query';
import { LeftAside } from './components/LeftAside';
import { ChatBody } from './components/ChatBody';
import { RightAside } from './components/RightAside';

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack spacing={3} sx={{ p: 3, height: '100%' }} direction={'row'}>
				<LeftAside />
				<ChatBody />
				<RightAside />
			</Stack>
		</QueryClientProvider>
	);
};

export default App;
