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

import "./css/book.css";
import { formatDate, formatFieldName } from "../../helper/helperFunctions";
import AuthContext from "../../context/AuthProvider";
import config from "../../config";
import { displayError, displaySuccess } from "../../helper/toastHelper";

const Books = () => {
	const { auth } = useContext(AuthContext);
	const [data, setData] = useState(null);
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState("");

	// console.log(auth);

	const [keys, setKeys] = useState([]);

	const authConfig = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth.accessToken}`,
		},
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(config.getAllBooksURL, authConfig);

			setData(() => response.data.data);

			if (response.data.data.length > 0) {
				setKeys(Object.keys(response.data.data[0]));
			}
		} catch (e) {
			console.error(e);
			setData([]);
			displayError("Something went wrong!");
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (data === null) {
		return <p>Loading...</p>;
	}
	const excludedColumns = ["_id", "__v"]; // Add your excluded column names here
	const filteredKeys = keys.filter((key) => !excludedColumns.includes(key));

	const filteredData = data.filter((row) =>
		Object.values(row).some((value) =>
			(value?.toString() || "")
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		)
	);

	const displayColumnData = (key, columnData) => {
		if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(columnData)) {
			return formatDate(columnData);
		} else if (key === "book_cover") {
			return <img src={columnData} width="80" height="80" />;
		} else if (typeof columnData === "boolean") {
			return columnData ? "True" : "False";
		} else {
			return columnData;
		}
	};

	const handleAddNewBook = () => {
		navigate("/add-book");
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`${config.deleteBookURL}${id}`,
				authConfig
			);

			if (response?.status === 201) {
				displaySuccess("Book Deleted Successully");
				fetchData();
			}

			// console.log("book del res : ", response);
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
					Books
				</Typography>
				<Button
					size="small"
					variant="contained"
					color="info"
					onClick={() => handleAddNewBook()}
				>
					Add New Book
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
							{auth?.role === "admin" && (
								<TableCell>Issue</TableCell>
							)}
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
						{filteredData?.length > 0 &&
							filteredData.map((row, index) => (
								<TableRow key={index}>
									{auth?.role === "admin" && (
										<>
											<TableCell>
												<Button
													size="small"
													variant="contained"
													color="success"
													sx={{
														fontSize: "0.7rem",
													}}
													onClick={() => {
														// console.log(row?._id);
														navigate(
															`/issue-book/${row?._id}`,
															{
																replace: true,
																state: row,
															}
														);
													}}
												>
													Issue
												</Button>
											</TableCell>
										</>
									)}
									{filteredKeys.map((key, index) => (
										<TableCell key={index}>
											{displayColumnData(key, row[key])}
										</TableCell>
									))}
									{auth?.role === "admin" && (
										<>
											{/* <TableCell>
											<IconButton size="small">
												<Visibility
													sx={{ fontSize: "1.2rem" }}
												/>
											</IconButton>
										</TableCell> */}

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
														handleDelete(row._id)
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

export default Books;
