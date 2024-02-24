// import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import config from "../../config";
import { displaySuccess } from "../../helper/toastHelper";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
	// const { setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// const navigate = useNavigate();

	// const { setToken } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!name || !email || !password) {
			alert("Enter username and password properly");
			return;
		}

		const response = await axios.post(
			config.addUserURL,
			{
				name: name,
				email: email,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 201) {
			displaySuccess("New User Added Successfully");
			clearInputFields();
			// const token = response.data.token;
		}
		// console.log("login res : ", response);
	};

	const clearInputFields = () => {
		setName("");
		setEmail("");
		setPassword("");
	};

	return (
		<>
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
								Add New User
							</Typography>

							<Button
								size="small"
								color="primary"
								variant="contained"
								onClick={() => navigate("/all-users")}
							>
								All Users
							</Button>
						</Stack>
						<TextField
							size="small"
							variant="outlined"
							label="Name"
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
						<TextField
							size="small"
							variant="outlined"
							label="E-mail"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<TextField
							type="password"
							size="small"
							variant="outlined"
							label="Password"
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
						<Button
							type="submit"
							size="small"
							variant="contained"
							color="success"
							onClick={(event) => handleSubmit(event)}
						>
							Add User
						</Button>
					</Box>
				</form>
			</Box>
		</>
	);
};

export default AddUser;
