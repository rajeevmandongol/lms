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
import { useRef, useState, useContext } from "react";
import config from "../../config";
import { displaySuccess } from "../../helper/toastHelper";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const AddBook = () => {
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	const [bookName, setBookName] = useState("");
	const [description, setDescription] = useState("");
	const [availability, setAvailability] = useState("");
	const [author, setAuthor] = useState("");

	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		// Access the selected file using event.target.files
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const formData = {
				bookName,
				description,
				availability,
				author,
				file: selectedFile,
			};

			console.log("form", formData);

			const response = await axios.post(config.addBookURL, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${auth.accessToken}`,
				},
			});

			if (response.status === 201) {
				displaySuccess("New Book Added Successfully");
				resetInputFields();
			}
		} catch (error) {
			console.error("Error uploading data:", error);
		}
	};

	const resetInputFields = () => {
		setBookName("");
		setDescription("");
		setAvailability("");
		setAuthor("");
		setSelectedFile(null);
		fileInputRef.current.value = "";
	};
	return (
		<div>
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
				<form onSubmit={handleSubmit} encType="multipart/form-data">
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
							}}
						>
							<Typography variant="body1" fontWeight={"bold"}>
								Add New Book
							</Typography>
							<Button
								size="small"
								color="primary"
								variant="contained"
								onClick={() =>
									navigate("/all-books")
								}
							>
								View All Books
							</Button>
						</Stack>
						<TextField
							size="small"
							variant="outlined"
							label="Book Name"
							value={bookName}
							onChange={(event) =>
								setBookName(event.target.value)
							}
						/>
						<TextField
							size="small"
							variant="outlined"
							label="Description"
							value={description}
							onChange={(event) =>
								setDescription(event.target.value)
							}
						/>
						<TextField
							size="small"
							variant="outlined"
							label="Author"
							value={author}
							onChange={(event) => setAuthor(event.target.value)}
						/>
						<FormControl fullWidth size="small">
							<InputLabel id="availability">
								Availability
							</InputLabel>
							<Select
								labelId="availability"
								size="small"
								label="Select an option"
								value={availability}
								onChange={(event) =>
									setAvailability(
										event.target.value === "true"
									)
								}
							>
								<MenuItem value={"true"}>True</MenuItem>

								<MenuItem value={"false"}>False</MenuItem>
							</Select>
						</FormControl>

						<input
							ref={fileInputRef}
							type="file"
							onChange={handleFileChange}
							accept="image/*"
						/>
						<Button
							type="submit"
							size="small"
							variant="contained"
							color="success"
						>
							Add
						</Button>
					</Box>
				</form>
			</Box>
		</div>
	);
};

export default AddBook;
