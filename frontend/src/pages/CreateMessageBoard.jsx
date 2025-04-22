import React, { useState } from 'react'

const CreateMessageBoard = ({ showMessageBox, setShowMessageBox }) => {
  const [messageText, setMessageText] = useState("");

  const handlePost = async () => {
    if (messageText.trim().length === 0) return;
    
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/posts/writepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "Untitled", 
          text: messageText
        })
      });

      if (response.ok) {
        alert("Post submitted!");
        setMessageText("");
        setShowMessageBox(false);
      } else {
        alert(response.message || "Post submitted!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  if (!showMessageBox) return null; // ✅ don't render unless it's toggled on

  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      background: "grey",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      zIndex: 1000,
      width: "300px"
    }}>
      <textarea
        placeholder="Write your post..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        maxLength={1000}
        rows={6}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
        <small>{messageText.length}/1000</small>
        <button onClick={handlePost} style={{ padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreateMessageBoard