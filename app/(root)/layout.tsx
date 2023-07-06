import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // find the first active store user have, in the (root) dont have the storeId, well just attempt to load the first one, whether we gonna redirect to (dashboard) routes OR keep the user inside the (root) and show the modal to create a first store
  const store = await prismadb.store.findFirst({
    where: {
      userId: userId,
    },
  });

  // if the user have a store, than redirect the user to the (dashboard) [storeId]
  // passing the store id into (dashboard)[storeId] params
  if (store) {
    redirect(`/${store.id}`);
  }

  // otherwise
  return (
    <>
      {children}
    </>
  )
}
