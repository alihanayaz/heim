import { Header } from "@/features/header";
import { SearchBar } from "@/features/search";
import { Calendar } from "@/features/calendar";

function App() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-24 md:px-2">
      <Header />
      <SearchBar />
      <Calendar />
    </div>
  );
}

export default App;
