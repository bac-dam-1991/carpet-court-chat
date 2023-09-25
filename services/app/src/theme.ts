import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#007AFF',
			light: '#3395FF',
		},
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)',
				},
			},
		},
	},
});
