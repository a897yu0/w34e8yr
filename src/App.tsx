import clsx from 'clsx';
import React from 'react';

import type { DialogContext } from '@/types/DialogContext';
import FallbackPage from './components/pages/FallbackPage';


interface HeaderProps {
}

interface DialogProps {
  onClose: () => void;
  ctx: DialogContext;
}

const Dialog = React.memo<DialogProps>((props: DialogProps): React.JSX.Element => {
  const onClose: () => void = props.onClose;
  const ctx: DialogContext = props.ctx;

  return (
    <div className="fixed inset-0 bg-gray-400/50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-black mb-4">
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
});

function Header(props: HeaderProps): React.JSX.Element {

  props;

  const [avatarLoaded, setAvatarLoaded] = React.useState<boolean>(false);

  const avatarUrl: string | undefined = 'https://avatar.iran.liara.run/public';
  // const avatarUrl: string | undefined = undefined;

  React.useEffect(() => {
    if (avatarUrl) {
      setAvatarLoaded(false);
    }
  }, [avatarUrl]);

  return (
    <header className="w-full flex flex-row justify-between items-center bg-white p-1 border-b-1 border-black">
      <div className="flex flex-row justify-center items-center mt-0.5 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
        <h1 className="text-2xl font-bold text-black ml-2">W34</h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-1">
        <div className="cursor-pointer w-7 h-7">
          {(avatarUrl && (
            <div className="relative cursor-pointer w-full h-full">
              {!avatarLoaded && (
                <div className="absolute inset-0  flex items-center justify-center">
                  <div className="w-full h-full border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={clsx(
                  "absolute inset-0 size-full p-1",
                  avatarLoaded && 'hidden',
                )}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <img
                src={avatarUrl}
                alt="User avatar"
                className={clsx(
                  "absolute inset-0 w-full h-full rounded-full object-cover",
                  !avatarLoaded && 'hidden',
                )}
                onLoad={() => setAvatarLoaded(true)}
                onError={() => setAvatarLoaded(false)}
              />
            </div>
          )) || (
              <div className="relative cursor-pointer w-full h-full">
                <div className="absolute inset-0  flex items-center justify-center">
                  <div className="w-full h-full border-2 border-black rounded-full"></div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="absolute inset-0 size-full p-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

              </div>
            )}
        </div>
      </div>
    </header>
  );
}

function App(): React.JSX.Element {
  const [dialog, setDialog] = React.useState<DialogContext | null>(null);

  const openDialog = (ctx: DialogContext | null): void => {
    if (!ctx) return;

    setDialog(ctx);
  };

  const AdminPage: React.LazyExoticComponent<React.ComponentType<any>> = React.lazy(() => import('./components/pages/AdminPage'));

  return (
    <>
      <div className="font-sans w-full h-screen flex flex-col items-center justify-between gap-0 px-0 overflow-hidden">
        <Header />

        <main className="w-full flex-1">
          <React.Suspense fallback={<FallbackPage />}>
            <AdminPage openDialog={openDialog} />
          </React.Suspense>
        </main>

        <footer className="w-full bg-white m-0 border-black border-t-1">
          <div className="w-full mx-auto p-1 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 md:text-center">© 2025 <a href="https://w34.com/" className="hover:underline">W34E8YR</a>. All Rights Reserved.</span>
            <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500">
              <li>
                <a href="#" className="hover:underline me-2">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-2">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-2">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>

      {(dialog !== null) && (
        <Dialog
          onClose={() => setDialog(null)}
          ctx={dialog} />
      )}
    </>
  );
}

export default App;
