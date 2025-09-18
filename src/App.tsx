import clsx from 'clsx';
import React from 'react';

import ServersManagementPanel from './components/panels/ServersManagementPanel';

interface HeaderProps {
  isSidebarShown: boolean;
  toggleSidebarShown: () => void;
}

interface DialogContext {
  title: string;
  message: string;
  onConfirm: () => void;
}

interface DialogProps {
  onClose: () => void;
  ctx: DialogContext;
}

interface DropdownMenu {
  [id: string]: boolean;
}

interface SidebarItemProps {
  currentPath?: string;

  parentPath?: string;
  name?: string;

  icon?: React.ReactNode;
  text: string;
  badge?: string;
  badgeColor?: string;
  count?: number;

  parentArgs?: string[];
  args?: string[];

  onClick?: (path: string) => void;

  toggleSidebarShown?: () => void;
}

interface SidebarWrapperProps {
  currentPath?: string;

  onItemClick?: (path: string) => void;

  toggleSidebarShown?: () => void;
}

interface SidebarDropdownItemProps extends SidebarItemProps, SidebarWrapperProps {
  dropdownMenu: DropdownMenu; toggleDropdownMenu: (id: string) => void;

  children?: React.ReactNode;
}

interface SidebarItemsWrapperProps extends SidebarWrapperProps {
  root?: boolean;
  hidden?: boolean;

  children: React.ReactNode;
}

interface SidebarProps extends SidebarWrapperProps {
  dropdownMenu: DropdownMenu;
  toggleDropdownMenu: (id: string) => void;
}

interface MainPanelWrapperProps {
  path: string | undefined;
  resetPath: () => void;
}

interface MainPanelContext {
  icon?: React.ReactNode;

  path: string;
  args?: string[];
}

interface MainPanelWithParams {
  panel: React.JSX.Element;
  params: string[];
}

const pathToMainPanelContext: { [path: string]: MainPanelContext; } = {};

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

function isValidPathComponent(value: string): boolean {
  return value.trim().length > 0 && !/\s/.test(value);
}

function getPath(parentPath: string | undefined, name: string | undefined): string | undefined {
  if (name && !isValidPathComponent(name)) {
    throw new Error(`Invalid name: Cannot contain whitespace or be empty: ${name}`);
  }

  if (parentPath && !isValidPathComponent(parentPath)) {
    throw new Error(`Invalid path: Cannot contain whitespace or be empty: ${parentPath}`);
  }

  if (parentPath && name) {
    return `${parentPath}/${name}`;
  } else if (parentPath) {
    return parentPath;
  } else {
    return name;
  }
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
  const isSidebarShown: boolean = props.isSidebarShown;
  const toggleSidebarShown: (() => void) | undefined = props.toggleSidebarShown;

  isSidebarShown;
  toggleSidebarShown;

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
        {/* <div className="block md:hidden cursor-pointer w-7 h-7" onClick={() => toggleSidebarShown()}>
          {(isSidebarShown === false) ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          )}
        </div> */}
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

function SidebarWrapper(props: SidebarItemsWrapperProps): React.JSX.Element {
  const currentPath: string | undefined = props.currentPath;

  const onItemClick: ((path: string) => void) | undefined = props.onItemClick;

  const toggleSidebarShown: (() => void) | undefined = props.toggleSidebarShown;

  const root: boolean | undefined = props.root;;
  const hidden: boolean | undefined = props.hidden;;

  const children: React.ReactNode = props.children;

  return (
    <ul className={clsx(
      'font-medium',
      !root && 'border-black border-l-2 ml-2',
      hidden && 'hidden'
    )}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && (child.type === SidebarDropdownItem || child.type === SidebarWrapper)) {
          return React.cloneElement(child, {
            currentPath: currentPath,
            onItemClick: onItemClick,
            toggleSidebarShown: toggleSidebarShown,
            ...(child.props as any), // Preserve existing props
          });
        }
        if (React.isValidElement(child) && (child.type === SidebarItem)) {
          return React.cloneElement(child, {
            currentPath: currentPath,
            onClick: onItemClick,
            toggleSidebarShown: toggleSidebarShown,
            ...(child.props as any), // Preserve existing props
          });
        }
        return child;
      })}
    </ul>
  );
};

