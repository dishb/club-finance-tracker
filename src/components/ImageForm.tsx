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
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  async function onClick() {
    if (!file) {
      setPopupTitle("No file selected");
      setPopupDescription(
        "Please select a file to upload before clicking the upload button."
      );
      setShowPopup(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-receipt", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setFile(null);

      if (res.status === 404) {
        setPopupTitle("404: Not Found");
        setPopupDescription(
          "The requested resource was not found. Please report this issue to the developers."
        );
      } else if (res.status === 500) {
        setPopupTitle("500: Internal Server Error");
        setPopupDescription(
          "An error occurred on the server. Please report this issue to the developers."
        );
      } else if (res.status === 429) {
        setPopupTitle("429: Rate Limit Exceeded");
        setPopupDescription(
          "You have exceeded the API rate limit. Please try again later."
        );
      } else {
        setPopupTitle("Error while processing file.");
        setPopupDescription(
          "An unknown error occurred. Please report this issue to the developers."
        );
      }

      setShowPopup(true);

      return;
    }

    return;
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
