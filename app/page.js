"use client";

import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";

import axios from "axios";

export default function Home() {
  const router = useRouter();

  const { user, isWearableConnected, loading, authenticated, signOut } =
    useUser();

  useEffect(() => {
    async function linkWearable() {
      console.log(loading, isWearableConnected);
      if (loading) return;
      if (isWearableConnected) return;

      const { data, error } = await axios.get("/auth/link");

      if (error) {
        return console.log(error);
      }

      console.log(data);
    }

    linkWearable();
  }, [isWearableConnected, loading]);

  return (
    <main>
      <div>
        <h1>Welcome to GlucoBuddy</h1>

        {loading ? (
          <p>Loading..</p>
        ) : authenticated ? (
          <>
            <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
            <Button onClick={signOut}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
        )}
      </div>
    </main>
  );
}
