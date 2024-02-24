import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "80vh",
				width: "100vw",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "400px",
					rowGap: "8px",
					textAlign: "center",
				}}
			>
				<Stack
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						mb: 2,
					}}
				>
					<Typography variant="h6" fontWeight={"bold"}>
						Library Management System (LMS)
					</Typography>
				</Stack>

				<Stack sx={{ mb: 2 }}>
					<Typography variant="body1">
						A Library Management System is a tool that keeps track
						of information about the books in the library, their
						authors, library members who borrow books, and library
						staff.
					</Typography>
				</Stack>

				<Stack>
					<Typography
						variant="body1"
						fontWeight={"bold"}
						fontSize={"0.9rem"}
					>
						Developed by Rajeev Man Dongol, Sandeep Gautam, Saurya
						Paudel
					</Typography>
				</Stack>

				<Stack
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						columnGap: "8px",
						mt: 4,
					}}
				>
					<Button
						size="small"
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-user")}
						sx={{
							// color: "#fff",
							"&:hover": {
								textDecoration: "underline",
							},
						}}
					>
						Add User
					</Button>
					<Button
						size="small"
						color="primary"
						variant="contained"
						onClick={() => navigate("/all-users")}
						sx={{
							// color: "#fff",
							"&:hover": {
								textDecoration: "underline",
							},
						}}
					>
						Users
					</Button>
					<Button
						size="small"
						color="primary"
						variant="contained"
						onClick={() => navigate("/all-books")}
						sx={{
							// color: "#fff",
							"&:hover": {
								textDecoration: "underline",
							},
						}}
					>
						Books
					</Button>
					<Button
						size="small"
						color="primary"
						variant="contained"
						onClick={() => navigate("/all-issues")}
						sx={{
							// color: "#fff",
							"&:hover": {
								textDecoration: "underline",
							},
						}}
					>
						Issues
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};
