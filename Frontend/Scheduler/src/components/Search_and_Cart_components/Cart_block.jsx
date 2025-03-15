


function Cart_block() {

    // const items = ["Apple", "Banana", "Cherry"];
    const items = ["CSE 1010", "CSE 2050", "CSE 3150"]

    return (
        <div className="h-[50rem] flex flex-col justify-top items-center bg-green-500 size-full">
            {/* <div className="h-[80%] w-[80%] flex bg-red-500 size-full">
                playtime is over
            </div> */}
            <h1 className="text-5xl m-20">Class List</h1>
            <div className="h-[80%] mt-auto border-2 size-full">
                <ul>
                    {items.map((item, index) => (
                        <li key={index} className="text-3xl border-2 p-4">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
  }
  
  export default Cart_block
  