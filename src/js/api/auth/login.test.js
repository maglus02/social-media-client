import { login } from "./login.js";
import { save } from "../../storage/index.js";
import { apiPath } from "../constants.js";

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({ accessToken: "mockToken" }),
});

jest.mock("../../storage/index.js", () => ({
  save: jest.fn(),
  load: jest.fn(),
}));

describe("login function 2", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("saves the token to storage when login is successful", async () => {
    await login("test@example.com", "password");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/auth/login`,
      expect.objectContaining({
        method: "post",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password",
        }),
        headers: expect.any(Object),
      }),
    );
    expect(save).toHaveBeenCalledWith("token", "mockToken");
  });

  it("throws an error when login fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(
      login("invalid@example.com", "invalidpassword"),
    ).rejects.toThrow("Unauthorized");

    expect(save).not.toHaveBeenCalled();
  });
});
