import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Send the full Vimeo URL to the backend
        const response = await axios.post(`https://be-lms-production.up.railway.app/api/v1/generateVideoUrl`, {
          videoUrl, // Send the full URL, not just the ID
        });
        const { link } = response.data;
        setEmbedUrl(link);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [videoUrl]);

  return (
      <>
        <Head>
          <title>{title}</title>
          <script src="https://player.vimeo.com/api/player.js" async></script>
        </Head>
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title={title}
          ></iframe>
        </div>
      </>
  );
};

export default CoursePlayer;

// const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
//   const [embedUrl, setEmbedUrl] = useState("");
//
//   useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         const response = await axios.post(`http://localhost:8000/api/v1/generateVideoUrl`, {
//           videoId: videoUrl,
//         });
//         const { link } = response.data;
//         setEmbedUrl(link);
//       } catch (error) {
//         console.error("Error fetching video:", error);
//       }
//     };
//
//     fetchVideo();
//   }, [videoUrl]);
//
//   return (
//     <>
//       <Head>
//         <title>{title}</title>
//         <script src="https://player.vimeo.com/api/player.js" async></script>
//       </Head>
//       <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
//         <iframe
//           src={embedUrl}
//           frameBorder="0"
//           allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
//           style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
//           title={title}
//         ></iframe>
//       </div>
//     </>
//   );
// };

// const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
//   const PLAYER = "O6QJlty4jEt29mdo";
//   const [videoData, setVideoData] = useState({
//     otp: "",
//     playbackInfo: ""
//   });

//   useEffect(() => {
//     axios
//       .post(`http://localhost:8000/api/v1/getVdoCipherOTP`, {
//         videoId: videoUrl
//       })
//       .then((res: any) => {
//         setVideoData(res.data);
//       });
//   }, [videoUrl]);

//   return (
//     <div className="pt-[56.25%] relative overflow-hidden">
//       {videoData.otp && videoData.playbackInfo !== "" && (
//         <iframe
//           src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=${PLAYER}`}
//           style={{
//             border: "0",
//             width: "100%",
//             height: "100%",
//             position: "absolute",
//             top: 0,
//             left: 0
//           }}
//           allowFullScreen={true}
//           allow="encrypted-media"
//         ></iframe>
//       )}
//     </div>
//   );
// };
