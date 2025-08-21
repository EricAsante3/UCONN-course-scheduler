export default function FullViewClassCard({classData}) {
        console.log(classData)

  return (
        <div className="w-full h-24 bg-amber-300 p-2"> 
        
            <div className="bg-amber-600 h-3/6 w-full rounded-full flex items-center justify-evenly">
                <h1 className="text-2xl w-28 text-center">{classData.className}</h1>
                <button className="aspect-square w-10 bg-blue-500"></button>
            </div>

            <div className="mr-2 ml-2 flex flex-row justify-between">
                <p>Seats: {classData.seats}</p>
                <p>Registration #: {classData.crn}</p>
            </div>
            
            <p className="ml-2 w-[252px] truncate">Prof: {classData.Prof}</p>
                
            

        
        
        </div>

  )}