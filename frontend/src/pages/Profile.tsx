import { useNavigate } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { useAuth } from "../context/AuthContext";

// Define the user structure (adjust if needed)
type User = {
  username: string;
  email: string;
  avatar?: string;
};

export function Profile() {
  const { user, logout } = useAuth() as {
    user: User | null;
    logout: () => void;
  };

  const navigate = useNavigate();

  return (
    <CardContainer className="inter-var">
      <CardBody className="relative bg-black p-10 text-white border border-3 border-white/20 w-auto sm:w-[30rem] h-auto rounded-xl shadow-lg">

        {user?.avatar && (
          <CardItem className="absolute top-7 right-7">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-14 h-14 rounded-full object-cover border-2 border-white"
            />
          </CardItem>
        )}

  <CardItem translateZ={50} className="text-2xl font-bold">
          Profile
        </CardItem>

  <CardItem translateZ={60} className="text-neutral-300 text-sm max-w-sm mt-2">
          Welcome to your Profile!
        </CardItem>

        <div className="mt-8 space-y-2">
          <CardItem translateZ={40} className="text-lg">
            <span className="font-semibold">Username:</span> {user?.username || "N/A"}
          </CardItem>
          <CardItem translateZ={40} className="text-lg">
            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
          </CardItem>
        </div>

        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            translateX={-20}
            as="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl text-xs cursor-pointer font-medium text-white bg-gray-800 hover:bg-gray-700 transition"
          >
            Dashboard
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={20}
            as="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="px-4 py-2 rounded-xl text-xs cursor-pointer font-medium bg-white text-black hover:bg-gray-200 transition"
          >
            Logout
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
