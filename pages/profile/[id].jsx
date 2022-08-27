import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React, { useState, useEffect } from "react";
import AppContainer from "../../components/AppContainer/AppContainer";
import { client } from "../api";
import { getProfile, getUserPublications } from "../api/queries";

// const USER_QUESTIONS = Math.floor(Math.random() * 20);
const USER_QUESTIONS = 8;

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [publications, setPublications] = useState(null);
  const [loadingPublications, setLoadingPublications] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await client.query(getProfile, { id }).toPromise();
      console.log(response.data.profile);
      setProfile(response.data.profile);
      setLoadingProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPublications = async () => {
    try {
      const response = await client.query(getUserPublications, { id }).toPromise();
      console.log(response.data.publications.items);
      setPublications(response.data.publications);
      setLoadingPublications(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchPublications();
    }
  }, [id]);

  return (
    <AppContainer>
      <h1>Profile section</h1>
      {loadingProfile && <p>Loading Profile</p>}
      {!loadingProfile && profile && (
        <div className="relative">
          {profile?.coverPicture?.original.url ? (
            <img
              className="w-full h-60 object-cover"
              src={profile?.coverPicture?.original.url}
              alt="profile cover picture"
            />
          ) : (
            <div className="bg-black/30 w-full h-60" />
          )}

          {profile?.picture?.original?.url ? (
            <img
              className="rounded-full h-24 w-24 absolute translate-y-[-60%] translate-x-[20%]"
              src={profile?.picture?.original?.url}
              alt={"profile picture"}
            />
          ) : (
            <div className="bg-gray-100/70 rounded-full h-24 w-24 absolute translate-y-[-60%] translate-x-[20%]" />
          )}
          <div className="mt-10 px-2">
            <div className="flex  items-center justify-between mb-2">
              <h3 className="flex items-center">
                {profile?.handle ? profile?.handle : "unknown handle"}
                <button className="btn ml-2">Follow</button>
              </h3>
              <div className="flex">
                <p className="mx-1">Questions Made: {USER_QUESTIONS}</p>
                <p className="mx-1">Posts: {profile?.stats?.totalPosts}</p>
                <p className="mx-1">Followers: {profile?.stats?.totalFollowers}</p>
                <p className="mx-1">Following: {profile?.stats?.totalFollowing}</p>
                {/* <p className="mx-1">Collects: {profile?.stats?.totalCollects}</p> */}
              </div>
            </div>

            <p>{profile?.bio ? profile?.bio : "unknown bio"}</p>
          </div>
        </div>
      )}
      {!loadingProfile && !profile && <p>User not found.</p>}
    </AppContainer>
  );
};

export default Profile;
