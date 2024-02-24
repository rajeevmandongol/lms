// import React from "react";
import { Delete } from "@mui/icons-material";
import {
	Box,
	Button,
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

import { formatDate } from "../../helper/helperFunctions";
import AuthContext from "../../context/AuthProvider";
import config from "../../config";
import { displaySuccess } from "../../helper/toastHelper";
const AllIssues = () => {
	const { auth } = useContext(AuthContext);
	const [data, setData] = useState(null);
	const navigate = useNavigate();

	// console.log(auth);

	// const [keys, setKeys] = useState([]);

	const authConfig = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${auth.accessToken}`,
		},
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(
				config.getAllIssuesURL,
				authConfig
			);

			setData(() => response.data.data);

			// if (response.data.data.length > 0) {
			// 	setKeys(Object.keys(response.data.data[0]));
			// }
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
	// const excludedColumns = ["_id", "__v"]; // Add your excluded column names here
	// const filteredKeys = keys.filter((key) => !excludedColumns.includes(key));

	const displayColumnData = (key, columnData) => {
		if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(columnData)) {
			return formatDate(columnData);
		} else if (key === "book_cover") {
			return <img src="columnData" width="80" height="80" />;
		} else if (typeof columnData === "boolean") {
			return columnData ? "True" : "False";
		} else {
			return columnData;
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`${config.checkoutDeleteURL}${id}`,
				// {},
				authConfig
			);

			// console.log("User delete response : ", response);

			if (response?.status === 201) {
				displaySuccess("Deleted Successfully");
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
					All Issues
				</Typography>
				<Button
					size="small"
					variant="contained"
					color="info"
					onClick={() => {
						navigate("/all-books");
					}}
				>
					All Books
				</Button>
			</Box>
            
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{/* Display keys in TableHead */}
							{/* {filteredKeys.map((key, index) => (
								<TableCell key={index}>
									{formatFieldName(key)}
								</TableCell>
							))} */}
							<TableCell>Book Name</TableCell>
							<TableCell>Author</TableCell>
							<TableCell>User Name</TableCell>
							<TableCell>E-mail</TableCell>
							<TableCell>Deleted</TableCell>
							<TableCell>Date Taken</TableCell>
							<TableCell>Date Expiry</TableCell>
							<TableCell colSpan={2}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* Map through the data and display rows in TableBody */}
						{data.map((row, index) => (
							<TableRow key={index}>
								<TableCell>
									{displayColumnData(
										"",
										row?.book?.book_name
									)}
								</TableCell>
								<TableCell>
									{displayColumnData("", row?.book?.author)}
								</TableCell>
								<TableCell>
									{displayColumnData("", row?.user?.name)}
								</TableCell>
								<TableCell>
									{displayColumnData("", row?.user?.email)}
								</TableCell>
								<TableCell>
									{displayColumnData("", row?.deleted)}
								</TableCell>
								<TableCell>
									{displayColumnData("", row?.date_taken)}
								</TableCell>
								<TableCell>
									{displayColumnData("", row?.date_expired)}
								</TableCell>
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

export default AllIssues;
