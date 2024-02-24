import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Books from "./components/books/Books";
import AddBook from "./components/books/AddBook";
import Layout from "./components/layout/Layout";
import IssueBook from "./components/books/IssueBook";
import AllIssues from "./components/checkout/AllIssues";
import AllUsers from "./components/user/AllUsers";
import AddUser from "./components/user/AddUser";
import { Homepage } from "./components/layout/Homepage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/" element={<Homepage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/add-user" element={<AddUser />} />
					<Route path="/all-books" element={<Books />} />
					<Route path="/add-book" element={<AddBook />} />
					<Route path="/issue-book/:id" element={<IssueBook />} />
					<Route path="/all-users" element={<AllUsers />} />
					<Route path="/all-issues" element={<AllIssues />} />
					{/* <Route path="/contact" element={<Contact />} /> */}
					{/* <Route path="*" element={<NotFound />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
