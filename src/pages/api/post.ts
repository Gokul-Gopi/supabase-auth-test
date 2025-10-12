import { type NextApiResponse } from "next";
import { handleError, validateBody } from "@/utils/server/helpers";
import { prisma } from "@/utils/server/prisma";
import { createPostSchema } from "@/utils/validationSchema";
import authRoute, {
  AuthenticatedNextApiRequest,
} from "@/utils/server/authRoute";

const handleCreatePost = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const userId = req.user.id;
    const { title, body } = validateBody(createPostSchema, req.body);

    const post = await prisma.post.create({
      data: {
        title,
        body,
        userId,
      },
    });

    return res.status(201).json({ data: post });
  } catch (error) {
    return handleError(res, error);
  }
};

const handleGetPosts = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({ data: posts });
  } catch (error) {
    return handleError(res, error);
  }
};

const handleUpdatePost = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const id = req.query?.id;
    if (!id) throw new Error("No post id found");

    const { title, body } = validateBody(createPostSchema, req.body);

    const post = await prisma.post.update({
      where: {
        id: +id,
      },
      data: {
        title,
        body,
      },
    });
    return res.status(200).json({ data: post });
  } catch (error) {
    return handleError(res, error);
  }
};

const handleDeletePost = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const id = req.query?.id;
    if (!id) throw new Error("No post id found");

    const post = await prisma.post.delete({
      where: {
        id: +id,
      },
    });
    return res.status(200).json({ data: post });
  } catch (error) {
    return handleError(res, error);
  }
};

export default authRoute(
  () => (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    try {
      const method = req.method;

      switch (method) {
        case "GET":
          return handleCreatePost(req, res);
        case "POST":
          return handleGetPosts(req, res);
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
  }
);
