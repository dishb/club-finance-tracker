"use client";

import columns from "@/data/columns";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/DataTable";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Purchase from "@/types/purchase";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const data: Purchase[] = [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  async function updateDataTable() {
    console.log("temp");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-10 w-[80%]">
        <Label htmlFor="uploadImage" className="text-2xl mb-4">
          Upload a receipt:
        </Label>

        <Input
          id="uploadImage"
          className="max-w-80 hover:cursor-pointer"
          type="file"
          onChange={handleFileChange}
        />
        <Button className="mt-4 hover:cursor-pointer" onClick={updateDataTable}>
          <Upload />
          Upload
        </Button>

        <div className="flex w-full mt-16 mb-4">
          <h2 className="text-2xl">Purchase history</h2>
        </div>

        <div className="container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
