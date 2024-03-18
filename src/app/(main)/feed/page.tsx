import { redirect } from "next/navigation";

export default async function page() {
  // redirect user to slug page
  redirect("/feed/media");
}
