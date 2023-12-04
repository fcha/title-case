import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let post = {
  name: "Hello World",
};

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {

      const re = /(\b[a-z](?!\s))/g;
      input.name = input.name.replace(re, function(x){return x.toUpperCase();});

      post = { name: input.name };
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return post;
  }),
});
