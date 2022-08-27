import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React, { useState, useEffect } from "react";
import AppContainer from "../../components/AppContainer/AppContainer";
import { client } from "../api";
import { getProfile, getUserPublications } from "../api/queries";

// const USER_QUESTIONS = Math.floor(Math.random() * 20);
const USER_QUESTIONS = 8;
const USER_TOKENS = 5;

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [publications, setPublications] = useState(null);
  const [loadingPublications, setLoadingPublications] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await client.query(getProfile, { id }).toPromise();
      console.log(response.data.profile);
      setProfile(response.data.profile);
      // setLoadingProfile(false);
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
      {loadingProfile && <p className="text-lg mt-4">Loading Profile...</p>}
      {!loadingProfile && profile && (
        <div className="relative">
          {profile?.coverPicture?.original.url ? (
            <img
              className="w-full h-60 object-cover "
              src={profile?.coverPicture?.original.url}
              alt="profile cover picture"
            />
          ) : (
            <div className="bg-black/30 w-full h-60" />
          )}

          {profile?.picture?.original?.url ? (
            <img
              className="rounded-full h-24 w-24 absolute translate-y-[-60%] translate-x-[20%] border-[2px] border-black"
              src={profile?.picture?.original?.url}
              alt={"profile picture"}
            />
          ) : (
            <div className="bg-gray-100/70 rounded-full h-24 w-24 absolute translate-y-[-60%] translate-x-[20%] border-[2px] border-black" />
          )}
          <div className="mt-10 px-2">
            <div className="flex  items-center justify-between mb-5">
              <h3 className="flex items-center">
                {profile?.handle ? profile?.handle : ""}
                <button className="btn !bg-primary ml-2 " disabled={true}>
                  Follow
                </button>
              </h3>
              <div className="flex">
                <p className="mr-6">
                  Reputation balance: <span className="text-primary">{USER_TOKENS} $RPN</span>
                </p>
                <p className="mx-1">Questions Made: {USER_QUESTIONS}</p>
                <p className="mx-1 mr-6">Posts: {profile?.stats?.totalPosts}</p>
                <p className="mx-1">Followers: {profile?.stats?.totalFollowers}</p>
                <p className="mx-1">Following: {profile?.stats?.totalFollowing}</p>
              </div>
            </div>

            <p className="mb-6">{profile?.bio ? profile?.bio : ""}</p>

            <div className="h-20 flex">
              <div className="w-full">
                <h3>Recent posts</h3>
              </div>
              <div className="w-full flex flex-col items-end">
                <span className="mb-2 flex items-center text-[1.09rem]">
                  Next Reputation milestone: <span className="text-primary ml-1"> 100 $RPN</span>
                </span>
                <button className="rounded-md bg-primary/50 py-2 px-4" disabled>
                  Proof of Reputation not available yet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loadingProfile && !profile && <p>User not found.</p>}
    </AppContainer>
  );
};

export default Profile;
