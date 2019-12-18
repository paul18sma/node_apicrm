import express from "express";

import indexRoutes from "./routes/users";
import authRoutes from "./routes/auth";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// settings
app.set('port', 3000);

// routes
app.use(authRoutes, indexRoutes);


export default app;