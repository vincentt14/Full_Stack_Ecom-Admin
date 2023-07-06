import prismadb from "@/lib/prismadb";

interface DashboadPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboadPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
