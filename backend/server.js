import http from "http";
import app from "./app.js";
import cloudinary from "cloudinary";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { debugApp } from "./utils/debugLogger.js";

dotenv.config({ path: "./config/config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST","PUT","PATCH","DELETE"],
    credentials: true,
  },
});

const onlineUsers = new Map();
const ngoSockets = new Map();

io.on("connection", (socket) => {
  debugApp("Socket connected:", socket.id);

  socket.on("user-online", ({ userId, role }) => {
    onlineUsers.set(userId, socket.id);
    if (role === "ngo") ngoSockets.set(userId, socket.id);
  });

  socket.on("new-donation", ({ donationData }) => {
    for (const [ngoId, socketId] of ngoSockets.entries()) {
      io.to(socketId).emit("donation-alert", donationData);
    }
  });

  socket.on("donation-rejected", ({ donationId, ngoId }) => {
    // Optional: logic to save rejected NGO to DB
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        ngoSockets.delete(userId);
        break;
      }
    }
  });
});

app.set("io", io);
server.listen(process.env.PORT, () => {
  debugApp(`Server running on port ${process.env.PORT}`);
  debugApp('http://localhost:4000/api/v1');
});
