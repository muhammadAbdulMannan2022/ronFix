
import React from 'react';
import { useGetLoggedUserQuery } from '../../redux/features/baseApi';

const Video = () => {
  const { data: loggedInUser, isLoading } = useGetLoggedUserQuery();
  const hasSubscription = loggedInUser?.subscription_plan;

  const videoUrl = loggedInUser && hasSubscription
    ? "https://www.youtube.com/embed/LWHixRchlYc?si=9AeuHvP1C_C5MEAj"
    : "https://www.youtube.com/embed/q4cFBVU0r7Q?si=ztT5O7d5lnFZantP";

  return (
    <section className="md:pt-20 pt-6 md:px-4 border-none md:pb-10 pb-6 px-2 bg-[#E0F7FF] dark:bg-[#E0F7FF] ">
      <div className="max-w-6xl mx-auto">
        <div className="w-full mx-auto aspect-video relative group">
         <iframe
            className="md:w-[1150px] md:rounded-r-[50px] md:rounded-bl-[50px] rounded-r-[20px] rounded-bl-[20px] rounded-tl-lg md:h-[630px] w-full h-[250px] rounded relative z-10 border-4 border-[#9AEFFF] shadow-lg"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
