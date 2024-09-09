import LaunchScreen from "@/components/LaunchScreen";
import { useEffect, useState } from "react";
import { useAuth } from "./context/auth";



export default function Index() {
  const { getUserProfile } = useAuth();

  useEffect(() => {
    getUserProfile();
  }, [])

  
  return <LaunchScreen />;
}
