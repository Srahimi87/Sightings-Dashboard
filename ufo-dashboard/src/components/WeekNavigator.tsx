import React from 'react';
import { format } from 'date-fns';

interface Props {
  currentWeek: Date;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean; 
  disableNext?: boolean;    
}

const WeekNavigator: React.FC<Props> = ({
  currentWeek,
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
}) => {
  const formattedStart = format(currentWeek, 'dd MMM yyyy');
  const formattedEnd = format(new Date(currentWeek.getTime() + 6 * 86400000), 'dd MMM yyyy');

  return (
    <div className="flex items-center justify-between mb-4 mr-5 ml-5 mt-4">
      <button
        onClick={onPrevious}
        disabled={disablePrevious}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Previous Week
      </button>
      <span className="font-semibold-medium">
        {formattedStart} -- {formattedEnd}
      </span>
      <button
        onClick={onNext}
        disabled={disableNext}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next Week
      </button>
    </div>
  );
};

export default WeekNavigator;
