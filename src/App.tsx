import { memo, useRef, useState, type ChangeEvent } from 'react'

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k: number = 1024;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface DialogContext {
  title: string;
  message: string;
  onConfirm: () => void;
}

function Dialog({
  onClose, ctx,
}: {
  onClose: () => void;
  ctx: DialogContext;
}) {
  return (
    <div className="fixed inset-0 bg-gray-400/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {ctx.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {ctx.message}
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                ctx.onConfirm();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// function FileDetail({
//   setDialog,
// }: {
//   setDialog: (dialog: DialogContext) => void;
// }) {
//   return (
//     <>
//     </>
//   );
// }

function FileUploader({
  setDialog,
}: {
  setDialog: (dialog: DialogContext) => void;
}) {
  const currentContextName: string = "File Uploader";

  const r1: number = Math.floor(Math.random());

  const inputFile = useRef<HTMLInputElement | null>(null);
  const inputFolder = useRef<HTMLInputElement | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [currentUploadProgress, /*setCurrentUploadProgress*/] = useState<number>(30);

  const handleFileUpload = (): void => {
    inputFile.current?.click();
  };

  const handleFolderUpload = (): void => {
    inputFolder.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles: FileList | null = event.target.files;
    if (selectedFiles !== null) {
      const fileArray: File[] = Array.from(selectedFiles);
      setSelectedFiles(fileArray);
    }
  };

  const handleFolderChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles: FileList | null = event.target.files;
    if (selectedFiles !== null) {
      const fileArray: File[] = Array.from(selectedFiles);
      setSelectedFiles(fileArray);
    }
  };

  const clearFiles = (): void => {
    const ctx: DialogContext = {
      title: currentContextName,
      message: `Are you sure you want to clear all files?`,
      onConfirm: () => {
        setSelectedFiles([]);
      }
    };

    setDialog(ctx);

    // TODO: Make own confirm alert instead of window.confirm. Because of '[Violation] 'click' handler took 911ms'.
    // if (window.confirm('Are you sure you want to clear all files?') === true) {
    //   setSelectedFiles([]);
    // }
  };

  const removeFile = (file: File, index: number): void => {
    const ctx: DialogContext = {
      title: currentContextName,
      message: `${file.name}: Are you sure you want to remove file?`,
      onConfirm: () => {
        setSelectedFiles((prevFiles: File[]) => prevFiles.filter((_, i) => (i !== index)));
      }
    };

    setDialog(ctx);

    // TODO: Make own confirm alert instead of window.confirm. Because of '[Violation] 'click' handler took 911ms'.
    // if (window.confirm(`${file.name}\nAre you sure you want to remove file?`) === true) {
    //   setSelectedFiles((prevFiles: File[]) => prevFiles.filter((_, i) => i !== index));
    // }
  };

  const startUploading = (): void => {
    setUploadingFiles((prevFiles: File[]) => [...prevFiles, ...selectedFiles]);
    setUploadedFiles((prevFiles: File[]) => [...prevFiles, ...selectedFiles]);
    setSelectedFiles([]);
  };

  const cancelUploading = (): void => {
    const ctx: DialogContext = {
      title: currentContextName,
      message: `Are you sure you want to cancel uploading?`,
      onConfirm: () => {
        setUploadingFiles([]);
      }
    };

    setDialog(ctx);

    // TODO: Make own confirm alert instead of window.confirm. Because of '[Violation] 'click' handler took 911ms'.
    // if (window.confirm('Are you sure you want to cancel uploading?') === true) {
    //   setUploadingFiles([]);
    // }
  }

  return (
    <>
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

          <button onClick={handleFileUpload} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            File Upload
          </button>
          <button onClick={handleFolderUpload} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">
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
            <label htmlFor="selected-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input type="text" id="selected-search" className="!outline-none bg-gray-50 border-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search files..." />
            </div>
          </div>

          <div className="w-full border border-gray-300 rounded-lg bg-gray-50 max-h-96 overflow-x-hidden overflow-y-auto mb-2">
            <div className="divide-y divide-gray-200">
              {selectedFiles.map((file: File, index: number) => (
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
                    onClick={() => removeFile(file, index)}
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
            <button onClick={() => startUploading()} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">
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
            <label htmlFor="uploading-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input type="text" id="uploading-search" className="!outline-none bg-gray-50 border-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search files..." />
            </div>
          </div>

          <div className="w-full border border-gray-300 rounded-lg bg-gray-50 max-h-96 overflow-x-hidden overflow-y-auto mb-2">
            <div className="divide-y divide-gray-200">
              {uploadingFiles.map((file: File, index: number) => (
                <div key={index} className="relative hover:bg-white w-full p-4 transition-colors flex flex-col justify-between items-center">
                  <div className="w-full flex flex-row justify-between items-center">
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
                      <div className="flex flex-row items-center justify-center">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">
                            {currentUploadProgress}%
                          </span>
                        </div>
                        {((r1 % 2) == 0) && (
                          <button
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Remove file"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 6h12v12H6z" />
                            </svg>
                          </button>
                        )}
                        {((r1 % 2) == 1) && (
                          <button
                            className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-50 transition-colors"
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
                          onClick={() => removeFile(file, index)}
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
                  {(index === 0) && (
                    <div className="absolute bottom-0 left-0 right-0 w-full flex flex-col items-end">
                      <div className="w-full bg-gray-200 h-2">
                        <div
                          className="bg-blue-500 h-2 transition-all duration-300 ease-out"
                          style={{ width: `${currentUploadProgress}%` }}
                        ></div>
                      </div>
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

    </>
  );
}

const MemoizedDialog = memo(Dialog);

function App() {

  const [dialog, setDialog] = useState<DialogContext | null>(null);

  return (
    <div className="min-w-xs min-h-screen flex flex-col items-center justify-between gap-2 px-2">
      <div className="w-full min-w-xs max-w-4xl flex flex-col items-center gap-2">
        <header className="w-full min-w-xs max-w-4xl flex flex-col items-center justify-center bg-white rounded-b-lg shadow-sm p-5">
          <h1 className="text-4xl font-bold text-black mb-12">W34</h1>

          <div className="flex flex-wrap items-center gap-1 w-full max-w-2xl">
            <input
              type="text"
              placeholder="Address"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 whitespace-nowrap">
              Connect
            </button>
          </div>
        </header>
        <main className="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-5">
          <FileUploader setDialog={(dialog: DialogContext) => setDialog(dialog)} />
        </main>
      </div>

      <footer className="w-full min-w-xs max-w-4xl bg-white rounded-t-lg shadow-sm m-0">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">© 2025 <a href="https://w34.com/" className="hover:underline">W34E8YR</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
      </footer>

      {(dialog !== null) && (
        <>
          <MemoizedDialog
            onClose={() => setDialog(null)}
            ctx={dialog} />
        </>
      )}

    </div>
  );
}

export default App
