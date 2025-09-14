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
    <header className="mt-24 mb-8 flex flex-col justify-center gap-1 text-center tracking-tight">
      <h1 className="sr-only">Heim</h1>
      <h2 className="text-2xl md:text-3xl">{greeting}</h2>
      <div className="text-foreground-lighter text-xl md:text-2xl">
        It's {today}
      </div>
    </header>
  );
}
