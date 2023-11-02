export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-h-[100dvh] w-full h-screen flex flex-col overflow-y-auto overflow-x-hidden">
      {children}
    </main>
  );
}
