import { useRouter } from "next/router";
import React from "react";
import AppContainer from "../../components/AppContainer/AppContainer";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppContainer>
      <h1>Post section</h1>
      <p>id: {id}</p>
    </AppContainer>
  );
};

export default Post;
