export default function Header() {
  const now = new Date();
  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const hours = now.getHours();
  const greeting = `Good ${hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening"}, Alihan`;
  return (
    <header className="mb-8 flex flex-col gap-1">
      <h1 className="sr-only">Heim</h1>
      <h2 className="text-2xl">{greeting}</h2>
      <p className="text-zinc-600">It's {today}</p>
    </header>
  );
}
