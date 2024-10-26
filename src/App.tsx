import { colors, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { User } from "../@types/User";
import GoogleAuthComponent from "./components/GoogleAuth";
import Navbar from "./components/Navbar";
import CreateParty from "./pages/CreateParty";
import Main from "./pages/Main";
import Parties from "./pages/Parties";

const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: colors.teal["A400"],
    },
    secondary: {
      main: colors.deepOrange["400"],
    },
  },
});

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/signin", element: <GoogleAuthComponent /> },
  { path: "/create", element: <CreateParty /> },
  { path: "/parties", element: <Parties /> },
]);

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({ user: null, setUser: () => {} });

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <RouterProvider router={router} />
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}
