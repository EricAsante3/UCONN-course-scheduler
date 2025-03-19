import Schedule_card from './Schedule_components/Nav_bar/schedule_card'


function Schedule_block() {

    return (

      <div className="p-[2rem] w-full  bg-blue-500 space-x-4 items-center justify-center"> 
      


        <div className="p-[1rem] bg-green-800 flex flex-col items-center relative overflow-auto divide-black border-4 border-black w-full h-96">
          <h1>Possible Schedules:</h1>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>

            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>
            <Schedule_card></Schedule_card>

        </div>
      
      </div>
    )
  }
  
  export default Schedule_block
  