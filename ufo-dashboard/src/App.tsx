import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSightings } from "./features/sightings/sightingsSlice";
import type { RootState, AppDispatch } from "./app/store";
import { groupSightingsByWeek } from "./utils/groupSightingsByWeek";
import SightingsChart from "./components/SightingsChart";
import WeekNavigator from "./components/WeekNavigator";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.sightings
  );

  const startWeek = useMemo(() => {
    const seen = new Set<string>();
    const weeks: Date[] = [];

    data.forEach((sighting) => {
      const [day, month, year] = sighting.date.split("/");
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      const dayOfWeek = date.getDay();
      const monday = new Date(date);
      monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      const mondayStr = monday.toDateString();

      if (!seen.has(mondayStr)) {
        seen.add(mondayStr);
        weeks.push(monday);
      }
    });

    return weeks.sort((a, b) => a.getTime() - b.getTime());
  }, [data]);

  const [currentWeekStart, setCurrentWeekStart] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(getSightings());
  }, [dispatch]);

  useEffect(() => {
    if (!currentWeekStart && startWeek.length > 0) {
      setCurrentWeekStart(startWeek[0]);
    }
  }, [startWeek, currentWeekStart]);

  if (!currentWeekStart) return null;

  const currentWeekIndex = startWeek.findIndex(
    (w) => w.toDateString() === currentWeekStart.toDateString()
  );

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekStart(startWeek[currentWeekIndex - 1]);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < startWeek.length - 1) {
      setCurrentWeekStart(startWeek[currentWeekIndex + 1]);
    }
  };

  const weekData = groupSightingsByWeek(data, currentWeekStart);

  return (
    <div className=" bg-gray-400 max-w-3xl mx-auto font-semibold md:px-6 pb-10 pt-10">
      <Header />
      <WeekNavigator
        currentWeek={currentWeekStart}
        onPrevious={handlePreviousWeek}
        onNext={handleNextWeek}
        disablePrevious={currentWeekIndex === 0}
        disableNext={currentWeekIndex === startWeek.length - 1}
      />
      <p className="text-center text-sm text-white font-semibold mb-2 ">
        Week {currentWeekIndex + 1} of {startWeek.length}
      </p>
      {loading && <p className="text-black text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {!loading && !error && <SightingsChart data={weekData} />}
      <Footer />
    </div>
  );
};

export default App;
