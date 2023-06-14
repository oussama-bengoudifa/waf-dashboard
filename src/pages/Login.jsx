import React from "react";
import { useNavigate } from "react-router-dom";

//mantine
import { TextInput, PasswordInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";

//hooks
import { useAuth } from "../hooks";

//services
import { loginAdmin } from "../services";

//store
import { useAuthStore } from "../store";

export const Login = () => {
  const token = useAuth();

  const { loginUser } = useAuthStore((state) => ({
    loginUser: state.loginUser,
  }));

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);

  //form
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value === ""
          ? "Password required"
          : value.length < 4
          ? "Password must be minimum 6 characters"
          : null,
    },
  });

  const signin = async (values) => {
    setLoading(true);
    const response = await loginAdmin(values);
    if (!response) {
      form.setFieldError("email", "wrong credentials");
    }
    loginUser(response.refresh_token, response.access_token);
    setLoading(false);
    navigate("/dashboard");
  };

  React.useEffect(() => {
    if (token !== null) {
      if (token === "expired") {
        setPageLoading(false);
      } else {
        navigate("/dashboard");
      }
    }
  }, [token]);

  if (pageLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader variant="dots" color="#2A564E" />
      </div>
    );

  return (
    <div className="w-full h-screen">
      <div className="flex h-full">
        <div className="md:flex hidden flex-1 h-full bg-primary">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-1 justify-center w-full items-center">
              <img
                src="/svg/waf_white.svg"
                alt="vittlo"
                className="w-52 h-52 object-contain"
              />
            </div>
            <div className="flex justify-center items-center py-6">
              <span className="text-sm text-white">Copyright © 2023 WAF</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 h-full w-full">
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col">
              <img
                src="/svg/waf.svg"
                alt="Vittlo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-mulish text-xl font-bold text-[#3F3D56] mt-5">
                Dashboard admin
              </span>
              <form
                onSubmit={form.onSubmit((values) => signin(values))}
                className="flex flex-col gap-3 min-w-[350px] mt-12"
              >
                <TextInput
                  label="Email"
                  placeholder="Please enter your email"
                  size="xs"
                  withAsterisk
                  {...form.getInputProps("email")}
                  sx={{
                    input: {
                      fontSize: "12px",
                      height: "36px",
                      fontFamily: "Mulish, sans-serif",
                      border: "1px solid #D8D8D8",
                      background: "#F8F8F8",
                      borderRadius: "4px",
                    },
                  }}
                />
                <PasswordInput
                  placeholder="Enter password"
                  label="Password"
                  withAsterisk
                  {...form.getInputProps("password")}
                  className="password-input"
                  sx={{
                    label: {
                      fontSize: "12px",
                    },
                  }}
                />
                <button
                  type="submit"
                  className="w-full rounded-[4px] bg-primary mt-4 duration-300 hover:bg-primaryDark text-white text-sm flex justify-center items-center h-10"
                >
                  {loading ? "Loading ..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
