import clsx from "clsx";
import { fontSans } from "@/config/fonts";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col fixed items-center justify-center gap-4 py-8 md:py-10 top-0 bottom-0 right-0 left-0 bg-gradient-to-tr from-red-800 via-red-400 to-slate-400">
      <div className="min-w-full text-center flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
