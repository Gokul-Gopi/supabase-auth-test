import { useCreatePost, useEditPost } from "@/api/queries/post.queries";
import ControlledTextarea from "@/components/form/ControlledTextarea";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import LoaderButton from "@/components/ui/LoaderButton";
import { cn } from "@/utils/client/helpers";
import { IPostData, IPostForm } from "@/utils/types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "@/utils/validationSchema";

interface IPostFormProps {
  formData?: IPostData | null;
  onEditSuccess?: () => void;
}

const defaultValues: IPostForm = {
  title: "",
  content: "",
};

const PostForm = ({ formData, onEditSuccess }: IPostFormProps) => {
  const form = useForm<IPostForm>({
    resolver: zodResolver(createPostSchema),
  });

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
          form.reset(defaultValues);
        },
      });
    }
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className={cn("flex flex-col items-start gap-4 md:max-w-[20rem]", {
          "md:max-w-none": editMode,
        })}
      >
        <ControlledTextInput name="title" placeholder="Title" />
        <ControlledTextarea name="content" placeholder="Content" />
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
