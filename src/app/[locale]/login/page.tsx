import AuthStaticSection from "@/components/comman/auth-static-section";
import { LoginForm } from "./components/login-form";

export default function Login() {
  return (
    <main>
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <AuthStaticSection />
        <div className="flex justify-center items-center ">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
