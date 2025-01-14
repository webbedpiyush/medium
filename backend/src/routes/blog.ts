import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from "@webbedpiyush/medium-common";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// anywhere on this specific router
postRouter.use("/*", async (c, next) => {
  // if the token is bearer then it needs further processing
  const header = c.req.header("authorization") as string;
  try {
    const response = await verify(header, c.env.JWT_SECRET);

    if (response) {
      c.set("userId", response.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ error: "you are not logged in" });
  }
});
postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // do pagination
  const posts = await prisma.post.findMany();
  return c.json(posts);
});
postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // do this in try catch error
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return c.json(post);
});

postRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId, // extract in the middleware
    },
  });
  return c.json({
    id: post.id,
  });
});

postRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ id: post.id });
});
