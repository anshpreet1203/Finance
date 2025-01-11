import React from "react";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { toast } from "react-toastify";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User Created");
            setLoading(false);
            setConfirmPassword("");
            setName("");
            setEmail("");
            setPassword("");
            createDoc(user);

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password dont't match");
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;

    const useRef = doc(db, "users", user.uid);
    const userData = await getDoc(useRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created !");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("Doc already exists!");
      setLoading(false);
    }
  }

  function googleAuth() {
    try {
      setLoading(true);
      console.log("clicked");
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          createDoc(user);
          navigate("/dashboard");
          setLoading(false);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })

        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          setLoading(false);
          // ...
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <>
          <div className="w-[40%] h-auto p-6 rounded-2xl shadow-custom ">
            <h2 className="text-center text-2xl font-semibold">Login</h2>

            <Input
              type="text"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"ansh@example.com"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Ansh123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading... " : "Login Using Email and Password"}
              OnClick={loginUsingEmail}
            />
            <p className="text-center">Or</p>
            <Button
              OnClick={googleAuth}
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
              disabled={loading}
            />
            <p
              className="text-center cursor-pointer"
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account? CLick Here{" "}
            </p>
          </div>
        </>
      ) : (
        <div className="w-[40%] h-auto p-6 rounded-2xl shadow-custom ">
          <h2 className="text-center text-2xl font-semibold">Sign Up</h2>
          <Input
            type="text"
            label={"First Name"}
            state={name}
            setState={setName}
            placeholder={"Ansh"}
          />

          <Input
            type="text"
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"ansh@example.com"}
          />

          <Input
            type="password"
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"Ansh123"}
          />

          <Input
            type="password"
            label={"Confirm Password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"Ansh123"}
          />

          <Button
            disabled={loading}
            text={loading ? "Loading... " : "Signup Using Email and Password"}
            OnClick={signupWithEmail}
          />
          <p className="text-center">Or</p>
          <Button
            OnClick={googleAuth}
            text={loading ? "Loading..." : "Signup Using Google"}
            blue={true}
          />
          <p
            className="text-center cursor-pointer"
            onClick={() => setLoginForm(!loginForm)}
          >
            Or Have An Account? CLick Here
          </p>
        </div>
      )}
    </>
  );
};

export default Signin;
