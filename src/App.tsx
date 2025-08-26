import { useRef, useState } from 'react'

function App() {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const inputFolder = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    inputFile.current?.click();
  };

  const handleFolderUpload = () => {
    inputFolder.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-black mb-12">W34</h1>

      <div className="flex gap-6">
        <input className="hidden" type="file" ref={(node: HTMLInputElement | null) => {
          inputFile.current = node;
          
        }} />
        <input className="hidden" type="file" ref={(node: HTMLInputElement | null) => {
          inputFolder.current = node;

          if (node) {
            ['webkitdirectory', 'directory', 'mozdirectory'].forEach((attr) => {
              node.setAttribute(attr, '');
            });
          }
        }} />

        <button onClick={handleFileUpload} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          File Upload
        </button>
        <button onClick={handleFolderUpload} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5L12 5H5a2 2 0 00-2 2z" />
          </svg>
          Folder Upload
        </button>
      </div>

    </div>
  );
}

export default App
