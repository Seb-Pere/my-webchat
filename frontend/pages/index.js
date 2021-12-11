import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { useRouter } from "next/router";

export default function Home() {
  const { username, setUsername } = useContext(UserContext);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const check = () => {
    if (username === "") {
      setError(true);
    } else {
      router.push("/dashbord");
    }
  };

  return (
    <div className="space-y-10 w-full h-full flex flex-col justify-center items-center">
      <h1 className="font-light text-4xl">Choose your username</h1>
      <div className="">
        <div className="space-x-6">
          <input
            placeholder="Username"
            className="w-48 h-8 rounded-full pl-3 font-light focus:outline-none bg-gray-100"
            value={username}
            onChange={handleChange}
          />
          <button
            className="w-16 h-8 bg-gray-200 rounded-lg font-semibold text-lg text-gray-500"
            onClick={check}
          >
            Enter
          </button>
        </div>

        {error && (
          <div className="w-72 h-8 mt-3 ml-2">
            <p className="text-red-800 font-light">Username is resuired</p>
          </div>
        )}
      </div>
    </div>
  );
}