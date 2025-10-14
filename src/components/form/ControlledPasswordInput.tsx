import React, { useState } from "react";
import { Input } from "../ui/Input";
import { useController } from "react-hook-form";
import { Icon } from "@iconify/react";

interface IControlledPasswordInputProps extends React.ComponentProps<"input"> {
  name: string;
}

const ControlledPasswordInput = ({
  name,
  ...props
}: IControlledPasswordInputProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <div className="relative w-full">
      <Input type={hidePassword ? "password" : "text"} {...field} {...props} />
      {error && (
        <p className="text-destructive mt-1.5 text-xs">{error.message}</p>
      )}

      <Icon
        onClick={() => setHidePassword((pre) => !pre)}
        icon={hidePassword ? "tabler:eye-off" : "tabler:eye"}
        className="absolute top-2.5 right-3"
      />
    </div>
  );
};

export default ControlledPasswordInput;
