import Body from "./Components/Body";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { profileDefault, topTracksDefault } from "./Utils/DefaultVariables";
import { post2MongoDB } from "./Utils/MongoDB/addUserData";
import { spotifyCode2Token } from "./Utils/SpotifyAPIs/code2Token";
import { getProfile } from "./Utils/SpotifyAPIs/getProfile";
import { getTopTracks } from "./Utils/SpotifyAPIs/getTopTracks";

// export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let currentSpotifyCode = searchParams?.code ?? "";
  let latitude = searchParams?.latitude ?? "";
  let longitude = searchParams?.longitude ?? "";
  let location = {
    type: "Point",
    coordinates: [Number(longitude), Number(latitude)],
  };

  let topTracks = topTracksDefault;
  let profile = profileDefault;

  if (currentSpotifyCode) {
    try {
      const authorizationInfo = await spotifyCode2Token(currentSpotifyCode);
      const spotifyToken = authorizationInfo.access_token;

      if (spotifyToken) {
        // Use Promise.all to synchronize getTopTracks and getProfile
        [topTracks, profile] = await Promise.all([
          getTopTracks(spotifyToken),
          getProfile(spotifyToken),
        ]);
        if (
          authorizationInfo &&
          topTracks &&
          profile &&
          latitude &&
          longitude
        ) {
          post2MongoDB(authorizationInfo, topTracks, profile, location);
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
  //   console.log("topTracks :>> ", topTracks.items[0]);

  return (
    <main
      className="flex min-h-screen flex-col 
        items-center justify-normal   
        bg-gradient-to-t from-slate-600 via-slate-300  
        background-animate "
    >
      <Header currentUser={profile.display_name}></Header>
      <Body></Body>
      <Footer></Footer>
    </main>
  );
}
