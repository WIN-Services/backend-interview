import express, { json, urlencoded } from "express";
const app = express();
import apiRouter from "./routes/routes.js";
import { notFoundResponse, unauthorizedResponse } from "./helpers/ErrorResponseHandler.js";
import cors from "cors";

app.use(json());
app.use(urlencoded({ extended: false }));

// To allow cross-origin requests
app.use(cors());

// Route Prefixes
app.use("/api/", apiRouter);

// Throw Not found URL not found
app.all("*", function (req, res) {
	return notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if (err.name == "UnauthorizedError") {
		return unauthorizedResponse(res, err.message);
	}
});

export default app;
