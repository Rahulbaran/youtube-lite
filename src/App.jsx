import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

/* layouts */
import RootLayout from "./layouts/RootLayout";

/* Pages */
import Home, { videosLoader } from "./pages/Home";
import Video, { videoInfoLoader } from "./pages/Video";
import Channel, { channelLoader } from "./pages/Channel";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} loader={videosLoader} />
      <Route
        path="video/:videoId"
        element={<Video />}
        loader={videoInfoLoader}
      />
      <Route
        path="channel/:channelId"
        element={<Channel />}
        loader={channelLoader}
      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
