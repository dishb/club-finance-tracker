"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

export default function ImageForm() {
  const [file, setFile] = useState<File | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  async function onClick() {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-receipt", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Upload failed");
      return;
    }

    const ocrRes = await res.json();
    console.log(ocrRes);
  }

  return (
    <div className="flex flex-col">
      <Label className="text-2xl mb-4">Upload a receipt:</Label>

      <Input
        className="max-w-80 hover:cursor-pointer"
        type="file"
        onChange={onChange}
      />

      <Button className="mt-4 hover:cursor-pointer" onClick={onClick}>
        <Upload />
        Upload
      </Button>
    </div>
  );
}
