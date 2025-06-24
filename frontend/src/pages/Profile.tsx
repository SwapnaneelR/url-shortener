import { useNavigate } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card.tsx";
import { useAuth } from "../context/AuthContext.tsx";

export function Profile() {
  const { user , logout} = useAuth();
  const navigate = useNavigate();

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-black p-6 text-white border border-3 border-white/20 w-auto sm:w-[30rem] h-auto rounded-xl p-6 shadow-lg">
        <CardItem translateZ="50" className="text-2xl font-bold">
          Profile
        </CardItem>

        <CardItem translateZ="60" className="text-neutral-300 text-sm max-w-sm mt-2">
          Welcome to your Profile!
        </CardItem>

        <div className="mt-8 space-y-2">
          <CardItem translateZ="40" className="text-base">
            <span className="font-semibold">Username:</span> {user?.username || "N/A"}
          </CardItem>
          <CardItem translateZ="40" className="text-base">
            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
          </CardItem>
        </div>

        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            translateX={-
                20}
            as="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-gray-800 hover:bg-gray-700 transition"
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
            className="px-4 py-2 rounded-xl text-xs font-medium bg-white text-black hover:bg-gray-200 transition"
          >
            Logout
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
