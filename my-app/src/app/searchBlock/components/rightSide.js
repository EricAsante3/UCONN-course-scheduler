"use client"
import { useContext, useEffect } from "react"
import { DataContext } from "@/data/Data";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ClassCard from "../assets/classcard";
import LoadingClassCard from "../assets/loadingClassCard";
import LeadClassCard from "../assets/leadClassCard";

export default function RightSide({leadClass, loadingSearch}) {
  const { SearchBlockStates } = useContext(DataContext);

  useEffect(() => {
    console.log(SearchBlockStates.searchBlockResults.status)
  }, [SearchBlockStates.searchBlockResults, leadClass])
  

  return (
    <SkeletonTheme  baseColor="var(--color-Highlight)" highlightColor="#E4002B">
      <div className="p-2 overflow-y-scroll">

      {loadingSearch ? null : (

        (SearchBlockStates.searchBlockResults["status"] ?? 500) === 0 ? <div>Home ICon</div>


          : (SearchBlockStates.searchBlockResults["status"] ?? 500) === 350 ? <div>no results</div> 
        
        
        :  (SearchBlockStates.searchBlockResults["status"] ?? 500) > 200 ? 
        
        <div>Error</div>        
        
        
        :(
          <>
            {leadClass === null ? null : (
              SearchBlockStates.searchBlockResults["message"][leadClass] !== undefined ? (
                <LeadClassCard element={SearchBlockStates.searchBlockResults["message"][leadClass]} />
              ) : (
                <div>{leadClass} not found</div>
              )
            )}

            {Object.keys(SearchBlockStates.searchBlockResults["message"]).length > 0 &&
              Object.values(SearchBlockStates.searchBlockResults["message"]).map((ResultElement, index) => {
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

