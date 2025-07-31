import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ConversationEditor from "./components/ConversationEditor";
import AudioPlayer from "./components/AudioPlayer";
import "./App.css";

function App() {
  const [conversation, setConversation] = useState("");

  return (
    <div className="App">
      <h1>📘 Textbook to Podcast (React)</h1>
      <FileUpload setConversation={setConversation} />
      <ConversationEditor conversation={conversation} setConversation={setConversation} />
      <AudioPlayer conversation={conversation} />
    </div>
  );
}

export default App;
