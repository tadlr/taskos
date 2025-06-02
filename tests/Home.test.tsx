import React from "react";

import { Provider } from "react-redux";

import Home from "@/app/page";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";

const pushMock = jest.fn();
const useAppSelectorMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("@/store/hooks", () => ({
  useAppSelector: (...args: any[]) => useAppSelectorMock(...args),
  useAppDispatch: () => jest.fn(),
}));

jest.mock("lottie-react", () => () => <div data-testid="mock-lottie" />);

const dummyReducer = (state = { auth: { token: null } }, action: any) => state;

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: dummyReducer,
    preloadedState: { auth: { token: null } },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders welcome message", () => {
  useAppSelectorMock.mockReturnValue({ token: null });
  renderWithProviders(<Home />);

  const titleElement = screen.getByText((content, element) => {
    return element?.textContent === "Welcome to taskOS";
  });
  expect(titleElement).toBeInTheDocument();
});

test("redirects to dashboard if token exists", () => {
  useAppSelectorMock.mockReturnValue({ token: "mocked-token" });
  renderWithProviders(<Home />);

  expect(pushMock).toHaveBeenCalledWith("/dashboard");
});

test("does not redirect to dashboard if no token", () => {
  useAppSelectorMock.mockReturnValue({ token: null });
  renderWithProviders(<Home />);

  expect(pushMock).not.toHaveBeenCalled();
});
