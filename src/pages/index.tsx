export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/signup",
      permanent: false,
    },
  };
};

const Page = () => {
  return <div>Posts</div>;
};

export default Page;
