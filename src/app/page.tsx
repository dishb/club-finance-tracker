export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl font-bold">Club Finance Tracker</h1>
        <h2 className="text-2xl mt-4">
          Created by Dishant Bhandula and Samanyu Kulkarni.
        </h2>

        <div className=" mt-4 w-300 h-150 bg-gray-300 rounded-xl"></div>

        <button className="mt-4 text-2xl bg-gray-400 p-4 rounded-lg">Upload</button>
      </div>
    </div>
  );
}
