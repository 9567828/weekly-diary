import { getQueryClient } from "@/hooks/getQueryClient";
import WrapperLayout from "../../WrapperLayout";
import CalendarPanel from "./(calendarPanel)/CalendarPanel";
import { fetchSelectCover } from "@/hooks/useQuerys/useCoverQuery";
import { ISearchParams } from "@/utils/Props";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createServClient } from "@/utils/supabase/service/server";
import { today } from "@/components/calendar/drawWeek";

export default async function Page({ searchParams }: ISearchParams) {
  // const { year, month } = await searchParams;
  // const queryClient = getQueryClient();
  // const supabase = await createServClient();

  // const getYear = Number(year) || Number(today().getFullYear());
  // const getMonth = Number(month) || Number(today().getMonth() + 1);

  return (
    <WrapperLayout>
      <CalendarPanel />
    </WrapperLayout>
  );
}
