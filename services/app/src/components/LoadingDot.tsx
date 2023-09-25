import { Box } from '@mui/material';

export interface LoadingDotProps {
	delay: number;
}

export const LoadingDot = ({ delay }: LoadingDotProps) => {
	return (
		<Box
			sx={{
				width: 12,
				height: 12,
				backgroundColor: 'white',
				borderRadius: '50%',
				animation: 'loading 1s infinite ease-in-out',
				'@keyframes loading': {
					'0%': {
						transform: 'scale(0)',
					},
					'50%': {
						transform: 'scale(1)',
					},
					'100%': {
						transform: 'scale(0)',
					},
				},
				animationDelay: `${delay}ms`,
			}}
		/>
	);
};
