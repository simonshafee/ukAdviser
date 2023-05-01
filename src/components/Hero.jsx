const Hero = () => {
  return (
    <div className="flex  h-screen items-center justify-center bg-gray-200 ">
      <div
        className=" bg-gray-900 w-3/12 h-full p-2
       rounded-sm flex justify-center  items-start   "
      >
        <button
          className=" text-white  h-[10%] w-full
         justify-center items-center flex  border-spacing-1 
          border border-white rounded-md  mt-14 "
        >
          + New chat
        </button>
        <div></div>
      </div>

      <div
        className=" bg-gray-800  w-8/12  h-full  rounded-sm
       flex flex-col justify-center  items-center
      "
      >
        <div>
          <h1 className=" text-white text-2xl mt-16 w-full h-2/6  ">
            My Advisor
          </h1>
        </div>
        <div className="  w-4/5 rounded-md mt-5  h-full flex justify-center items-center  bg-slate-600
          
        "></div>
        <div className=" text-white rounded-md  w-full h-1/6 flex justify-center items-center ">
        <div className="w-10/12 rounded-md flex justify-center items-center">

          <input type="text"  className=" w-4/6 h-[40px] rounded-md"/>
            <button className=" bg-red-500 rounded-md w-1/6 h-[40px]">Sub</button>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
