import React from "react";

import axios from "axios";
import { Provider } from "react-redux";

import Login from "@/features/auth/Login";
import { store } from "@/store/store";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<Login />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("disables login button while loading", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    renderWithProvider(<Login />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).not.toBeDisabled();

    fireEvent.click(loginButton);

    expect(loginButton).toBeDisabled();
  });
});
