"use client"
import { useContext, useEffect } from "react"
import { DataContext } from "@/data/Data";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ClassCard from "../assets/classcard";
import LoadingClassCard from "../assets/loadingClassCard";
import LeadClassCard from "../assets/leadClassCard";
import SearchIcon from "@/app/Icons/Icons";

export default function RightSide({leadClass, loadingSearch}) {
  const { SearchBlockStates } = useContext(DataContext);

  useEffect(() => {
  }, [SearchBlockStates.searchBlockResults, leadClass])
  

  return (
    <SkeletonTheme  baseColor="#cccccc" highlightColor="#ffffff">
      <div className="relative p-2 overflow-y-scroll mt-6 ">

      {loadingSearch ? null : (

        (SearchBlockStates.searchBlockResults["status"] ?? 500) === 0 ? 
          <SearchIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-Highlight opacity-15" color="#656565"></SearchIcon>


          : (SearchBlockStates.searchBlockResults["status"] ?? 500) === 350 ? 
          
          <div className="w-full flex-col flex items-center justify-center">
            <h2>No classes returned</h2>
            <h2>(Possible classes not ready)</h2>
          </div>          
        
        :  (SearchBlockStates.searchBlockResults["status"] ?? 500) > 200 ? 
        
          <div className="w-full flex items-center justify-center">
            <h2>Error</h2>
          </div>        
        
        :(
          <>
            {leadClass === null ? null : (
              SearchBlockStates.searchBlockResults["value"][leadClass] !== undefined ? (
                <LeadClassCard element={SearchBlockStates.searchBlockResults["value"][leadClass]} />
              ) : (
                <div className="w-full flex items-center justify-center">
                    <h2>{leadClass} not found</h2>
                </div>
              )
            )}

            {Object.keys(SearchBlockStates.searchBlockResults["value"]).length > 0 &&
              Object.values(SearchBlockStates.searchBlockResults["value"]).map((ResultElement, index) => {
                return <ClassCard key={index} element={ResultElement} />;
              })}
          </>
        )
      )}

        { loadingSearch ? 
        <>
          <LoadingClassCard/>
          <LoadingClassCard/>
          <LoadingClassCard/>
          <LoadingClassCard/>
          <LoadingClassCard/>
          <LoadingClassCard/>
          <LoadingClassCard/>
        </> : null
        }



      </div>
    </SkeletonTheme>
  )
}

