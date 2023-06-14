import { LuLayoutDashboard } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store";

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ active }) => {
  const { logoutUser } = useAuthStore((state) => ({
    logoutUser: state.logoutUser,
  }));
  const navigate = useNavigate();

  const logoutAccount = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="h-full font-mulish bg-[#F2F2F2]">
      <div className="flex flex-col h-full">
        <div className="flex justify-center items-center p-8">
          <Link to="/dashboard">
            <div className="flex flex-col gap-1 items-center">
              <img
                src="/svg/waf.svg"
                alt="waf"
                className="md:w-28 w-18 h-10 object-contain"
              />
              <span className="text-primary font-semibold">WAF</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-8 pt-12">
          <Link to="/dashboard">
            <div className="flex  relative justify-center items-center">
              {active === "dashboard" && (
                <div className=" absolute left-0">
                  <div
                    style={{
                      borderRadius: "0px 4px 4px 0px",
                    }}
                    className="md:w-2 w-1 h-6 bg-primary"
                  ></div>
                </div>
              )}
              <div className="flex cursor-pointer items-center gap-3">
                <LuLayoutDashboard
                  color={active === "dashboard" ? "#2A564E" : "#808080"}
                  size={20}
                />
                <span
                  className={`${
                    active === "dashboard" ? "text-[#2A564E]" : "text-[#808080]"
                  } font-medium text-sm md:block hidden`}
                >
                  Dashboard
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="h-full flex flex-col items-center justify-around">
          <div
            onClick={logoutAccount}
            className="flex cursor-pointer items-center gap-3"
          >
            <FiLogOut color={"#E5004B"} size={20} />
            <span
              className={`${"text-[#E5004B]"} font-medium text-sm md:block hidden`}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
