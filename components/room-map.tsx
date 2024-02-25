import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
const LazyMap = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <Skeleton className="h-[50vh] w-full" />,
});
export function RoomMap({ locationValue }: { locationValue: string }) {
  return <LazyMap locationValue={locationValue} />;
}
