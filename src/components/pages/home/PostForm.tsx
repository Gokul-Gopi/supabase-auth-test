import { Input } from "@/components/ui/Input";
import LoaderButton from "@/components/ui/LoaderButton";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/utils/client/helpers";
import { IPostForm } from "@/utils/types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IPostFormProps {
  formData?: IPostForm | null;
}

const PostForm = ({ formData }: IPostFormProps) => {
  const form = useForm<IPostForm>();
  const editMode = !!formData;

  useEffect(() => {
    if (editMode) {
      form.reset(formData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
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
        <LoaderButton type="submit" className="w-full">
          {editMode ? "Update" : "Create"}
        </LoaderButton>
      </form>
    </FormProvider>
  );
};

export default PostForm;
