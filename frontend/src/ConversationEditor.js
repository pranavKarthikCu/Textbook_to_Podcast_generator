import React from "react";

const ConversationEditor = ({ conversation, setConversation }) => (
  <div className="conversation-box">
    <textarea
      className="conv-textarea"
      rows={12}
      value={conversation}
      onChange={(e) => setConversation(e.target.value)}
      placeholder="Your Alex & Sam conversation will appear here once generated…"
    />
  </div>
);

export default ConversationEditor;
