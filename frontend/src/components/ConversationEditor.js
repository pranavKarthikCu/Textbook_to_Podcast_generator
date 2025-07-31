import React from "react";

const ConversationEditor = ({ conversation, setConversation }) => (
  <div>
    <h2>Generated Conversation</h2>
    <textarea
      rows={15}
      cols={100}
      value={conversation}
      onChange={(e) => setConversation(e.target.value)}
    />
  </div>
);

export default ConversationEditor;
