// import React from "react";
import { Delete } from "@mui/icons-material";
import {
	Box,
	Button,
	Input,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	displayColumnData,
	formatFieldName,
} from "../../helper/helperFunctions";
import AuthContext from "../../context/AuthProvider";
import config from "../../config";
import { displaySuccess } from "../../helper/toastHelper";
const AllUsers = () => {
	const { auth } = useContext(AuthContext);
	const [data, setData] = useState(null);
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");

	const [keys, setKeys] = useState([]);

	const authConfig = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth.accessToken}`,
		},
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(config.getAllUsersURL, authConfig);

			setData(() => response.data.data);

			if (response.data.data.length > 0) {
				setKeys(Object.keys(response.data.data[0]));
			}
		} catch (e) {
			console.error(e);
		}
	};
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (data === null) {
		return <p>Loading...</p>;
	}
	const excludedColumns = ["_id", "__v", "password"]; // Add your excluded column names here
	const filteredKeys = keys.filter((key) => !excludedColumns.includes(key));
	const filteredData = data.filter((row) =>
		Object.values(row).some((value) =>
			(value?.toString() || "")
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		)
	);

	const handleDelete = async (id) => {
		try {
			const response = await axios.post(
				`${config.deleteUserURL}${id}`,
				{},
				authConfig
			);

			if (response?.status === 201) {
				displaySuccess("User Deleted Successfully");
				fetchData();
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "8px 16px",
				}}
			>
				<Typography variant="h6" fontWeight="bold">
					All Users
				</Typography>
				<Button
					size="small"
					variant="contained"
					color="info"
					onClick={() => {
						navigate("/add-user");
					}}
				>
					Add User
				</Button>
			</Box>

			<Box sx={{ display: "flex", padding: "12px" }}>
				<Input
					size="small"
					placeholder="Search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					sx={{}}
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{/* Display keys in TableHead */}
							{filteredKeys.map((key, index) => (
								<TableCell key={index}>
									{formatFieldName(key)}
								</TableCell>
							))}
							<TableCell colSpan={2}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* Map through the data and display rows in TableBody */}
						{filteredData.map((row, index) => (
							<TableRow key={index}>
								{filteredKeys.map((key, index) => (
									<TableCell key={index}>
										{displayColumnData(key, row[key])}
									</TableCell>
								))}
								{auth?.role === "admin" && (
									<>
										<TableCell>
											<Button
												size="small"
												variant="outlined"
												color="error"
												startIcon={<Delete />}
												sx={{
													fontSize: "0.7rem",
												}}
												onClick={() =>
													handleDelete(row?._id)
												}
											>
												Delete
											</Button>
											{/* <IconButton
												size="small"
												color="error"
											>
												<Delete
													sx={{ fontSize: "1.2rem" }}
												/>
											</IconButton> */}
										</TableCell>
									</>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default AllUsers;
