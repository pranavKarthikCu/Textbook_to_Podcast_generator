import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ setConversation }) => {
  const [file, setFile] = useState(null);
  const [startPg, setStartPg] = useState(0);
  const [endPg, setEndPg] = useState(0);
  const [filename, setFilename] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("start_pg", startPg);
    formData.append("end_pg", endPg);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setConversation(response.data.conversation);
      setFilename(file.name);
    } catch (err) {
      alert("Upload failed: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      Start Page: <input type="number" value={startPg} onChange={(e) => setStartPg(e.target.value)} />
      End Page: <input type="number" value={endPg} onChange={(e) => setEndPg(e.target.value)} />
      <br />
      <button onClick={handleUpload}>Generate Conversation</button>

      {filename && (
        <p>✅ Uploaded <strong>{filename}</strong> from page {startPg} to {endPg}</p>
      )}
    </div>
  );

};

export default FileUpload;

