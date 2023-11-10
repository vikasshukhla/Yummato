import React, { useState, useEffect } from "react";
import "./Authentication.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import GoogleSignButton from "../../images/google-signin-button.png";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const toogleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  //Base URL
  const baseUrl =
    process.env.REACT_APP_BASEURL || "http://localhost:8000/api/v1";

  useEffect(() => {
    localStorage.clear();
  }, []);

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:8000/api/v1/auth/user", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated", err);
        navigate("/login/error");
      });

    if (response && response.data) {
      localStorage.setItem("login", true);
      localStorage.setItem("data", JSON.stringify(response.data));
      navigate("/");
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer = null;
    const googleLoginURL = "http://localhost:8000/api/v1/auth/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  const isUserAuth = async () => {
    const response = await axios
      .get(`${baseUrl}/isUserAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        console.log(`Something went wrong- ${err}`);
        toast.error(
          err?.response?.data?.error || "Something Went Wrong! Please Try again"
        );
      });

    if (response && response.data.auth) {
      toast.success("Login Successfully");
      localStorage.setItem("data", JSON.stringify(response.data.profileData));
      localStorage.setItem("login", true);
      navigate("/");
    } else {
      toast.error(
        response.data.message || "Something Went Wrong! Please Try again"
      );
    }
  };

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post(`${baseUrl}/login`, { email: email, password: password })
        .then((res) => {
          console.log(res);
          if (!res.data.auth) {
            console.log(res.data.error);
            toast.error(
              res.data.error ||
                "Something Went Wrong! Please Try again"
            );
          }
          localStorage.setItem("token", res.data.token);
          isUserAuth();
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            err?.response?.data?.errorMessage ||
              "Something Went Wrong! Please Try again"
          );
        });
    }
  };

  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter Email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  const ForgotPassword = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please enter your email");
      return;
    }

    axios
      .patch(`${baseUrl}/forgot-password`, { email: email })
      .then((res) => {
        toast.success("Password reset link sent to your email");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.error || "Something Went Wrong! Please Try again"
        );
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="text-center mt-4 name">Login User</div>
        <form className="p-3 mt-3" onSubmit={ProceedLogin}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "password" : "text"}
              name="password"
              id="pwd"
              placeholder="Password"
            />
            {!showPassword ? (
              <div className="m-2" onClick={toogleShowPassword}>
                <AiOutlineEye />
              </div>
            ) : (
              <div className="m-2" onClick={toogleShowPassword}>
                <AiOutlineEyeInvisible />
              </div>
            )}
          </div>
          <button className="btn mt-3 signInBtn">Login</button>
        </form>
        <div className="d-flex justify-content-around">
          <Link to="/register">Sign up</Link>
          <button
            type="button"
            className="border-0"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Forgot Password?
          </button>
        </div>
        <div className="d-flex justify-content-center m-3">
          ----------- OR -------------
        </div>
        <div className="hover-zoom">
          <img
            className="w-100 rounded-pill signInBtn"
            src={GoogleSignButton}
            alt="Sign In with Google"
            onClick={redirectToGoogleSSO}
          />
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Forgot Password
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form className="p-3 mt-3" onSubmit={ProceedLogin}>
                <div className="d-flex align-items-center gap-3">
                  <span className="far fa-user">Email :</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    required={true}
                    className="p-2"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={ForgotPassword}
                type="button"
                class="btn btn-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
