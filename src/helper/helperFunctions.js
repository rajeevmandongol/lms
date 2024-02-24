const formatFieldName = (str) => {
	return str
		.replace(/_/g, " ")
		.replace(/([A-Z])/g, " $1")
		.replace(/^\s/, "")
		.replace(/^./, function (str) {
			return str.toUpperCase();
		});
};

const formatDate = (dateString) => {
	// Check if the provided string matches the format YYYY-MM-DDTHH:MM:SS.MSZ
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(dateString)) {
		// Convert to a Date object
		const date = new Date(dateString);

		// Get the year, month, and day
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
		const day = date.getDate().toString().padStart(2, "0");

		// Get the hours and minutes
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		// Construct the new date string in the desired format
		const newDateString = `${year}-${month}-${day} ${hours}:${minutes}`;

		return newDateString;
	} else {
		return "Invalid date format";
	}
};

const displayColumnData = (key, columnData) => {
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(columnData)) {
		return formatDate(columnData);
	} else if (typeof columnData === "boolean") {
		return columnData ? "True" : "False";
	} else {
		return columnData;
	}
};

export { formatFieldName, displayColumnData, formatDate };
