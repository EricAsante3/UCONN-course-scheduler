import { useContext } from "react";
import { DataContext } from "@/data/Data";
import { useCounter } from "@/customHooks/loadCounter";

export default function Loader() {
    const number = useCounter(45000, 100); // hook must be here

  return (
    <div className="text-black text-3xl flex items-center justify-center flex-col bg-white h-32">
      
      <h1>{number}%</h1>
      <h1>Approximately 45 seconds or less</h1>


    </div>
  )}