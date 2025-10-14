import React from "react";
import { Input } from "../ui/Input";
import { useController } from "react-hook-form";

interface IControlledPasswordInputProps extends React.ComponentProps<"input"> {
  name: string;
}

const ControlledPasswordInput = ({
  name,
  ...props
}: IControlledPasswordInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <div className="w-full">
      <Input type="password" {...field} {...props} />
      {error && (
        <p className="text-destructive mt-1.5 text-xs">{error.message}</p>
      )}
    </div>
  );
};

export default ControlledPasswordInput;
