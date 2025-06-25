import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const { user } = useAuth(); // Assuming you have a user context to get the current user
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard", {
        withCredentials: true,
      })
      .then((response) => {
        setUrls(response.data.data); // assuming response.data is an array of { longUrl, shortUrl }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-5xl font-semibold my-10">
        {user?.username}'s URLs History
      </h1>
      {urls.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ul className="space-y-6 p-5">
          {urls.map((item, index) => (
            <li
              key={index}
              className="bg-transparent max-w-3xl p-5 ml-8 items-center p-6 rounded-full border border-w/80 shadow-md"
            >
              <p>
                <strong>Long URL:</strong>{" "}
                <a
                  href={item?.full_url}
                  className="text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.full_url}
                </a>
              </p>
              <p className="mt-2">
                <strong>Short URL:</strong>{" "}
                <a
                  href={"http://localhost:5000/" + item?.short_url}
                  className="text-green-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"http://localhost:5000/" + item.short_url}
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
