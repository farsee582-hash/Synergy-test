"use client";

import { useState } from "react";

interface ImageUploadProps {
    onUpload: (url: string) => void;
    currentImage?: string;
}

export default function ImageUpload({ onUpload, currentImage = "" }: ImageUploadProps) {
    const [imageUrl, setImageUrl] = useState(currentImage);
    const [uploading, setUploading] = useState(false);

    // Update local state if prop changes
    if (currentImage && currentImage !== imageUrl && !uploading) {
        setImageUrl(currentImage);
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setImageUrl(data.url);
            onUpload(data.url);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Image</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ddd" }}
                    />
                )}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        style={{ marginBottom: "0.5rem" }}
                    />
                    {uploading && <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Uploading...</p>}
                    <input
                        type="hidden"
                        value={imageUrl}
                    />
                </div>
            </div>
        </div>
    );
}
