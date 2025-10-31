import axios from "axios";

const API_BASE = "http://<backend-public-ip>:5000"; // Replace with your backend IP

export const sendTextMessage = async (text) => {
  const res = await axios.post(`${API_BASE}/api/ask`, { message: text });
  return res.data;
};

export const sendAudioMessage = async (blob) => {
  const formData = new FormData();
  formData.append("audio", blob, "audio.wav");
  const res = await axios.post(`${API_BASE}/api/voice`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
