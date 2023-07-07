import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/Navbar";

// params = [storeId] folder
export default async function DashboardLayout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // if there is userId it means that in the (dashboard) layout which in the url [storeId] have it, 
  // lets check the store is owned by the user 
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  // check if the store is actually exist, bcs user can write something in the url
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
