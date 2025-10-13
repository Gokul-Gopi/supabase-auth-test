import { Icon } from "@iconify/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@radix-ui/react-context-menu";

interface IPost {
  id: number;
  title: string;
  content: string;
}

const Post = ({ title, content }: IPost) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-secondary border-primary rounded border p-4">
          <div>
            <h5 className="text-muted-foreground truncate font-semibold">
              {title}
            </h5>
          </div>
          <p className="line-clamp-3 text-sm">{content}</p>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="bg-card border-primary :not-last:border flex w-28 flex-col gap-1 rounded border p-2 text-sm *:flex *:items-center *:gap-1 *:not-last:border-b *:not-last:pb-1 *:focus:outline-0">
        <ContextMenuItem className="text-primary cursor-pointer">
          <Icon icon="tabler:edit" />
          Edit
        </ContextMenuItem>

        <ContextMenuItem className="text-destructive cursor-pointer">
          <Icon icon="tabler:trash" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Post;
