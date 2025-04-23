import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useToast, Select } from "@chakra-ui/react";
const BASE_URL = import.meta.env.VITE_API_URL;
//const BASE_URL = 'http://localhost:5173';

const CreateMessageBoard = ({ showMessageBox, setShowMessageBox }) => {
  const [messageText, setMessageText] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/posts/all`);
      console.log("Fetching from:", `${BASE_URL}/api/posts/getposts`);
      const res = await fetch(`${BASE_URL}/api/posts/getposts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      console.log("Fetched posts:", data);
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handlePost = async () => {
    if (messageText.trim().length === 0) return;
    const token = localStorage.getItem("token");
    //console.log("Token being sent:", token);

    try {
      const response = await fetch(`${BASE_URL}/api/posts/writepost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`},
        body: JSON.stringify({title: "Untitled", text: messageText })
      });  

      if (response.ok) {
        console.log("Post submitted!");
        setMessageText("");
        setShowMessageBox(false);
        fetchPosts();
      } else {
        alert(response.message || "Post submitted!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!showMessageBox) return null;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      {/* Message Box */}
      <div style={{
        background: "grey",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        marginBottom: "2rem"
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

      {/* Posts List */}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            background: "#f0f0f0",
            borderRadius: "8px",
            color: "black",  
            padding: "1rem",
            marginBottom: "1rem"
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            {post.author?.username || "Unknown"} •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
          <div style={{ whiteSpace: "pre-wrap" }}>{post.text}</div>
        </div>
      ))}
    </div>
  );
};

export default CreateMessageBoard;
