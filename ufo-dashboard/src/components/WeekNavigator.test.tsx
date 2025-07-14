import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeekNavigator from './WeekNavigator';
import { describe, it, expect, vi } from 'vitest';

describe('WeekNavigator', () => {
  const mockDate = new Date(2025, 6, 7); // monthIndex = start from 0 
  it('renders the week range correctly', () => {
    render(
      <WeekNavigator
        currentWeek={mockDate}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );
    expect(screen.getByText(/7 Jul 2025 -- 13 Jul 2025/)).toBeInTheDocument();
  });

  it('calls onPrevious and onNext when buttons are clicked', async () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    const user = userEvent.setup();

    render(
      <WeekNavigator
        currentWeek={mockDate}
        onPrevious={onPrev}
        onNext={onNext}
      />
    );

    await user.click(screen.getByRole('button', { name: /Previous Week/i }));
    await user.click(screen.getByRole('button', { name: /Next Week/i }));

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when disablePrevious and disableNext are true', () => {
    render(
      <WeekNavigator
        currentWeek={mockDate}
        onPrevious={() => {}}
        onNext={() => {}}
        disablePrevious
        disableNext
      />
    );

    expect(screen.getByRole('button', { name: /Previous Week/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Next Week/i })).toBeDisabled();
  });
});
