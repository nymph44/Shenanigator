"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebase";
import { useRouter } from "next/navigation";
import Terug from "../components/ui/Terugknop/Terug";
import { db } from "@/app/services/firebase"; // Make sure to export your Firestore instance as `db` from firebase config
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";

function index() {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userLevel = 1;
  // Create a root reference
  const storage = getStorage();
  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (res && res.user) {
        await setDoc(doc(db, "Users", res.user.uid), {
          name: username,
          email: email,
          avatar: avatar,
          userId: res.user.uid,
          level: userLevel,
        });

        setUsername("");
        setEmail("");
        setPassword("");
        setAvatar("");
        router.push("/login");
      }
    } catch (error) {
      console.error("Er is iets fout gegaan", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-base-content">
            <img className="w-full" src="/logo.svg" alt="logo" />
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-base-200 mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-base-content">
                Registreren
              </h3>
              <p className="">Maak een account aan</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-wide">
                  Gebruikersnaam
                </label>
                <input
                  className="input input-bordered w-full"
                  placeholder="Gebruikersnaam"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-wide">
                  Email
                </label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  placeholder="mail@vrijdagonline.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium tracking-wide">
                  Password
                </label>
                <input
                  className="input input-bordered w-full"
                  type="Password"
                  placeholder="Geef een wachtwoord op"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium tracking-wide">
                  Avatar
                </label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSignUp}
                  className="btn btn-primary w-full"
                >
                  Registreren
                </button>
              </div>
              <div>
                <Terug />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
