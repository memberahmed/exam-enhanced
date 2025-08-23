import AuthStaticSection from "@/components/comman/auth-static-section";
import RgisterForm from "./_components/register-form";

export default function Singup() {
  return (
    <main>
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <AuthStaticSection />
        <div className="flex flex-col justify-center items-center ">
          <RgisterForm />
        </div>
      </section>
    </main>
  );
}
