import { Locales } from "@/i18n/routing";

export default function QuestionsList({ params: { id } }: { params: { locale: Locales; id: string } }) {
  console.log("Props are here", id);

  return (
    <>
      <h1>Question List</h1>
    </>
  );
}
