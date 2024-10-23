// import ConnectButton from './components/ConnectButton';
// import { useReadContract } from 'wagmi'
// import USDTAbi  from './abiUSDT.json';

function App() {

  // const USDTAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

  // const {data, error, isLoading} = useReadContract({
  //   abi: USDTAbi,
  //   address: USDTAddress,
  //   functionName: "totalSupply"
  // })


  return (
  
      <section className='bg-[#102A2B] h-screen'>
        {/* <ConnectButton />

        <h1>
          TOTAL SUPPLY: 
          {isLoading ? "Loading..." : error ? `Error: ${error.message}` : data ? `${data}` : "No data"}
        </h1> */}

        <h1 className="text-red-400">TESTE</h1>
      </section> 
  )
}

export default App
