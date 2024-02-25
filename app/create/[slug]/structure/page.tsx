import { CreateCategoryPage } from "@/app/actions";
import { SelectedCategory } from "@/components/category";
import SubmitButtons from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full container flex flex-col items-center pb-10">
      <h1 className="text-3xl font-semibold tracking-tight transition-colors">
        Which of these best describe your room?
      </h1>

      <form className="my-10 w-full" action={CreateCategoryPage}>
        <Input type="hidden" name="roomId" value={params?.slug || ""} />
        <SelectedCategory />

        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-20">
          <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button variant="secondary" size="lg">
              Cancel
            </Button>
            <SubmitButtons />
          </div>
        </div>
      </form>
    </div>
  );
}
