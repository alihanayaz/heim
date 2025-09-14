import { Header } from "@/features/header";
import { SearchBar } from "@/features/search";

function App() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 md:px-2">
      <Header />
      <SearchBar />
    </div>
  );
}

export default App;
