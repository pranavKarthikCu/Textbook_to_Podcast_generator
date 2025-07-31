import React, { useState } from "react";
import axios from "axios";

const voices = [
  { id: "XrExE9yKIg1WjnnlVkGX", name: "Rachel" },
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Adam" },
  { id: "MF3mGyEYCl7XYWbV9V6O", name: "Domi" }
];

const AudioPlayer = ({ conversation }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [voice, setVoice] = useState(voices[0].id);

  const handleGenerateAudio = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tts",
        { conversation, voice_id: voice },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      alert("TTS failed: " + err.message);
    }
  };

  return (
    <div className="audio-player">
      <h2>🎧 Convert to Podcast</h2>
      <label>Choose a voice: </label>
      <select value={voice} onChange={(e) => setVoice(e.target.value)}>
        {voices.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleGenerateAudio}>Generate Audio</button>
      {audioUrl && (
        <div style={{ marginTop: "15px" }}>
          <audio controls src={audioUrl}></audio>
          <br />
          <a href={audioUrl} download="podcast.mp3">
            📥 Download Podcast
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
