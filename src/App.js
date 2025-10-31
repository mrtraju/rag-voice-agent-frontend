import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import ChatBox from "./components/ChatBox";
import VoiceRecorder from "./components/VoiceRecorder";
import { sendTextMessage, sendAudioMessage } from "./api";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await sendTextMessage(input);
    const botMsg = { sender: "bot", text: res.reply };
    setMessages((prev) => [...prev, botMsg]);

    if (res.audioUrl) {
      const audio = new Audio(res.audioUrl);
      audio.play();
    }
  };

  const handleVoice = async (blob) => {
    const res = await sendAudioMessage(blob);
    const userMsg = { sender: "user", text: res.transcribed || "(Voice message)" };
    const botMsg = { sender: "bot", text: res.reply };
    setMessages((prev) => [...prev, userMsg, botMsg]);

    if (res.audioUrl) {
      const audio = new Audio(res.audioUrl);
      audio.play();
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 3, mb: 2, textAlign: "center" }}>
        🎙️ RAG Voice Agent
      </Typography>

      <ChatBox messages={messages} />

      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend} variant="contained" sx={{ ml: 1 }}>
          Send
        </Button>
        <VoiceRecorder onSendAudio={handleVoice} />
      </Box>
    </Container>
  );
}
