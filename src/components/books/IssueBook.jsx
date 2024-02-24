import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import config from "../../config";
import { displayError, displaySuccess } from "../../helper/toastHelper";

const IssueBook = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const location = useLocation();

	const book = location?.state || null;

	const [users, setUsers] = useState();
	const [user, setUser] = useState("");
	const [expiry, setExpiry] = useState();

	const { auth } = useContext(AuthContext);

	// console.log("Book ", book);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(config.getAllUsersURL, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});

				// console.log("res user : ", response);

				setUsers(() => response?.data?.data);
			} catch (e) {
				console.log(e);
			}
		};
		if (id) {
			fetchData();
		}
	}, []);

	if (!id) {
		return "404 NOT FOUND";
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const postData = {
				book: id,
				user: user,
				date_expired: expiry,
			};
			const response = await axios.post(
				config.checkoutBookURL,
				postData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.accessToken}`,
					},
				}
			);

			if (response?.status === 201) {
				displaySuccess("Book Issued Successfully");
				navigate("/all-issues");
			}
			// console.log("Checkout ", response);
		} catch (e) {
			displayError("Something went wrong");
			console.error(e);
		}
	};
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "90vh",
					width: "100vw",
				}}
			>
				<Stack sx={{ width: "400px", mb: 2 }}>
					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
						}}
					>
						<Typography variant="h6" fontWeight={"bold"}>
							Issue a Book
						</Typography>
						<Button
							size="small"
							color="primary"
							variant="contained"
							onClick={() => navigate("/all-books")}
						>
							View All Books
						</Button>
					</Stack>
					<Typography fontSize="0.9rem" fontWeight="bold">
						Book Details
					</Typography>
					<img src={book?.book_cover} alt={book?.description} />
					<Typography fontSize="0.9rem">
						Book Name: {book?.book_name}
					</Typography>
					<Typography fontSize="0.9rem">
						Author : {book?.author}
					</Typography>
					<Typography fontSize="0.9rem">
						Description : {book?.description}
					</Typography>
					<Typography fontSize="0.9rem">
						Availability : {book?.availability ? "True" : "False"}
					</Typography>
				</Stack>
				<form onSubmit={(event) => handleSubmit(event)}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "400px",
							rowGap: "8px",
							textAlign: "center",
						}}
					>
						<FormControl fullWidth size="small">
							<InputLabel id="user">Select a User</InputLabel>
							<Select
								labelId="user"
								size="small"
								label="Select an option"
								value={user}
								onChange={(event) =>
									setUser(event.target.value)
								}
							>
								{users?.map((user) => {
									return user?.role === "user" ? (
										<MenuItem
											key={user?.email}
											value={user?._id}
										>
											{user?.name} - {user?.email}
										</MenuItem>
									) : null;
								})}
							</Select>
						</FormControl>
						<TextField
							size="small"
							variant="outlined"
							label="Expiry after (Days)"
							value={expiry}
							onChange={(event) => setExpiry(event.target.value)}
						/>
						<Button
							type="submit"
							size="small"
							variant="contained"
							color="success"
							onClick={(event) => handleSubmit(event)}
						>
							Issue this Book ({book?.book_name})
						</Button>
					</Box>
				</form>
			</Box>
		</>
	);
};

export default IssueBook;
