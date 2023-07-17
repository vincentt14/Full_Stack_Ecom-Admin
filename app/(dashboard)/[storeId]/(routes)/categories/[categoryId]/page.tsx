import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({ params }: { params: { storeId: string; categoryId: string } }) => {
  // fetch the existing category using the ID in URL
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm  initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
