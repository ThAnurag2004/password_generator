import { useState, useCallback, useEffect, useRef } from "react"
function App() {
  const [length ,setlength] = useState(6);
  const [number, setnumber] = useState(true);
  const [character, setcharacter] = useState(true);
  const [password, setpassword] = useState("");
  const passwordCopy = useRef(null);
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number) str += "0123456"
    if(character) str += "~`@!#$&*\/><?"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length +1 );
      pass += str.charAt(char); 
    }
    setpassword(pass)

  } , [length, number, character, setpassword])

  const passwordCopytoClipboard = useCallback(() => {
    passwordCopy.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {passwordGenerator()} , [number, character, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-5 my-8 bg-gray-700 ">
      <h1 className="text-white text-center">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mx-3 my-3 mb-4">
        <input 
        type="text" 
        value={password}
        className="outline-none w-full px-4 py-1"
        placeholder="password"
        ref={passwordCopy}        
        readOnly
        />
        <button className="outline-none bg-blue-500 px-2" onClick={passwordCopytoClipboard} >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-centr gap-x-1">
          <input type="range" min={6} max={100} value={length}  className="cursor-pointer ml-5" onChange={(e) =>{setlength(e.target.value)}} />
          <label className="text-orange-500">Length: {length}</label>
          <input type="checkbox" defaultChecked={number} id="numberInput" onChange={() => {
            setnumber((prev) => !prev);
          }} className="ml-4"/> 
          <label className="text-orange-500" htmlFor="numberInput">Number</label>
          <input type="checkbox" defaultChecked={character} id="characterInput" onChange={() => {
            setcharacter((prev) => !prev);
          }} className="ml-4"/> 
          <label className="text-orange-500" htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
