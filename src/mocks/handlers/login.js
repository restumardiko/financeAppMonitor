import { http, HttpResponse } from "msw";
import { tokenStore } from "../data/tokenStore";
import { user } from "../data/user";
import { ACCESS_TTL, generateToken } from "../utils/token";

export const logIn = [
  http.post("/api/logIn", async ({ request }) => {
    console.log("login hitted");
    const body = await request.json();
    const { email, password } = body;

    if (email !== user.email) {
      return HttpResponse.json(
        { message: "account not found" },
        { status: 404 }
      );
    }
    if (password !== user.password) {
      return HttpResponse.json({ message: "wrong password" }, { status: 401 });
    }

    console.log("ini email dan password", email, password);
    tokenStore.accessToken = generateToken("access");
    tokenStore.refreshTokenToken = generateToken("refresh");
    tokenStore.accessExpiredAt = Date.now() + ACCESS_TTL;

    return HttpResponse.json({
      token: tokenStore.accessToken,
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `${tokenStore.refreshToken};httpOnly;Path=/api/refresh;SameSite=Strict`,
      },
      message: "login succesfully",
    });
  }),
];
