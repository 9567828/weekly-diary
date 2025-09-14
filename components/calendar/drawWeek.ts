export const drawWeeks = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const getPrevWeek = (weekStart: Date) => {
    const d = new Date(weekStart); // 복제
    d.setDate(d.getDate() - 7);
    return d;
  };

  const getNextWeek = (weekStart: Date) => {
    const d = new Date(weekStart); // 복제
    d.setDate(d.getDate() + 7);
    return d;
  };

  const goToday = () => {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    return sunday;
  };

  return { weekDates, weekStart, weekEnd, getPrevWeek, getNextWeek, goToday };
};

export const drowMonth = () => {
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth();

  const firstDate = new Date(curYear, curMonth, 1);
  const startDay = new Date(firstDate);
  const firstNum = firstDate.getDay();
  startDay.setDate(1 - firstDate.getDay());

  const lastDate = new Date(curYear, curMonth + 1, 0); // 다음 달로 넘어가서 마지막 날 구하기
  const lastDay = new Date(lastDate);
  const lastNum = lastDate.getDate();

  lastDay.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

  let currWeeks = [];
  let allWeeks = [];
  const curDate = new Date(startDay);

  return { firstDate };
};
