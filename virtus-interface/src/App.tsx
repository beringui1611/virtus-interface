// import ConnectButton from './components/ConnectButton';
// import { useReadContract } from 'wagmi'
// import USDTAbi  from './abiUSDT.json';
import CardPeople from "./assets/cardstudents.png";
import Square from "./assets/square.png";
import Student from "./assets/student.png";
function App() {

  // const USDTAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

  // const {data, error, isLoading} = useReadContract({
  //   abi: USDTAbi,
  //   address: USDTAddress,
  //   functionName: "totalSupply"
  // })


  return (
  
      <section className='bg-[#102A2B] h-screen'>
         <div className="absolute w-20 h-20 bg-white blur-xl bg-[#138471]"></div>
         <div className="flex justify-between items-center p-5">
            <div className="flex flex-col gap-2">
              <img className="max-w-32 z-10" src={CardPeople} alt="students-photo-card"/>
              <label className="font-primary text-white z-10">+500 Students</label>
            </div>
            
            <button 
            className="
            border-2 rounded-tr-xl rounded-sm 
            text-white p-1 h-10 border-[#38F682]
            shadow-md shadow-[#38f682] font-bold">
              Join Community
            </button>
         </div>

         <article className="mt-20">
            <div className="flex flex-col">
              <h1 className="font-primary text-white text-center w-[250px]">
                GET YOUR PASSPORT 
                RIGHT NOW<p></p>
                & LEARN ENGLISH
              </h1>
              <button className="bg-[#E748D8] rounded-tr-xl rounded-sm ml-5 mt-5 p-1 rounded text-white font-bold w-32">Buy Now</button>
            </div>
            <div className="absolute right-0 w-20 h-20 bg-white blur-xl bg-[#138471]"></div>
              <div>
                 <img className="z-20 absolute bottom-0 left-20" src={Student} alt="student-virtus"/>
                 <img className="absolute z-1 bottom-0" src={Square} alt="buy-nft"/>
              </div>
         </article>
      </section> 
  )
}

export default App
