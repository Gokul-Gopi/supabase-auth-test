import { type NextApiResponse } from "next";
import { handleError, validateBody } from "@/utils/server/helpers";
import { prisma } from "@/utils/server/prisma";
import { createPostSchema } from "@/utils/validationSchema";
import authRoute, {
  AuthenticatedNextApiRequest,
} from "@/utils/server/authRoute";

const handleCreatePost = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) => {
  const userId = req.userId;
  const { title, content } = validateBody(createPostSchema, req.body);

  const post = await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return res.status(201).json({ data: post });
};

const handleGetPosts = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) => {
  const userId = req.userId;
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({ data: posts });
};

const handleUpdatePost = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) => {
  const id = req.query?.id;
  if (!id) throw new Error("No post id found");

  const { title, content } = validateBody(createPostSchema, req.body);

  const post = await prisma.post.update({
    where: {
      id: +id,
    },
    data: {
      title,
      content,
    },
  });
  return res.status(200).json({ data: post });
};

const handleDeletePost = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) => {
  const id = req.query?.id;
  if (!id) throw new Error("No post id found");

  const post = await prisma.post.delete({
    where: {
      id: +id,
    },
  });
  return res.status(200).json({ data: post });
};

const route = authRoute((req, res) => {
  try {
    const method = req.method;

    switch (method) {
      case "GET":
        return handleGetPosts(req, res);
      case "POST":
        return handleCreatePost(req, res);
      case "PUT":
        return handleUpdatePost(req, res);
      case "DELETE":
        return handleDeletePost(req, res);

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    handleError(res, error);
  }
});

export default route;
