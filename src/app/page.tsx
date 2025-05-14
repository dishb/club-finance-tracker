"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import DataTable from "@/components/DataTable";
import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const sendToBackend = () => {
    console.log("Image sent to backend.");
    console.log(
      `Name: ${selectedFile?.name}\nType: ${selectedFile?.type}\nSize: ${selectedFile?.size} MB`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mt-10 w-[80%]">
        <Input type="file" onChange={handleFileChange} />
        <Button className="mt-4" onClick={sendToBackend}>
          <Upload />
          Upload
        </Button>

        <DataTable />
      </div>
    </div>
  );
}
