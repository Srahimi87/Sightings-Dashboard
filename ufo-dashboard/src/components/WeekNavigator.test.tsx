import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import WeekNavigator from "./WeekNavigator";

describe("WeekNavigator", () => {
  const mockDate = new Date("2024-01-01");

  const setup = (props = {}) => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(
      <WeekNavigator
        currentWeek={mockDate}
        onPrevious={onPrev}
        onNext={onNext}
        disablePrevious={false}
        disableNext={false}
        {...props}
      />
    );

    return { onPrev, onNext };
  };

  it("renders the correct week range", () => {
    setup();

    const start = format(mockDate, "dd MMM yyyy");
    const end = format(
      new Date(mockDate.getTime() + 6 * 86400000),
      "dd MMM yyyy"
    );

    expect(
      screen.getByText(`${start} -- ${end}`)
    ).toBeInTheDocument();
  });

  it("calls onPrevious and onNext when buttons are clicked", async () => {
    const user = userEvent.setup();
    const { onPrev, onNext } = setup();

    await user.click(
      screen.getByRole("button", { name: /previous week/i })
    );
    await user.click(
      screen.getByRole("button", { name: /next week/i })
    );

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("disables buttons when props are true", () => {
    setup({
      disablePrevious: true,
      disableNext: true,
    });

    expect(
      screen.getByRole("button", { name: /previous week/i })
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: /next week/i })
    ).toBeDisabled();
  });

  it("does not call callbacks when buttons are disabled", async () => {
    const user = userEvent.setup();
    const { onPrev, onNext } = setup({
      disablePrevious: true,
      disableNext: true,
    });

    await user.click(
      screen.getByRole("button", { name: /previous week/i })
    );
    await user.click(
      screen.getByRole("button", { name: /next week/i })
    );

    expect(onPrev).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
  });
});
