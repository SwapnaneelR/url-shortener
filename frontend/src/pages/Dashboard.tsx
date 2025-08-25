import api from '@/lib/api';
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Define the expected shape of each URL item
type UrlItem = {
  full_url: string;
  short_url: string;
};

const Dashboard = () => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get('/api/dashboard')
      .then((response) => {
        setUrls(response.data.data); // Make sure your backend returns { data: UrlItem[] }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="p-6 text-white">
      {user ? (
        <h1 className="text-5xl font-semibold my-10">
          {user.username}'s URLs History
        </h1>
      ) : (
        <p className="text-5xl font-semibold my-10">
          Login to Visit your dashboard
        </p>
      )}
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <ul className="space-y-6 p-5">
          {urls.map((item, index) => (
            <li
              key={index}
              className="bg-transparent max-w-3xl p-6 ml-8 items-center rounded-full border border-w/80 shadow-md"
            >
              <p>
                <strong>Long URL:</strong>{" "}
                <a
                  href={item.full_url}
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
                  href={`https://shorturl-rust-xi.vercel.app/${item.short_url}`}
                  className="text-green-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`https://shorturl-rust-xi.vercel.app/${item.short_url}`}
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
