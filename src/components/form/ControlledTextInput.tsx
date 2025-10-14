import React from "react";
import { Input } from "../ui/Input";
import { useController } from "react-hook-form";

interface IControlledTextInputProps extends React.ComponentProps<"input"> {
  name: string;
}

const ControlledTextInput = ({ name, ...props }: IControlledTextInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <div className="w-full">
      <Input {...field} {...props} />
      {error && (
        <p className="text-destructive mt-1.5 text-xs">{error.message}</p>
      )}
    </div>
  );
};

export default ControlledTextInput;
