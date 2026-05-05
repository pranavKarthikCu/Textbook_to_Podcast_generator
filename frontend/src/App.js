import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ConversationEditor from "./ConversationEditor";
import AudioPlayer from "./AudioPlayer";
import "./App.css";

function App() {
  const [conversation, setConversation] = useState("");

  return (
    <div className="pod-root">
      <header className="pod-header">
        <div className="pod-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill="#0d0d0f" />
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
              fill="#0d0d0f"
            />
          </svg>
        </div>
        <div>
          <h1 className="pod-title">Textbook to Podcast</h1>
          <p className="pod-subtitle">AI Conversation Studio</p>
        </div>
        <span className="pod-badge">Live</span>
      </header>

      <FileUpload setConversation={setConversation} />

      <hr className="divider" />

      <p className="section-label">02 — Edit conversation</p>
      <ConversationEditor
        conversation={conversation}
        setConversation={setConversation}
      />

      <hr className="divider" />

      <p className="section-label">03 — Convert to audio</p>
      <AudioPlayer conversation={conversation} />
    </div>
  );
}

export default App;
