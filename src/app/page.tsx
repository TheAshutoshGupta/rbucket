"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload successful:", data);
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    } else {
      console.log("No file selected");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload a file</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="file" onChange={handleFileChange} />
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload}>Upload</Button>
      </CardFooter>
    </Card>
  );
}
