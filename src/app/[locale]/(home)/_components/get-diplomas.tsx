import { getDiplomas } from "@/lib/api/diplomas.api";

export default async function GetFirstPageDiplomas() {
  // First page diplomas
  const diplomas = await getDiplomas(1);

  // Error
  if ("code" in diplomas) {
    return <p className="text-red-500 text-center p-4">{diplomas.message || "Failed fetching diplomas... :("}</p>;
  }

  // Content
  return <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-2.5 xl:grid-cols-3 ">{diplomas}</div>;
}
