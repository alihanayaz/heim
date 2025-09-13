import { SearchBar } from "@/features/search";

function App() {
  return (
    <div className="bg-zinc-50 text-pretty text-zinc-800 antialiased">
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-12 md:px-2">
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