function SidebarItem(props: SidebarItemProps): React.JSX.Element {
  const currentPath: string | undefined = props.currentPath;

  const parentPath: string | undefined = props.parentPath;
  const name: string | undefined = props.name;

  const path: string | undefined = getPath(parentPath, name);

  const icon: React.ReactNode | undefined = props.icon;
  const text: string = props.text;
  const badge: string | undefined = props.badge;
  const badgeColor: string | undefined = props.badgeColor;
  const count: number | undefined = props.count;

  const parentArgs: string[] | undefined = props.parentArgs;
  const args: string[] | undefined = props.args;

  const onClick: ((path: string) => void) | undefined = props.onClick;
  const toggleSidebarShown: (() => void) | undefined = props.toggleSidebarShown;

  React.useEffect(() => {
    if (path) {
      pathToMainPanelContext[path] = {
        icon: icon,

        path: path,
        args: [...(parentArgs ?? []), ...(args ?? [])],
      };
    }

  }, []);

  return (
    <li>
      <div className={clsx(
        "flex items-center p-1 text-black group cursor-pointer",
        ((currentPath && (currentPath === path)) && "bg-gray-200") || "hover:bg-gray-100",
      )} onClick={() => {
        if (onClick && path) {
          onClick(path);
        }

        if (toggleSidebarShown) {
          toggleSidebarShown();
        }
      }}
      >
        <div className="shrink-0 w-6 h-6 text-black transition duration-75 group-hover:text-gray-800">
          {icon}
        </div>
        <span className="flex-1 ms-3 text-black whitespace-nowrap">{text}</span>
        {badge && (
          <span className={`inline-flex items-center justify-center h-3 py-3 px-2 ms-1 text-sm font-medium text-black ${badgeColor || "bg-gray-200"} rounded-full`}>
            {badge}
          </span>
        )}
        {count && (
          <span className="inline-flex items-center justify-center h-3 py-3 px-2 ms-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{count}</span>
        )}
      </div>
    </li>
  );
};

function SidebarDropdownItem(props: SidebarDropdownItemProps): React.JSX.Element {
  const currentPath: string | undefined = props.currentPath;

  const parentPath: string | undefined = props.parentPath;
  const name: string | undefined = props.name;

  const path: string | undefined = getPath(parentPath, name);

  const dropdownMenu: DropdownMenu = props.dropdownMenu;
  const toggleDropdownMenu: (id: string) => void = props.toggleDropdownMenu;
  const icon: React.ReactNode | undefined = props.icon;
  const text: string = props.text;
  const badge: string | undefined = props.badge;
  const badgeColor: string | undefined = props.badgeColor;
  const count: number | undefined = props.count;
  const children: React.ReactNode | undefined = props.children;

  const parentArgs: string[] | undefined = props.parentArgs;
  const args: string[] | undefined = props.args;

  const onItemClick: ((path: string) => void) | undefined = props.onItemClick;
  const toggleSidebarShown: (() => void) | undefined = props.toggleSidebarShown;

  // const id: string = React.useMemo(() => generateUUID(), []);
  const id: string = (path || React.useMemo(() => generateUUID(), []));

  React.useEffect(() => {

  }, []);

  return (
    <li>
      <button type="button" className="flex items-center w-full p-1 text-base text-black transition duration-75 group hover:bg-gray-100 cursor-pointer" onClick={() => toggleDropdownMenu(id)}>
        <div className="shrink-0 w-6 h-6 flex justify-center items-center text-black transition duration-75 group-hover:text-gray-800">
          {icon}
        </div>
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{text}</span>
        {badge && (
          <span className={`inline-flex items-center justify-center h-3 py-3 px-2 ms-1 text-sm font-medium text-black ${badgeColor || "bg-gray-200"} rounded-full`}>
            {badge}
          </span>
        )}
        {count && (
          <span className="inline-flex items-center justify-center h-3 py-3 px-2 ms-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{count}</span>
        )}
        {(!!children) && (
          <div className="w-6 h-6 flex-shrink-0">
            {(dropdownMenu[id] === true) ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            )}
          </div>
        )}
      </button>
      <SidebarWrapper
        currentPath={currentPath}
        onItemClick={onItemClick}
        toggleSidebarShown={toggleSidebarShown}
        hidden={!dropdownMenu[id]}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && (child.type === SidebarItem || child.type === SidebarDropdownItem)) {
            return React.cloneElement(child, {
              parentPath: path,
              args: [...(parentArgs ?? []), ...(args ?? [])],
              ...(child.props as any), // Preserve existing props
            });
          }
          return child;
        })}
      </SidebarWrapper>
    </li>
  );
};

