import React, { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import { Mic, Stop } from "@mui/icons-material";

export default function VoiceRecorder({ onSendAudio }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: "audio/wav" });
      onSendAudio(blob);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <IconButton
      color="primary"
      onClick={recording ? stopRecording : startRecording}
    >
      {recording ? <Stop /> : <Mic />}
    </IconButton>
  );
}
