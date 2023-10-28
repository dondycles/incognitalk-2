import AuthForm from "../components/ui/AuthForm";

export default async function Portal() {
  return (
    <main className="max-h-[100dvh] w-full h-screen flex p-2">
      <AuthForm />
    </main>
  );
}