function Sidebar(props: SidebarProps): React.JSX.Element {

  const currentPath: string | undefined = props.currentPath;

  const onItemClick: ((path: string) => void) | undefined = props.onItemClick;

  const toggleSidebarShown: (() => void) | undefined = props.toggleSidebarShown;

  const dropdownMenu: DropdownMenu = props.dropdownMenu;
  const toggleDropdownMenu: (id: string) => void = props.toggleDropdownMenu;

  React.useEffect(() => {
    const handleResize = () => {
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // TODO: Save current state to the local storage (State: registered servers)

  // console.log("dropdownMenu:", dropdownMenu);

  return (
    <aside id="sidebar-multi-level-sidebar"
      className="bg-white min-w-fit min-h-full"
      aria-label="Sidebar">
      <SidebarWrapper
        currentPath={currentPath}
        onItemClick={onItemClick}
        toggleSidebarShown={toggleSidebarShown}
        root
      >
        <SidebarDropdownItem
          name="servers"

          dropdownMenu={dropdownMenu} toggleDropdownMenu={toggleDropdownMenu}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
            </svg>
          }
          text="Servers"
        >
          <SidebarItem
            name="management"

            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
            }
            text="Management"
          />
          <SidebarDropdownItem
            name="registered"

            dropdownMenu={dropdownMenu} toggleDropdownMenu={toggleDropdownMenu}
            text="Registered"
          >
            <SidebarItem
              name="52.187.187.79"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
                </svg>
              }
              text="52.187.187.79"

              args={[]}
            />
            <SidebarItem
              name="205.141.230.240"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
                </svg>
              }
              text="205.141.230.240"

              args={[]}
            />
            <SidebarItem
              name="server-jw948g5"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
                </svg>
              }
              text="server-jw948g5"

              args={[]}
            />
            <SidebarItem
              name="ad2cadf7-ebe6-4afb-87e9-1db30ab7e815"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
                </svg>
              }
              text="ad2cadf7-ebe6-4afb-87e9-1db30ab7e815"

              args={[]}
            />
          </SidebarDropdownItem>
        </SidebarDropdownItem>
        <SidebarItem
          name="versions"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
          }
          text="Versions"
        />
        <div className="mx-1 my-4 border-black border-t-1" />
        <SidebarItem
          name="dashboard"

          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full flex-shrink-0 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
          }
          text="Dashboard"
        />
        <SidebarDropdownItem
          name="e-commerce"

          dropdownMenu={dropdownMenu} toggleDropdownMenu={toggleDropdownMenu}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full flex-shrink-0 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
            </svg>
          }
          text="E-commerce"
          badge="Good" badgeColor="bg-orange-200"
          count={999}
        >
          <SidebarItem
            name="products"

            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            }
            text="Products"
            badge="Pro"
            count={1}
          />
          <SidebarItem
            name="billing"

            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            }
            text="Billing"
            badge="New" badgeColor="bg-red-200"
            count={1}
          />
          <SidebarDropdownItem
            name="e-commerce"

            dropdownMenu={dropdownMenu} toggleDropdownMenu={toggleDropdownMenu}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full flex-shrink-0 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
              </svg>
            }
            text="E-commerce"
          >
            <SidebarItem
              name="products"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              }
              text="Products"
              badge="Pro"
              count={1}
            />
            <SidebarItem
              name="billing"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              }
              text="Billing"
              badge="New" badgeColor="bg-red-200"
              count={1}
            />
            <SidebarItem
              name="invoice"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                </svg>
              }
              text="Invoice"
              badge="Billed" badgeColor="bg-red-200"
              count={1}
            />
          </SidebarDropdownItem>
          <SidebarItem
            name="invoice"

            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            }
            text="Invoice"
            badge="Billed" badgeColor="bg-red-200"
            count={1}
          />
        </SidebarDropdownItem>
        <SidebarItem
          name="kanban"

          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
          }
          text="Kanban"
          badge="Pro"
          count={1}
        />
        <SidebarItem
          name="inbox"

          icon={
            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
            </svg>
          }
          text="Inbox"
          count={3}
        />
        <SidebarItem
          name="users"

          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          }
          text="Users"
        />
        <SidebarItem
          name="products"

          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          }
          text="Products"
        />
        <SidebarItem
          name="sign-in"

          icon={
            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
            </svg>
          }
          text="Sign In"
        />
        <SidebarItem
          name="sign-up"

          icon={
            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
              <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
              <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
            </svg>
          }
          text="Sign Up"
        />
      </SidebarWrapper>
    </aside>
  );
};

