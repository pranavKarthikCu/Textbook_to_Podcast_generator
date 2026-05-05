import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ setConversation }) => {
  const [file, setFile] = useState(null);
  const [startPg, setStartPg] = useState(1);
  const [endPg, setEndPg] = useState(3);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready — upload a PDF to get started");
  const [statusActive, setStatusActive] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setStatus(`File selected — set page range and generate`);
      setStatusActive(true);
    }
  };

  const handleUpload = async () => {
    if (!file) { setStatus("Please upload a PDF first"); setStatusActive(false); return; }
    setLoading(true);
    setStatus("Calling AI — this may take 15–30 seconds…");
    setStatusActive(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("start_pg", startPg);
    formData.append("end_pg", endPg);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setConversation(response.data.conversation);
      setStatus("Conversation ready — edit it, then generate audio");
    } catch (err) {
      setStatus("Error: " + (err.response?.data?.error || err.message));
      setStatusActive(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="section-label">01 — Upload source</p>

      <div
        className="upload-zone"
        style={file ? { borderColor: "#c8f060" } : {}}
      >
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <div className="upload-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5a5a62" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
        <p className="upload-main">
          {file ? file.name : "Drop your PDF here"}
        </p>
        <p className="upload-sub">
          {file
            ? `${(file.size / 1024).toFixed(0)} KB — click to change`
            : "or click to browse — any textbook, paper, or document"}
        </p>
      </div>

      <div className="row">
        <div className="field-group">
          <span className="field-label">Start page</span>
          <input
            className="pod-input"
            type="number"
            value={startPg}
            min="0"
            onChange={(e) => setStartPg(e.target.value)}
          />
        </div>
        <div className="field-group">
          <span className="field-label">End page</span>
          <input
            className="pod-input"
            type="number"
            value={endPg}
            min="0"
            onChange={(e) => setEndPg(e.target.value)}
          />
        </div>
      </div>

      <button className="btn-primary" onClick={handleUpload} disabled={loading}>
        {loading ? "Generating…" : file ? "Generate Conversation" : "Generate Conversation"}
      </button>

      <div className="status-bar">
        <div className={`dot${statusActive ? " active" : ""}`} />
        <span>{status}</span>
      </div>
    </>
  );
};

export default FileUpload;
