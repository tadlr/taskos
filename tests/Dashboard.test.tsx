import React from "react";

import { Provider } from "react-redux";

import Dashboard from "@/app/dashboard/page";
import { store } from "@/store/store";
import { render, screen } from "@testing-library/react";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("<Dashboard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders spinner while restoring", () => {
    store.dispatch({ type: "auth/setRestoring", payload: true });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it('redirects to "/" when not authenticated and not restoring', () => {
    store.dispatch({ type: "auth/logout" });
    store.dispatch({ type: "auth/setRestoring", payload: false });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("renders TaskBoard and LogoutButton when authenticated and not restoring", () => {
    store.dispatch({ type: "auth/login", payload: "someToken" });
    store.dispatch({ type: "auth/setRestoring", payload: false });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