function RegisteredServerPanel(): React.JSX.Element {
  /**
   * Features:
   * List of accounts logged in with when logged in, where, which platform, email, ip, location, android or ios, chrome/safari etc...
   */

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      RegisteredServerPanel
    </div>
  );
}

function MainPanelWrapper(props: MainPanelWrapperProps): React.JSX.Element {

  const path: string | undefined = props.path;
  const resetPath: () => void = props.resetPath;

  const [ctx, setCtx] = React.useState<MainPanelContext | undefined>(undefined);

  const [panelWithParams, setPanelWithParams] = React.useState<MainPanelWithParams | undefined>(undefined);

  const pathToPanel: Record<string, React.JSX.Element> = {
    "servers/management": <ServersManagementPanel />,
    "servers/registered/?": <RegisteredServerPanel />,
    "servers/registered/?/info/?": <RegisteredServerPanel />,
  };

  function matchPathWithParams(pattern: string, path: string): { match: boolean; params: string[]; } {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) {
      return { match: false, params: [] };
    }

    const params: string[] = [];

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      if (patternPart === '?') {
        params.push(pathPart); // Capture the wildcard value
      } else if (patternPart !== pathPart) {
        return { match: false, params: [] };
      }
    }

    return { match: true, params };
  }

  function findMatchingPanelWithParams(path: string): MainPanelWithParams | null {
    for (const [pattern, panel] of Object.entries(pathToPanel)) {
      const { match, params }: { match: boolean; params: string[]; } = matchPathWithParams(pattern, path);
      if (match) {
        return { panel, params };
      }
    }
    return null;
  }

  React.useEffect(() => {
    if (path) {
      const ctx: MainPanelContext | undefined = pathToMainPanelContext[path];
      setCtx(ctx);

      const panelWithParams: MainPanelWithParams | null = findMatchingPanelWithParams(path);

      if (panelWithParams) {
        setPanelWithParams(panelWithParams);

        // console.log('panelWithParams:', panelWithParams);
      } else {
        setPanelWithParams(undefined);
      }

      // console.log('ctx:', ctx);
    }

  }, [path]);


  // if (path && !mainPanelPaths[path]) {
  //   throw new Error(`Invalid path: Unregistered main panel: ${path}`);
  // }


  const PathSegmentComponent = (props: { segment?: string; index?: number; isLast?: boolean; }) => (
    <span className="cursor-pointer text-gray-700"
    // onClick={() => console.log(`Clicked segment: ${props.segment} at index ${props.index}`)}
    >
      {props.segment}
    </span>
  );

  const PathSeparatorComponent = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mt-0.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );

  const PathBreadcrumb = (props: { path: string; }) => {
    const segments = props.path.split('/');

    return (
      <div className="flex flex-row justify-start items-center flex-wrap">
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <PathSegmentComponent
              segment={segment}
              index={index}
              isLast={index === segments.length - 1}
            />
            {index < segments.length - 1 && <PathSeparatorComponent />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {path && (
        <>
          <div className="w-full flex flex-row justify-between items-center flex-wrap bg-gray-200 border-black border-b-1">
            <div className="w-full  flex-shrink-0 flex flex-row justify-between items-center flex-wrap">
              <div className="flex flex-row justify-start items-center flex-wrap">
                <div className="w-5 h-5 mr-1">
                  {(ctx && ctx.icon) || (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                  )}
                </div>
                <PathBreadcrumb path={path} />
              </div>
              <div className="w-5 h-5 cursor-pointer" onClick={() => resetPath()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {ctx && ctx.args && (ctx.args.length > 0) && (
              <div className="w-full bg-white border-black- border-b-1 p-1 flex flex-row flex-wrap justify-start items-start gap-1">
                {ctx.args.map((value: string, index: number) => (
                  <div key={index} className="border">
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full h-full flex justify-start items-center bg-white">
            <div className="w-full h-full relative">
              {(panelWithParams && (
                <div className="absolute w-full h-full overflow-auto">
                  <div className="min-w-fit min-h-fit w-full h-full p-2">
                    {panelWithParams.panel}
                  </div>
                </div>
              )) || (<div className="w-full h-full flex justify-center items-center"><span>Not found</span></div>)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function App(): React.JSX.Element {
  const [dialog, setDialog] = React.useState<DialogContext | null>(null);

  const [isMobileSidebarShown, setIsMobileSidebarShown] = React.useState<boolean>(false);

  const initialSidebarWidthLocalStorageKey = 'db445a4e-0522-4534-a3b0-2aa03512c9c1';

  const [sidebarDropdownMenu, setSidebarDropdownMenu] = React.useState<DropdownMenu>({});

  const sidebarContainerRef = React.useRef<HTMLDivElement>(null);
  const sidebarResizerRef = React.useRef<HTMLDivElement>(null);

  const maxSidebarWidth: number = window.innerWidth;
  const initSidebarWidth: number = 277;
  const minSidebarWidth: number = Math.min(maxSidebarWidth, 177);

  if (minSidebarWidth < 0) {
    throw new Error(`Minimum sidebar width (${minSidebarWidth}) cannot be negative`);
  }

  if (initSidebarWidth <= 0) {
    throw new Error(`Initial sidebar width (${minSidebarWidth}) cannot be negative or zero`);
  }

  if (maxSidebarWidth < minSidebarWidth) {
    throw new Error(`Maximum sidebar width (${maxSidebarWidth}) cannot be less than minimum sidebar width (${minSidebarWidth})`);
  }

  const getInitialSidebarWidthInCorrectRange = (minWidth: number, maxWidth: number, width: number): number => {
    if (minWidth < 0) {
      throw new Error(`Minimum sidebar width (${minWidth}) cannot be negative`);
    }
    if (maxWidth > window.innerWidth) {
      throw new Error(`Maximum sidebar width (${maxWidth}) cannot be greater than window width (${window.innerWidth})`);
    }
    if (maxWidth < minWidth) {
      throw new Error(`Maximum sidebar width (${maxWidth}) cannot be less than minimum sidebar width (${minWidth})`);
    }

    const item: string | null = localStorage.getItem(initialSidebarWidthLocalStorageKey);

    if (item) {
      width = parseInt(item, 10);
    }

    console.assert(width >= 0);
    console.assert(minWidth >= 0);
    console.assert(maxWidth >= 0);
    console.assert(minWidth <= maxWidth);
    return Math.min(Math.max(width, minWidth), maxWidth);
  }

  const saveInitialSidebarWidth = (width: number): void => {
    localStorage.setItem(initialSidebarWidthLocalStorageKey, width.toString());
  }

  const [resizableSidebarWidth, setResizableSidebarWidth] = React.useState<number>(getInitialSidebarWidthInCorrectRange(minSidebarWidth, maxSidebarWidth, initSidebarWidth));
  const [isResizableSidebarDragging, setIsResizableSidebarDragging] = React.useState<boolean>(false);

  const [currentMainPanelPath, setCurrentMainPanelPath] = React.useState<string | undefined>(undefined);

  const loadCurrentMainPanel = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mainPanelPath: string | null = urlParams.get('main');

    if (mainPanelPath) {
      setCurrentMainPanelPath(mainPanelPath);
    } else {
      setCurrentMainPanelPath(undefined);
    }
  };

  const resetCurrentMainPanelPath = () => {
    setCurrentMainPanelPath(undefined);

    const url: URL = new URL(window.location.href);
    url.searchParams.delete('main');

    window.history.replaceState(undefined, '', url);

    // Don't push, because prevent to go back to previous state. If it is enabled, the user was tired with long history about this.
    // window.history.pushState(undefined, '', url);  

  };

  const toggleSidebarDropdownMenu: (id: string) => void = React.useCallback((id: string): void => {
    setSidebarDropdownMenu((prevMenu: DropdownMenu) => ({
      ...prevMenu,
      [id]: !prevMenu[id],
    }));
  }, []);

  const clickSidebarItem = (path: string) => {
    if (!isValidPathComponent(path)) {
      throw new Error(`Invalid path: Cannot contain whitespace or be empty: ${path}`);
    }

    // console.log(path, args);

    setCurrentMainPanelPath(path);

    const url: URL = new URL(window.location.href);
    url.searchParams.set('main', path);

    window.history.replaceState(undefined, '', url);

    // Don't push, because prevent to go back to previous state. If it is enabled, the user was tired with long history about this.
    // window.history.pushState(undefined, '', url);  


  };

  const toggleSidebar = () => {
    setIsMobileSidebarShown(prev => !prev);

    setResizableSidebarWidth((prevWidth: number) => {
      if (prevWidth > 0) {
        // saveInitialSidebarWidth(0);
        return 0;
      }

      console.assert(minSidebarWidth >= 0);
      console.assert(maxSidebarWidth >= 0);
      console.assert(minSidebarWidth <= maxSidebarWidth);
      console.assert(initSidebarWidth > 0);
      const newWidth = getInitialSidebarWidthInCorrectRange(minSidebarWidth, maxSidebarWidth, initSidebarWidth);

      console.assert(newWidth > 0);
      saveInitialSidebarWidth(newWidth);
      return newWidth;
    });
  };

  const resetSidebar = () => {
    setIsMobileSidebarShown(prev => !prev);

    console.assert(initSidebarWidth > 0);
    const newWidth = Math.min(initSidebarWidth, window.innerWidth);

    console.assert(newWidth > 0);
    setResizableSidebarWidth(newWidth);
    saveInitialSidebarWidth(newWidth);
  };

  const handleSidebarResizerPointerDown = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Don't preventDefault here for touch events
    if ('touches' in e) {
      // Just start dragging, preventDefault will happen in touchmove
    } else {
      e.preventDefault(); // Only prevent for mouse events
    }

    setResizableSidebarWidth((prevWidth: number) => {
      if (prevWidth >= 0) {
        return prevWidth;
      }

      const minWidth = Math.min(window.innerWidth, minSidebarWidth);
      const newWidth = Math.max(minWidth - (sidebarResizerRef.current?.clientWidth || 0), minWidth);

      saveInitialSidebarWidth(newWidth);
      return newWidth;
    });

    setIsResizableSidebarDragging(true);
  }, []);

  const handleSidebarResizerPointerMove = React.useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizableSidebarDragging || !sidebarContainerRef.current) {
      return;
    }

    // Prevent default behavior and stop event propagation
    e.preventDefault();
    e.stopPropagation();

    const containerRect = sidebarContainerRef.current.getBoundingClientRect();

    // Get X position from either mouse or touch event
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    if (clientX === undefined) {
      return;
    }

    console.assert(containerRect.left <= clientX);
    const width = (clientX - containerRect.left);

    console.assert(minSidebarWidth >= 0);
    if (width < minSidebarWidth) {
      setResizableSidebarWidth(0);
      saveInitialSidebarWidth(0);
    } else {
      console.assert(minSidebarWidth >= 0);
      const maxWidth = (Math.min(containerRect.width, maxSidebarWidth) - (sidebarResizerRef.current?.clientWidth || 0));
      const newWidth = Math.min(Math.max(width, minSidebarWidth), maxWidth);

      console.assert(newWidth >= 0);
      setResizableSidebarWidth(newWidth);
      saveInitialSidebarWidth(newWidth);

      // console.log("constrainedWidth:", constrainedWidth);
    }

  }, [isResizableSidebarDragging, minSidebarWidth, maxSidebarWidth]);

  const handleSidebarResizerPointerUp = React.useCallback(() => {
    setIsResizableSidebarDragging(false);
  }, []);

  const adjustSidebarForWindowResize = () => {
    // Reset mobile sidebar when window is resized
    setIsMobileSidebarShown(false);

    // console.log("Resize!");

    if (sidebarContainerRef.current) {
      const containerRect: DOMRect = sidebarContainerRef.current.getBoundingClientRect();
      const windowInnerWidth: number = Math.min(containerRect.width, window.innerWidth);

      // The value 768px is breakpoint 'md' in tailwind Responsive design.
      if (768 <= windowInnerWidth) {
        if (windowInnerWidth < minSidebarWidth) {
          setResizableSidebarWidth(0);
          saveInitialSidebarWidth(0);
        }

        setResizableSidebarWidth((prevWidth: number) => {
          const newWidth = (windowInnerWidth < prevWidth) ? (windowInnerWidth - (sidebarResizerRef.current?.clientWidth || 0)) : prevWidth;

          console.assert(newWidth >= 0);
          saveInitialSidebarWidth(newWidth);
          return newWidth;
        });
      }
    }

  };

  // Adjust the gap or interval of sidebar resizer when sidebar has exceeded width to the screen
  React.useEffect(() => {
    if (!sidebarResizerRef.current || !sidebarContainerRef.current) {
      return;
    }

    console.assert(sidebarResizerRef.current.clientWidth < sidebarContainerRef.current.clientWidth)
    const validWidth: number = (sidebarContainerRef.current.clientWidth - sidebarResizerRef.current.clientWidth);

    if (validWidth < resizableSidebarWidth) {
      setResizableSidebarWidth(validWidth);
    }

    // console.log("validWidth:", validWidth);
  }, [sidebarResizerRef, sidebarContainerRef, resizableSidebarWidth]);

  const sidebarProps: SidebarProps = {
    currentPath: currentMainPanelPath,

    onItemClick: clickSidebarItem,

    toggleSidebarShown: () => setIsMobileSidebarShown(prev => !prev),

    dropdownMenu: sidebarDropdownMenu,
    toggleDropdownMenu: toggleSidebarDropdownMenu,
  };

  // Resize event
  React.useEffect(() => {
    const handleResize = () => {
      adjustSidebarForWindowResize();

    };

    window.addEventListener('resize', handleResize);

    loadCurrentMainPanel();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Listen for browser back/forward navigation
  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // console.log('Browser navigation detected:', event.state);

      // Restore state from the history state
      if (event.state) {
      } else {
        // No state means we're back to initial state

      }

      event;

      loadCurrentMainPanel();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Resizable sidebar handlers
  React.useEffect(() => {
    if (isResizableSidebarDragging) {
      document.addEventListener('mousemove', handleSidebarResizerPointerMove);
      document.addEventListener('mouseup', handleSidebarResizerPointerUp);
      document.addEventListener('touchmove', handleSidebarResizerPointerMove, { passive: false });
      document.addEventListener('touchend', handleSidebarResizerPointerUp);

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.body.style.touchAction = 'none'; // Prevent scrolling on mobile
    }

    return () => {
      document.removeEventListener('mousemove', handleSidebarResizerPointerMove);
      document.removeEventListener('mouseup', handleSidebarResizerPointerUp);
      document.removeEventListener('touchmove', handleSidebarResizerPointerMove);
      document.removeEventListener('touchend', handleSidebarResizerPointerUp);

      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
    };
  }, [isResizableSidebarDragging, handleSidebarResizerPointerMove, handleSidebarResizerPointerUp]);

  return (
    <div className="font-sans w-full h-screen flex flex-col items-center justify-between gap-0 px-0 overflow-hidden">
      <Header isSidebarShown={isMobileSidebarShown} toggleSidebarShown={() => setIsMobileSidebarShown(prev => !prev)} />

      {/* Subheader: Sidebar button, Quick access, Favorites */}
      <div className="w-full h-8 flex flex-row justify-start items-center bg-white border-b-1 border-black">
        <div className="h-full flex flex-row justify-start items-center">
          <div className="h-full flex flex-col justify-center cursor-pointer" onClick={() => toggleSidebar()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <div
            className="hidden md:block h-full cursor-pointer"
            onClick={() => resetSidebar()}
          >
            <div
              className={clsx(
                "h-full flex flex-col justify-center",
                resizableSidebarWidth === 0 && "hidden",
                resizableSidebarWidth <= initSidebarWidth && "hidden",
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
              </svg>
            </div>
            <div
              className={clsx(
                "h-full flex flex-col justify-center",
                resizableSidebarWidth === 0 && "hidden",
                resizableSidebarWidth >= initSidebarWidth && "hidden",
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>
          </div>
        </div>
        <div className="h-4 ml-1 border-gray-300 border-r-2 rounded-lg" />
      </div>

      <main
        ref={sidebarContainerRef}
        className={clsx(
          "relative w-full flex-1 ",
          "flex flex-row justify-start items-center gap-0",
          "md:grid",
          "overflow-y-hidden",
        )}
        style={{
          gridTemplateColumns: `${resizableSidebarWidth}px 7px 1fr`
        }}
      >

        {/* Desktop Sidebar */}
        <div
          className={clsx(
            "hidden md:block",
            "min-w-0 w-fit h-full",
            "overflow-y-scroll overflow-x-auto",
          )}
          style={{
            width: `${resizableSidebarWidth}px`
          }}
        >
          <Sidebar {...sidebarProps} />
        </div>
        {/* Mobile Sidebar */}
        <div className={clsx(
          "block md:hidden absolute inset-0 flex flex-row z-10",
          !isMobileSidebarShown && "hidden",
        )}>
          <div className="w-full sm:w-fit h-full overflow-y-scroll overflow-x-auto bg-white">
            <Sidebar {...sidebarProps} />
          </div>
          <div className="bg-black opacity-30 flex-1 h-full" onClick={() => setIsMobileSidebarShown(prev => !prev)} />
        </div>

        <div
          ref={sidebarResizerRef}
          className={clsx(
            "hidden md:flex bg-transparent cursor-col-resize h-full",
          )}
          onMouseDown={handleSidebarResizerPointerDown}
          onTouchStart={handleSidebarResizerPointerDown}
        >
          <div
            className={clsx(
              "w-full h-full flex justify-center items-center",
              "border-black border-x-1"
            )}
          >
            <div
              className={clsx(
                "w-1 h-10",
                isResizableSidebarDragging ? 'bg-blue-500' : 'bg-gray-400',
              )}
            />
          </div>
        </div>

        {/* Main content area: This area displays the main panels */}
        <div className="absolute md:relative w-full md:flex-1 h-full overflow-hidden">
          <MainPanelWrapper path={currentMainPanelPath} resetPath={() => resetCurrentMainPanelPath()} />
        </div>

      </main >

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

      {(dialog !== null) && (
        <Dialog
          onClose={() => setDialog(null)}
          ctx={dialog} />
      )}

    </div >
  );
}

export default App;
