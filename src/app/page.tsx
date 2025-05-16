import ImageForm from "@/components/ImageForm";
import DataTable from "@/components/DataTable";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-10 w-[80%]">
        <ImageForm />

        <div className="flex w-full mt-16 mb-4">
          <h2 className="text-2xl">Purchase history</h2>
        </div>

        <div className="container mx-auto">
          <DataTable />
        </div>
      </div>
    </div>
  );
}
