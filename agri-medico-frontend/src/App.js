
// material ui setup 
import { createTheme } from "@mui/material/styles"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import RootLayout from "./scens/RootLayout";
import Welcome from "./components/Welcome";
import FetchState from "./context/fetch/FetchState";
import Result from "./components/Result";
import HistoryResult from "./components/HistoryResult";
import AboutUs from "./components/AboutUs";
import Loading from "./components/Loading";
import DummyResult from "./components/DummyResult";

// router setup 



function App() {
  // demo commit
  // setting up theme 
  const mode = useSelector((state) => state.currMode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // settingup the router 
  const router = createBrowserRouter(createRoutesFromElements(
    <Route exact path="/" element={<RootLayout />}>
      <Route index element={<Welcome />} />
      <Route exact path="/result/:userHistoryId/:searchHistoryId" element={<Result />} />
      <Route exact path="/aboutus" element={<AboutUs />} />
      <Route exact path="/result" element={<DummyResult />} />
      <Route exact path="/loading" element={<Loading />} />
    </Route>
  ))
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FetchState>
          <RouterProvider router={router} />
        </FetchState>
      </ThemeProvider>
    </>
  );
}

export default App;
