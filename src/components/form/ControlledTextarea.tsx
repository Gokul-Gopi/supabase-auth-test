import { useController } from "react-hook-form";
import { Textarea } from "../ui/Textarea";

interface IControlledTextareaProps extends React.ComponentProps<"textarea"> {
  name: string;
}

const ControlledTextarea = ({ name, ...props }: IControlledTextareaProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <div className="w-full">
      <Textarea {...field} {...props} />
      {error && (
        <p className="text-destructive mt-1.5 text-xs">{error.message}</p>
      )}
    </div>
  );
};

export default ControlledTextarea;
