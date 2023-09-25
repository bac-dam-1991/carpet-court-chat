1. Clone the repository
2. Run command at root of project

```bash
docker compose up -d
```

> This will install all the dependencies for the BFF and App and start them.

3. Open browser and go to http://localhost:3000

## Modifications

If you want to add a new image there are a few things you have to do:

1. Copy your new image file, e.g., `new_image.jpg` to `services/app/public` folder.

2. In `messages.csv`, `Widget` column will be ` Image`, and `Reference`column will be the path to the image, e.g.,`/public/new_image.jpg`

3. Go to `RightAside.tsx` and paste the following code snippet under the comment `/* To add more images, copy the code snippet from README.md below here. */`

```tsx
{
	referenceRef.current === '/public/new_image.jpg' && (
		<Fade in timeout={400}>
			<Box sx={{ width: 450 }}>
				<Box
					src={referenceRef.current}
					component="img"
					sx={{ width: '100%' }}
				/>
			</Box>
		</Fade>
	);
}
```
