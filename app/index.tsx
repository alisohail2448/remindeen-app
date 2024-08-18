import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import LaunchScreen from "@/components/LaunchScreen";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "@/services/profile";

export default function Index() {
  return <LaunchScreen />;
}
