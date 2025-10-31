import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import "../styles.css";

export default function ChatBox({ messages }) {
  return (
    <Box className="chat-container">
      {messages.map((msg, idx) => (
        <Paper
          key={idx}
          className={msg.sender === "user" ? "user-msg" : "bot-msg"}
          elevation={2}
        >
          <Typography variant="body1">{msg.text}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
