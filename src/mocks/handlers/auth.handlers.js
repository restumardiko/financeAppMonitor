import { http, HttpResponse } from "msw";
import { db } from "../data/db";
import { ACCESS_TOKEN, generateRefreshToken } from "../middlewares/requireAuth";

export const authHandlers = [
  // signup
  http.post("/api/signUp", async ({ request }) => {
    const body = await request.json();

    const user = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      password: body.password,
      created_at: new Date().toISOString(),
    };

    db.users.push(user);

    return HttpResponse.json({
      message: "sign up succesfully",
      data: user.id,
    });
  }),

  // login
  http.post("/api/logIn", async ({ request }) => {
    const body = await request.json();
    const user = db.users.find((u) => u.email === body.email);

    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password !== body.password) {
      return HttpResponse.json({ message: "password wrong" }, { status: 401 });
    }

    const refreshToken = generateRefreshToken();
    user.refreshToken = refreshToken;
    user.refreshTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;

    return HttpResponse.json(
      { token: ACCESS_TOKEN, message: "login succesfully" },
      {
        headers: {
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Path=/;`,
        },
      }
    );
  }),

  // refresh
  http.post("/api/refresh", ({ cookies }) => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return HttpResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );
    }

    const user = db.users.find((u) => u.refreshToken === refreshToken);

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    if (Date.now() > user.refreshTokenExpires) {
      return HttpResponse.json(
        { message: "Refresh token expired" },
        { status: 403 }
      );
    }

    return HttpResponse.json({ token: ACCESS_TOKEN });
  }),

  // logout
  http.delete("/api/logOut", ({ cookies }) => {
    const refreshToken = cookies.refreshToken;
    const user = db.users.find((u) => u.refreshToken === refreshToken);

    if (user) {
      user.refreshToken = null;
      user.refreshTokenExpires = null;
    }

    return HttpResponse.json(
      { message: "Logout successful" },
      {
        headers: {
          "Set-Cookie": "refreshToken=; Max-Age=0; Path=/;",
        },
      }
    );
  }),
];
