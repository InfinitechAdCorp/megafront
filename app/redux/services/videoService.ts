import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 🔹 Fetch all video
export const fetchVideos = createAsyncThunk("video/fetchAll", async () => {
  const response = await fetch(`${API_BASE_URL}/api/video`);
  const data = await response.json();

  console.log("🔹 Fetched Videos:", data); // ✅ Debugging

  return data || []; // Ensure fallback to an empty array
});

// 🔹 Add a new video
export const addVideo = createAsyncThunk("video/add", async (newVideo: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/video`, {
    method: "POST",
    body: newVideo,
  });

  if (!response.ok) throw new Error("Failed to add video");

  const result = await response.json();
  console.log("✅ Added Video:", result);
  return result;
});

// 🔹 Fetch a single video by ID
export const fetchVideoById = createAsyncThunk("video/fetchById", async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/video/${id}`);

  if (!response.ok) throw new Error("Failed to fetch video");

  const data = await response.json();
  console.log(`📌 Fetched Video with ID ${id}:`, data);
  return data;
});

// 🔹 Update video
export const updateVideo = createAsyncThunk(
  "video/update",
  async ({ id, updatedVideo }: { id: number; updatedVideo: FormData }) => {
    const response = await fetch(`${API_BASE_URL}/api/video/${id}`, {
      method: "POST", // or "PUT" if backend requires
      body: updatedVideo,
    });

    if (!response.ok) throw new Error("Failed to update video");

    const updatedData = await response.json();
    console.log(`🔄 Updated Video ID ${id}:`, updatedData);
    return updatedData;
  }
);

// 🔹 Delete video
export const deleteVideo = createAsyncThunk("video/delete", async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/video/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete video");

  console.log(`❌ Deleted Video ID ${id}`);
  return id; // Return deleted video ID
});
