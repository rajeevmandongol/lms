import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {
	Box,
	Button,
	Divider,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Stack,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import AuthContext from "../../context/AuthProvider";
import { displaySuccess } from "../../helper/toastHelper";

function Header() {
	const { auth, setAuth } = useContext(AuthContext);
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setOpen(open);
	};

	const handleLogout = () => {
		setAuth(() => {});
		localStorage.clear();
		displaySuccess("User Logout Successfully!");
		navigate("/login");
	};

	function formatPath(path) {
		return path.toLowerCase().replace(/\s+/g, "-");
	}

	const DrawerList = (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
		>
			<List>
				{["Add Book", "All Books", "All Users", "All Issues"].map(
					(title) => (
						<ListItem key={title} disablePadding>
							<ListItemButton
								onClick={() => {
									navigate(formatPath(title), {
										replace: true,
									});
								}}
							>
								<ListItemIcon></ListItemIcon>
								<ListItemText primary={title} />
							</ListItemButton>
						</ListItem>
					)
				)}
			</List>
			<Divider />
			{/* <List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
		</Box>
	);
	return (
		<>
			<AppBar position="static">
				<Toolbar
					variant="dense"
					sx={{ justifyContent: "space-between" }}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{false && (
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={toggleDrawer(true)}
								sx={{ mr: 2 }}
							>
								<MenuIcon />
							</IconButton>
						)}
						<Button
							onClick={() => {
								navigate("/");
							}}
							variant="text"
							sx={{ color: "#fff" }}
						>
							<Typography variant="h6">LMS</Typography>
						</Button>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{auth?.email && (
							<Stack
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									columnGap: "8px",
									mr: 2,
								}}
							>
								<Button
									size="small"
									// color="warning"
									variant="text"
									onClick={() => navigate("/add-user")}
									sx={{
										color: "#fff",
										"&:hover": {
											textDecoration: "underline",
										},
									}}
								>
									Add User
								</Button>
								<Button
									size="small"
									// color="warning"
									variant="text"
									onClick={() => navigate("/all-users")}
									sx={{
										color: "#fff",
										"&:hover": {
											textDecoration: "underline",
										},
									}}
								>
									Users
								</Button>
								<Button
									size="small"
									color="warning"
									variant="text"
									onClick={() => navigate("/all-books")}
									sx={{
										color: "#fff",
										"&:hover": {
											textDecoration: "underline",
										},
									}}
								>
									Books
								</Button>
								<Button
									size="small"
									color="warning"
									variant="text"
									onClick={() => navigate("/all-issues")}
									sx={{
										color: "#fff",
										"&:hover": {
											textDecoration: "underline",
										},
									}}
								>
									Issues
								</Button>
							</Stack>
						)}
						{auth?.email && (
							<Stack sx={{ mr: 2 }}>
								<Typography variant="body2" sx={{}}>
									{auth?.email || "email"}
								</Typography>
								<Typography
									variant="body2"
									sx={{
										fontSize: "0.7rem",
										textAlign: "right",
									}}
								>
									{auth?.role || "role"}
								</Typography>
							</Stack>
						)}

						{auth?.email ? (
							<IconButton size="small" onClick={handleLogout}>
								<Logout sx={{ color: "#fff" }} />
							</IconButton>
						) : (
							<Button
								size="small"
								variant="contained"
								color="success"
								onClick={() => navigate("/login")}
							>
								Login
							</Button>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</>
	);
}

export default Header;
