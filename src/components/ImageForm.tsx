"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import Popup from "./Popup";

export default function ImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  let popupTitle = "";
  let popupDescription = "";

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
      setShowPopup(true);
      setFile(null);

      if (res.status === 404) {
        popupTitle = "404: Not Found";
        popupDescription =
          "The requested resource was not found. Please report this issue to the developers.";
      } else if (res.status === 500) {
        popupTitle = "500: Internal Server Error";
        popupDescription =
          "An error occurred on the server. Please report this issue to the developers.";
      } else if (res.status === 429) {
        popupTitle = "429: Rate Limit Exceeded";
        popupDescription =
          "You have exceeded the API rate limit. Please try again later.";
      } else {
        popupTitle = "Error while processing file.";
        popupDescription =
          "An unknown error occurred. Please report this issue to the developers.";
      }

      return;
    }

    const ocrRes = await res.json();

    //TODO: Replace console.log with database integration (create).
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

      {showPopup && (
        <Popup
          title={popupTitle}
          description={popupDescription}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
