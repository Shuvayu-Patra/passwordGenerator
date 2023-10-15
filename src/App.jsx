import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  
  const passRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) str += "0123456789";
    if(char) str += "!@#$%^&*-_[]?()~";

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, char, setPassword])

  const copyToclipboard = useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 30)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, number, char, passwordGenerator])

  return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700'>
      <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readonly
          ref={passRef}
          />
          <button
          onClick={copyToclipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>

                <input
                type='range'
                min = {6}
                max = {30}
                value = {length}
                className='cursor-pointer'
                onChange={(e)=>{setLength(e.target.value)}}
                />
                <label>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked = {number}
            id='numberInput'
            onChange={()=>{
              setNumber((prev) => !prev)
            }}
            />
            <label htmlFor='numberInput'>Nubers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked = {char}
            id='charInpur'
            onChange={()=>{
              setChar((prev) => !prev)
            }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
  )
}

export default App
