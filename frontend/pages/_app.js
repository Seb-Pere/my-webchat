import { useState } from "react";
import "tailwindcss/tailwind.css";
import { UserContext } from "../contexts/user";

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div className="h-screen w-screen">
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
}

export default MyApp;