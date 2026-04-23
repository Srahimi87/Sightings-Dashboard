import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSightings, setNextWeek, setPreviousWeek } from "./features/sightings/sightingsSlice";
import type { RootState, AppDispatch } from "./app/store";

import {
  selectWeeks,
  selectCurrentWeekIndex,
  selectCurrentWeekData,
} from "./features/sightings/sightingsSelectors";

import SightingsChart from "./components/SightingsChart";
import WeekNavigator from "./components/WeekNavigator";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector(
    (state: RootState) => state.sightings
  );

  const weeks = useSelector(selectWeeks);
  const currentWeekIndex = useSelector(selectCurrentWeekIndex);
  const weekData = useSelector(selectCurrentWeekData);

  useEffect(() => {
    dispatch(getSightings());
  }, [dispatch]);

  return (
    <div className="bg-gray-400 max-w-3xl mx-auto font-semibold md:px-6 pb-10 pt-10">
      <Header />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && weeks.length > 0 && (
        <>
          <WeekNavigator
            currentWeek={weeks[currentWeekIndex]}
            onPrevious={() => dispatch(setPreviousWeek())}
            onNext={() => dispatch(setNextWeek(weeks.length))}
            disablePrevious={currentWeekIndex === 0}
            disableNext={currentWeekIndex === weeks.length - 1}
          />

          <p className="text-center text-white mb-2">
            Week {currentWeekIndex + 1} of {weeks.length}
          </p>

          <SightingsChart data={weekData} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default App;
