import React, { useState } from "react";
import axios from "axios";

const voices = [
  { id: "XrExE9yKIg1WjnnlVkGX", name: "Rachel — warm & clear" },
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Adam — deep & smooth" },
  { id: "MF3mGyEYCl7XYWbV9V6O", name: "Domi — bright & expressive" },
];

const AudioPlayer = ({ conversation }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [voice, setVoice] = useState(voices[0].id);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleGenerateAudio = async () => {
    if (!conversation.trim()) {
      setStatus("Generate a conversation first");
      return;
    }
    setLoading(true);
    setStatus("Sending to ElevenLabs TTS…");

    try {
      const response = await axios.post(
        "http://localhost:5000/tts",
        { conversation, voice_id: voice },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setStatus("Audio ready — hit play or download below");
    } catch (err) {
      setStatus("TTS error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="field-group" style={{ gridColumn: "1 / -1" }}>
          <span className="field-label">Voice</span>
          <select
            className="pod-select"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            {voices.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="btn-secondary"
        onClick={handleGenerateAudio}
        disabled={loading}
      >
        {loading ? "Converting to speech…" : "Generate Audio"}
      </button>

      {status && (
        <div className="status-bar" style={{ marginBottom: "1rem" }}>
          <div className={`dot${audioUrl ? " active" : ""}`} />
          <span>{status}</span>
        </div>
      )}

      {audioUrl && (
        <div className="player-wrap">
          <p className="player-title">Episode ready</p>
          <p className="player-sub">Generated from your document</p>
          <audio controls src={audioUrl} />
          <a className="download-btn" href={audioUrl} download="podcast.mp3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download podcast.mp3
          </a>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
