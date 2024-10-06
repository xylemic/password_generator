import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [lenght, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCahrAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const paswordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < lenght; i++) {
      const index = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    paswordRef.current?.select();
    // alert('Password copied to clipboard');
  }

  useEffect(() => {
    generatePassword();
  }, [lenght, numberAllowed, charAllowed]);


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center-my-3">password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-3'
         placeholder='password'
         readOnly
         ref={paswordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range" 
          min="6" 
          max="100" 
          value={lenght}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          name=''
          id=''
          />
          <label htmlFor="length">length: {lenght}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="number">numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          onChange={() => {
            setCahrAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="charInput">character</label>
        </div>
      </div>
    </div>
  )
}

export default App
