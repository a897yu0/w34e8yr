import { useRef, useState } from 'react'
import './App.css'

function App() {
  const inputFolder = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <h1>W34</h1>
      <input type="file" className="file-input" ref={(node) => {
        inputFolder.current = node;

        if (node) {
          ['webkitdirectory', 'directory', 'mozdirectory'].forEach((attr) => {
            node.setAttribute(attr, '');
          });
        }
      }} />
    </>
  )
}

export default App
