import { useCreatePost, useEditPost } from "@/api/queries/post.queries";
import { Input } from "@/components/ui/Input";
import LoaderButton from "@/components/ui/LoaderButton";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/utils/client/helpers";
import { IPostData, IPostForm } from "@/utils/types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IPostFormProps {
  formData?: IPostData | null;
  onEditSuccess?: () => void;
}

const PostForm = ({ formData, onEditSuccess }: IPostFormProps) => {
  const form = useForm<IPostForm>();

  const createPost = useCreatePost();
  const editPost = useEditPost();

  const editMode = !!formData;

  useEffect(() => {
    if (editMode) {
      form.reset(formData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const onSubmit = form.handleSubmit((data) => {
    if (editMode) {
      editPost.mutate(
        { id: formData.id, ...data },
        {
          onSuccess: () => {
            toast.success("Post edited");
            onEditSuccess?.();
          },
        },
      );
    } else {
      createPost.mutate(data, {
        onSuccess: () => {
          toast.success("Post created");
          form.reset();
        },
      });
    }
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className={cn("flex max-w-[20rem] flex-col items-start gap-4", {
          "max-w-none": editMode,
        })}
      >
        <Input placeholder="Title" {...form.register("title")} />
        <Textarea placeholder="Content" {...form.register("content")} />
        <LoaderButton
          loading={editMode ? editPost.isPending : createPost.isPending}
          type="submit"
          className="w-full"
        >
          {editMode ? "Update" : "Create"}
        </LoaderButton>
      </form>
    </FormProvider>
  );
};

export default PostForm;
