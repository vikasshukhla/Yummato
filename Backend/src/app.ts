import cors from "cors";
import express, { Application } from "express";
import { MongoDBClient } from "./clients/mongodbClient";
import { handleApplicationError } from "./middlewares/errorHandler.middleware";
import { RegisterRoutes } from "./routes/routes";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

// create express app
const app: Application = express();

import "./auth/passport";

// add middleware
app.use(express.json());

// add cors origin
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// add routes
RegisterRoutes(app);

// create database connection
MongoDBClient.createConnectionToMongoDB();

// add error handlers
app.use(handleApplicationError);

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app.use("/", require("./routes/index"));
app.use("/api/v1/auth", require("./routes/auth"));

// start server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default server;
