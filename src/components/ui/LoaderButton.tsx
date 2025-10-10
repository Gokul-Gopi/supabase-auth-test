import { Button } from "./Button";
import Loader from "./Loader";

interface ILoaderButton extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

const LoaderButton = ({ children, loading, ...props }: ILoaderButton) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader />}
      {children}
    </Button>
  );
};

export default LoaderButton;
