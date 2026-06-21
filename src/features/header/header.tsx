import { useClock } from "./use-clock";
import { APP_NAME } from "@/lib/constants";
import { useSettings } from "@/features/settings";

export default function Header() {
  const { time, seconds } = useClock();
  const { settings } = useSettings();
  const userName = settings.userName.trim();
  const now = new Date();
  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-col items-center justify-center text-center select-none">
      <h1 className="sr-only">{APP_NAME}</h1>

      <div className="text-foreground-muted mb-4 text-sm font-medium tracking-wider uppercase">
        {today}
      </div>

      <div className="group relative flex items-baseline justify-center">
        <h2 className="text-8xl font-bold tracking-tighter">{time}</h2>

        <div className="max-w-0 opacity-0 transition-all ease-in-out group-hover:ml-4 group-hover:max-w-32 group-hover:opacity-100">
          <span className="text-foreground-muted text-5xl font-extralight tabular-nums">
            {seconds}
          </span>
        </div>
      </div>

      <h3 className="text-foreground-muted mt-6 text-3xl font-light">
        Welcome back
        {userName && (
          <>
            , <span className="font-medium">{userName}</span>
          </>
        )}
        .
      </h3>

      <hr className="my-12 w-12" />
    </header>
  );
}
