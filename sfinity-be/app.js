import express from "express";

import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

import transactionRoutes from "./routes/transactionRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

import activityRoutes from "./routes/activityRoutes.js";

import missionRoutes
from "./routes/missionRoutes.js";

import budgetRoutes from "./routes/budgetRoutes.js";

import categoryRoutes
from "./routes/categoryRoutes.js";

import reportRoutes
from "./routes/reportRoutes.js";

import receiptRoutes
from "./routes/receiptRoutes.js";

import userRoutes
from "./routes/UserRoutes.js";

import checkinRoutes
from "./routes/checkinRoutes.js";

import goalRoutes
from "./routes/goalRoutes.js";

import articleRoutes
from "./routes/articleRoutes.js";

import videoRoutes
from "./routes/videoRoutes.js";

import aiRoutes from "./routes/aiRoutes.js";

console.log(
  "GOAL ROUTES IMPORTED"
);


const app =
  express();

/*
━━━━━━━━━━━━━━━━━━━
MIDDLEWARE
━━━━━━━━━━━━━━━━━━━
*/
app.use(cors());

app.use(

  express.json({

    limit: "50mb",

  })

);

app.use(

  express.urlencoded({

    extended: true,

    limit: "50mb",

  })

);

/*
━━━━━━━━━━━━━━━━━━━
TEST
━━━━━━━━━━━━━━━━━━━
*/
app.get("/", (
  req,
  res,
) => {
  res.send(
    "SFINITY Backend Running",
  );
});

/*
━━━━━━━━━━━━━━━━━━━
ROUTES
━━━━━━━━━━━━━━━━━━━
*/
app.use(
  "/api/auth",
  authRoutes,
);

app.use(
  "/api/transactions",
  transactionRoutes,
);

app.use(
  "/api/dashboard",
  dashboardRoutes,
);

app.use(
  "/api/activities",
  activityRoutes,
);

app.use(
  "/api/missions",
  missionRoutes
);

app.use(
  "/api/budgets",
  budgetRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/receipts",
  receiptRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/checkin",
  checkinRoutes
);

app.use(
  "/api/goals",
  goalRoutes
);

app.use(
  "/api/articles",
  articleRoutes
);

app.use(
  "/api/videos",
  videoRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use((req, res) => {

  console.log(
    "404 Route:",
    req.originalUrl
  );

  res.status(404).json({

    success: false,

    message:
      "Route not found",

  });

});

export default app;