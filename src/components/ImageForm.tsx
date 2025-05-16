"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import axios from "axios";

export default function ImageForm() {
  const [file, setFile] = useState<File | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  async function onClick() {
    //TODO: Setup form data to send.
    const formData = {};
    try {
      const res = await axios.post("/api/upload-receipt", formData);
      console.log("Success posting to the API endpoint.");
    } catch (error: any) {
      console.error("Error posting to the API endpoint.", error);
    }

    //TODO: Implement our MongoDB database and then update the database here.
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
