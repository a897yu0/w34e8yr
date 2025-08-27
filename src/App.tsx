import { useRef, useState } from 'react'

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k: number = 1024;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

function App() {

  const r1: number = Math.floor(Math.random());

  const inputFile = useRef<HTMLInputElement | null>(null);
  const inputFolder = useRef<HTMLInputElement | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [currentUploadProgress, /*setCurrentUploadProgress*/] = useState<number>(30);

  const handleFileUpload = () => {
    inputFile.current?.click();
  };

  const handleFolderUpload = () => {
    inputFolder.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: FileList | null = event.target.files;
    if (selectedFiles !== null) {
      const fileArray: File[] = Array.from(selectedFiles);
      setSelectedFiles(fileArray);
    }
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: FileList | null = event.target.files;
    if (selectedFiles !== null) {
      const fileArray: File[] = Array.from(selectedFiles);
      setSelectedFiles(fileArray);
    }
  };

  const clearFiles = () => {
    if (window.confirm('Are you sure you want to clear all files?') === true) {
      setSelectedFiles([]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles: File[]) => {
      const file: File = prevFiles[index];

      if (window.confirm(`${file.name}\nAre you sure you want to remove file?`) === true) {
        return prevFiles.filter((_, i) => i !== index);
      }
      else {
        return prevFiles;
      }
    });

  };

  const startUploading = () => {
    setUploadingFiles((prevFiles: File[]) => [...prevFiles, ...selectedFiles]);
    setUploadedFiles((prevFiles: File[]) => [...prevFiles, ...selectedFiles]);
    setSelectedFiles([]);
  };

  const cancelUploading = () => {
    if (window.confirm('Are you sure you want to cancel uploading?') === true) {
      setUploadingFiles([]);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-3 p-3">
      <div className="w-full min-w-xs max-w-3xl flex flex-col items-center justify-center bg-white p-5 border border-gray-300
 rounded">
        <h1 className="text-4xl font-bold text-black mb-12">W34</h1>
      </div>
      <div className="w-full min-w-xs max-w-3xl min-h-40 flex flex-col items-center justify-center bg-white p-5 border border-gray-300
 rounded">
        {(selectedFiles.length === 0) && (uploadingFiles.length === 0) && (
          <div className="flex gap-6">
            <input className="hidden" type="file" onChange={handleFileChange} ref={(node: HTMLInputElement | null) => {
              inputFile.current = node;

            }} />
            <input className="hidden" type="file" onChange={handleFolderChange} ref={(node: HTMLInputElement | null) => {
              inputFolder.current = node;

              if (node) {
                ['webkitdirectory', 'directory', 'mozdirectory'].forEach((attr) => {
                  node.setAttribute(attr, '');
                });
              }
            }} />

            <button onClick={handleFileUpload} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              File Upload
            </button>
            <button onClick={handleFolderUpload} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5L12 5H5a2 2 0 00-2 2z" />
              </svg>
              Folder Upload
            </button>
          </div>
        )}

        {(selectedFiles.length > 0) && (
          <div className="w-full flex flex-col justify-between items-center">
            <div className="w-full flex flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Selected Files ({selectedFiles.length})
              </h2>
              <div className="flex flex-row justify-center items-center gap-1">
                <button
                  onClick={clearFiles}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="w-full flex flex-row justify-between items-center mb-2">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search files..." required />
              </div>
            </div>

            <div className="w-full border border-gray-300 rounded-lg bg-gray-50 max-h-96 overflow-y-auto mb-2">
              <div className="divide-y divide-gray-200">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="p-4 hover:bg-white transition-colors flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {file.type.startsWith('image/') ? (
                            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          ) : file.type.startsWith('video/') ? (
                            <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                          </p>
                          {file.webkitRelativePath && (
                            <p className="text-xs text-gray-400 truncate" title={file.webkitRelativePath}>
                              Path: {file.webkitRelativePath}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-4 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Remove file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row items-center justify-center">
              <button onClick={() => startUploading()} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer">
                Upload
              </button>
            </div>

          </div>
        )}

        {(uploadingFiles.length > 0) && (
          <div className="w-full flex flex-col justify-between items-center">
            <div className="w-full flex flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Uploading Files ({uploadingFiles.length})
              </h2>
              <div className="flex flex-row justify-center items-center gap-1">
                <button
                  onClick={() => cancelUploading()}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Cancel All
                </button>
              </div>
            </div>

            <div className="w-full flex flex-row justify-between items-center mb-2">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search files..." required />
              </div>
            </div>

            <div className="w-full border border-gray-300 rounded-lg bg-gray-50 max-h-96 overflow-y-auto mb-2">
              <div className="divide-y divide-gray-200">
                {uploadingFiles.map((file: File, index: number) => (
                  <div key={index} className="p-4 hover:bg-white transition-colors flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {file.type.startsWith('image/') ? (
                            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          ) : file.type.startsWith('video/') ? (
                            <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                          </p>
                          {file.webkitRelativePath && (
                            <p className="text-xs text-gray-400 truncate" title={file.webkitRelativePath}>
                              Path: {file.webkitRelativePath}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {(index === 0) && (
                      <div className="flex flex-row">
                        <div className="ml-4 w-32 flex flex-col items-end">
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${currentUploadProgress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {currentUploadProgress}%
                          </span>
                        </div>
                        {((r1 % 2) == 0) && (
                          <button
                            className="ml-4 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Remove file"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 6h12v12H6z" />
                            </svg>
                          </button>
                        )}
                        {((r1 % 2) == 1) && (
                          <button
                            className="ml-4 text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-50 transition-colors"
                            title="Remove file"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        )}

                      </div>
                    )}
                    {(index > 0) && (
                      <div className="flex flex-row">
                        <button
                          onClick={() => removeFile(index)}
                          className="ml-4 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Remove file"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}

                  </div>
                ))}
                {uploadedFiles.map((file: File, index: number) => (
                  <div key={index} className="p-4 hover:bg-white transition-colors flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {file.type.startsWith('image/') ? (
                            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          ) : file.type.startsWith('video/') ? (
                            <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                          </p>
                          {file.webkitRelativePath && (
                            <p className="text-xs text-gray-400 truncate" title={file.webkitRelativePath}>
                              Path: {file.webkitRelativePath}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row">
                      <button
                        className="ml-4 text-green-500 hover:text-green-700 p-1 rounded transition-colors"
                        title="Upload completed"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App
