import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Layout = () => {
	return (
		<div>
			<Header />
			{/* <nav>Navigation</nav> */}
			<main>
				<Outlet /> {/* This is where child routes will be rendered */}
			</main>
			{/* <footer>Footer</footer> */}
			<ToastContainer />
		</div>
	);
};

export default Layout;
