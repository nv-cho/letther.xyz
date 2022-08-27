import { useRouter } from "next/router";
import React from "react";
import AppContainer from "../../components/AppContainer/AppContainer";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppContainer>
      <h1>Profile section</h1>
      <p>id: {id}</p>
    </AppContainer>
  );
};

export default Profile;
