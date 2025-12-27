import { http } from "msw";

export const handlers = [
  http.post("/api/logIn", async (req, res, ctx) => {
    console.log("MSW LOGIN HIT");

    const { email, password } = await req.json();

    if (email !== "demo@mail.com" || password !== "user1234") {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        token: FAKE_TOKEN,
        user: { id: 1, email },
      })
    );
  }),
];
