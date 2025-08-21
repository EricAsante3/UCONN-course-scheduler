import { useContext } from "react";
import { DataContext } from "@/data/Data";
import { useCounter } from "@/customHooks/loadCounter";

export default function Loader() {
    const number = useCounter(45000, 100); // hook must be here
  return (
    <div className="text-3xl">{number}% est 45 Seconds or less</div>
  )}