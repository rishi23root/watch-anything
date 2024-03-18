import { appRouter } from "@/serverTRPC/routes";

export const serverAPI = appRouter.createCaller({
  id: "1",
});