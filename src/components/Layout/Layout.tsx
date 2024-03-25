import {Sidebar} from 'components/SideBar/SideBar';
import TopBar from 'components/TopBar/TopBar';
import React from 'react';
import {useLocation} from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  noLayoutRoutes: string[];
};

const Layout: React.FC<Props> = ({children, noLayoutRoutes}) => {
  const {pathname} = useLocation();
  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>;
  }
  return (
    <div className="w-full flex items-start justify-start h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto bg-[color:var(--variable-collection-light)]">
        <TopBar />
        <div className="lg:w-[calc(100vw-292px)] h-[calc(100vh-5rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
