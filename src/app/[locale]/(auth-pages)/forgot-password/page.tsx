import AuthStaticSection from "@/components/comman/auth-static-section";
import FormWraper from "./_components/form-wraper";

export default function ForgetPasswordPage() {
  return (
    <main>
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <AuthStaticSection />
        <div className="flex justify-center items-center ">
          <FormWraper />
        </div>
      </section>
    </main>
  );
}
