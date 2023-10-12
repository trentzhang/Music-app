"use client";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { AnimatePresence, Variants, motion, useAnimation } from "framer-motion";
import { createContext, useState } from "react";
import { useUserContext } from "../SelectedUserContext";
import { SpotifyCard } from "./TrackCard";

export const currentlyPlayingContext = createContext<any>(undefined);

export default function MusicComponent({
  loggedInUserTopTracks,
}: {
  loggedInUserTopTracks: TopTracks;
}) {
  const { selectedUser, setSelectedUser } = useUserContext();
  const topTracks = selectedUser?.topTracks || loggedInUserTopTracks;

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  // alternative to call user api each time user is selected, but it's slower than getting all nearby users at once
  //   const fetcher = (url: string) =>
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setTopTracks(res[0].topTracks);
  //         return res[0].topTracks;
  //       });

  //   const { data, error } = useSWR<TopTracks>(
  //     "/api/get/user/topsongs?id=" + selectedUser?._id,
  //     fetcher
  //   );
  //   const [topTracks, setTopTracks] = useState([]);

  const MyCard = (
    <Card className="m-5 min-h-[40em] max-h-[calc(100vh-200px)] bg-gradient-to-b from-blue-600 to-sky-600">
      <CardBody>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
          Top 50 Songs
        </h1>

        <ScrollShadow hideScrollBar className="w-full h-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {topTracks?.items?.map((topTrack) => (
              <SpotifyCard topTrack={topTrack} key={topTrack.id}></SpotifyCard>
            ))}
          </div>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
  const NothingHereCard = (
    <Card className="m-5 min-h-[40em] max-h-[calc(100vh-200px)] bg-gradient-to-b from-blue-600 to-sky-600">
      <CardBody className="flex items-center justify-evenly">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
          Connect to Spotify to upload your music
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
          Select a user to see their top tracks
        </h1>
      </CardBody>
    </Card>
  );

  const [isToggled, setIsToggled] = useState(false);
  const controls = useAnimation();

  const handleTap = async () => {
    setIsToggled(!isToggled);

    // Animate to the desired y position based on the toggle state
    await controls.start({
      y: isToggled ? 0 : "-45%",
      x: 0,
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div animate={controls} onTap={handleTap} key={selectedUser?._id}>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          //   transition={{ duration: 0.2 }}
        >
          <currentlyPlayingContext.Provider
            value={{ currentlyPlaying, setCurrentlyPlaying }}
          >
            {topTracks ? MyCard : null}
          </currentlyPlayingContext.Provider>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
