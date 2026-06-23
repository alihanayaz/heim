import { Settings } from "@/features/settings";
import { Header } from "@/features/header";
import { SearchBar } from "@/features/search";
import { Shortcuts } from "@/features/shortcuts";
import { Calendar } from "@/features/calendar";

export default function App() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-24 md:px-2">
      <Settings />
      <Header />
      <SearchBar />
      <Shortcuts />
      <Calendar />
    </div>
  );
}
