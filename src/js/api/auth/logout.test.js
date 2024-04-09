import { logout } from "./logout.js";
import { remove } from "../../storage/index.js";

jest.mock("../../storage/index.js", () => ({
  remove: jest.fn(),
}));

describe("logout function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("clears the token from storage", () => {
    logout();

    expect(remove).toHaveBeenCalledWith("token");
  });

  it("clears the profile from storage", () => {
    logout();

    expect(remove).toHaveBeenCalledWith("profile");
  });
});
