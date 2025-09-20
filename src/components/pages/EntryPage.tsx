import type React from "react";

import type { EntryPageProps } from "@/types/props/pages/EntryPageProps";

function EntryPage(props: EntryPageProps): React.JSX.Element {
  props;

  const handleLocalUse: () => void = props.handleLocalUse;

  return (
    <div className={`w-full h-full bg-white`}>
      {/* Background with subtle pattern */}
      <div className="w-full h-full relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            {/* Logo/Title area */}
            <div className="text-center mb-12">
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                W34
              </h1>
              <p className="text-gray-600 text-lg">
                Choose how you'd like to access the application
              </p>
            </div>

            {/* Button container */}
            <div className="space-y-4">
              {/* Sign-in button */}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-200 ease-in-out flex items-center justify-center space-x-3 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-lg">Sign In</span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600 font-medium">
                    OR
                  </span>
                </div>
              </div>

              {/* Local use button */}
              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-200 ease-in-out flex items-center justify-center space-x-3 border border-gray-200 cursor-pointer"
                onClick={() => handleLocalUse()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-lg">Local use</span>
              </button>
            </div>

            {/* Additional info */}
            <div className="mt-8 text-center space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Sign In:</strong> Access with full authentication and cloud features
              </p>
              <p className="text-sm text-gray-500">
                <strong>Local Use:</strong> Quick access without authentication
              </p>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-xs text-gray-400">
                W34E8YR v1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryPage;