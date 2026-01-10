import { http, HttpResponse } from "msw";

export const logOut = [
  http.delete("/api/logOut", () => {
    console.log("logOut hitted");
    return HttpResponse.json({
      id: "test",
      title: "ini teest ya bang",
    });
  }),
];
