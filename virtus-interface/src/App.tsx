import { useEffect, useState } from "react";
import CardPeople from "./assets/cardstudents.png";
import Square from "./assets/square.png";
import Student from "./assets/student.png";
import NFTasset from './assets/nftasset.webp';
import Certified from './assets/certified.png';
import Usdt from './assets/usdt.png';
import { Link } from 'react-scroll';
import {useAccount, useWriteContract, useReadContract} from "wagmi";
import { ethers } from "ethers";
import abiusdt from './abi/abiusdt.json';
import abinft from './abi/abinft.json';

const CONTRACT_USDT="0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const CONTRACT_NFT ="0x6cE23464D98A0Cb7ff15ba7954885aDb3b075BD1";

function useNextTokenId() {
  const result = useReadContract({
    abi: abinft,
    address: CONTRACT_NFT,
    functionName: 'totalSupply'
  });
  return result.data;
}

function App() {
  const [studentCount, setStudentCount] = useState(0);
  const [liquidity, setLiquidity] = useState<string>("0");
  const [nftCount, setNftCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const {address, isConnected } = useAccount();
  const fullText = "GET YOUR PASSPORT RIGHT NOW & LEARN ENGLISH";
    
  const {writeContract} = useWriteContract();
  const nextTokenId = useNextTokenId();

  const handleApprove = async () => {
    try {
        writeContract({
          address: CONTRACT_USDT,
          abi: abiusdt,
          functionName: 'approve',
          args:[CONTRACT_NFT, ethers.parseUnits("50", 6)]
        });
    }catch(err){
      return err;
    }
  }

  const handleBuy = async () => {
    try {
        writeContract({
          address: CONTRACT_NFT,
          abi: abinft,
          functionName: 'buy',
          args: [address, ethers.parseUnits("50", 6)]
        })
      }
    catch(err){
      console.log(err)
      return err;
    }
  }
 
  useEffect(() => {
    if (nextTokenId !== undefined) {
      const totalStudents = Number(nextTokenId);
      const totalLiquidity = totalStudents * 50;
      const totalNft = totalStudents;
      const totalUsers = totalStudents;

      const countUp = (setter: (value:number) => void, target:number, duration:number) => {
        let start = 0;
        const step = Math.ceil(target / (duration / 50));
        const timer = setInterval(() => {
          if (start < target) {
            start += step;
            if (start > target) start = target;
            setter(start);
          } else {
            clearInterval(timer);
          }
        }, 50);
      };

      countUp(setStudentCount, totalStudents, 2000);
      countUp(setUserCount, totalUsers, 2000);
      countUp(setNftCount, totalNft, 2000);

      const format = (value:number) => {
        if (value >= 1_000_000) {
          return `${value / 1_000_000}M`;
        } else if (value >= 1_000) {
          return `${value / 1_000} K`;
        } else {
          return `${value}$`;
        }
      };

      countUp((value) => setLiquidity(String(format(value))), totalLiquidity, 3000);
    }
  }, [nextTokenId]);


  return (
    <section className='bg-[#102A2B] h-auto'>
      <div className="absolute w-20 h-20 blur-xl bg-[#138471]"></div>
      <div className="flex justify-between items-center p-5 lg:p-10">
        <div className="flex flex-col gap-2">
          <img className="max-w-32 z-10" src={CardPeople} alt="students-photo-card" />
          <label className="font-primary text-white z-10">{studentCount} Students</label>
        </div>

        <a href="https://virtuscoin.org"
          className="
            border-2 rounded-tr-xl rounded-sm text-sm
            text-white p-1 h-10 border-[#38F682]
            shadow-md shadow-[#38f682] font-bold">
          Visit our website
        </a>
      </div>

      <article className="mt-10 lg:flex">
        <div className="flex flex-col p-2">
          <h1 className="font-primary text-white text-2xl text-center w-auto lg:w-[700px] lg:text-4xl">
            {fullText}
          </h1>
          <p className="lg:w-6/12 lg:ml-10 text-white mt-2 lg:text-xl">
          With our exclusive NFT, you'll not only master English, but also gain access to an immersive experience that will take you into a vast ecosystem in the metaverse. Here, you can interact with other users, participate in educational events, and even make real-world purchases using your tokens. Furthermore, our virtual environment provides networking opportunities and collaborative learning, allowing you to practice 
          your language skills in a practical and enjoyable way – all in one place!
          </p>
          <Link to="section-buy" smooth={true} duration={800} className="bg-[#E748D8] rounded-tr-xl rounded-sm ml-5 lg:ml-20 flex items-center justify-center mt-5 p-1 
              text-white font-bold w-32">
            Buy Now
          </Link>
        </div>
        <div className="absolute top-72 right-0 w-20 h-20 blur-xl bg-[#138471]"></div>
        <div className="h-[550px] lg:h-[700px] md:h-[700px]">
          <img className="mt-[80px] z-10 absolute lg:w-[600px] lg:right-0 lg:mt-[150px] md:h-[600px]" src={Student} alt="student-virtus" />
          <img className="absolute lg:right-0 lg:w-[900px] lg:mt-44" src={Square} />
        </div>
      </article>

      <article>
        <div className="flex items-center p-2 justify-center font-primary lg:mt-56 lg:gap-20 md:mt-56">
          <div className="flex flex-col items-center">
            <h4 className="text-xl text-white lg:text-3xl">{liquidity}</h4>
            <label className="text-[12px] text-[#38F682]">Liquidity</label>
          </div>
          <hr className="border-[#38F682] rotate-90 w-10"></hr>
          <div className="flex flex-col items-center">
            <h4 className="text-xl text-white lg:text-3xl">{nftCount}</h4>
            <label className="text-[12px] text-[#38F682]">NFT's Mintable</label>
          </div>
          <hr className="border-[#38F682] rotate-90 w-10"></hr>
          <div className="flex flex-col items-center">
            <h4 className="text-xl text-white lg:text-3xl">{userCount}</h4>
            <label className="text-[12px] text-[#38F682]">Total Users</label>
          </div>
        </div>

        <div id="section-buy" className="flex flex-col justify-center items-center mt-20">
          <img className="w-10/12 lg:w-[500px]" src={NFTasset} alt="NFT asset" />
          <div className="grid grid-cols-2 gap-10 items-center">
            <div>
              <label className="text-white font-bold">Current Price</label>
              <p className="font-primary text-white flex items-center gap-2">
                50 USDT 
                <img className="w-7" src={Usdt} alt="usdt-coin" />
              </p>
            </div>
            {isConnected ? (
               <div className="flex flex-col mt-10 gap-2">
                  <button onClick={handleApprove} className="bg-[#E748D8] rounded-tr-xl rounded-sm p-2 text-white font-bold w-32">Approve</button>
                  <button onClick={handleBuy} className="bg-[#E748D8] rounded-tr-xl rounded-sm p-2 text-white font-bold w-32">Buy Now</button>
               </div>
            ) : (
              <w3m-button/>
            )}
          </div>

          <article className="w-10/12 border-2 h-auto mt-20 rounded-xl border-[#38f682]">
            <div className="flex flex-col items-center mt-10 p-2">
              <h3 className="font-primary text-2xl text-white">
                Virtus Citizen #1
              </h3>
              <p><span className="font-bold text-[#38F682]">owned by </span><span className="font-bold text-[#E748D8]">on virtus</span></p>
              <p className="text-white mt-8 lg:w-6/12 lg:text-center">
                With our exclusive NFT, you'll master English while exploring a vast 
                ecosystem in the metaverse, where you can even make real-world purchases – 
                all in one place!
              </p>

              <a href="https://virtuscoin.org" className="bg-[#E748D8] mt-20 p-2 rounded-md w-32 flex 
                  items-center justify-center text-white font-primary">
                Learn more
              </a>
            </div>
          </article>
        </div>
      </article>

      <article className="h-auto md:flex md:justify-center">
         <div className=" p-5 mt-10">
          <h3 className="text-[#38F682] font-primary text-xl">COMMUNITY DRIVEN</h3>
          <p className="font-semibold text-white flex">
            Our smart contract was developed by Next Chain, check out our code in the github repository 
          </p>
          <a className="underline text-blue-600 font-bold text-md" href="https://github.com/nxchaindotlink/virtush-contract">
            NextChain github
          </a>
           <img className="rounded-xl mt-10"  src={Certified} alt="nxchain.link"/>
           <a href="https://nxchain.link" className="text-white flex underline flex-col font-bold">Verify certification on Next Chain WebSite<span>Code: 10001</span></a>
         </div>
      </article>
    </section>
  );
}

export default App;
