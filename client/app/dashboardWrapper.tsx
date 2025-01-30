"use client"; /* Necesario que sea cliente el wrapper */

import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import { useEffect } from "react";

/* No se puede usar REDUX en este componente, tiene que estar
  envuelto en un provider, que es el dashboardWeapper */
function DashboardLayout({children} : {children: React.ReactNode}){
  
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if(isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  })

  return (
    <div className={`${isDarkMode ? "dark" : "light"} flex bg-gray-50 text-bg-900 w-full min-h-screen`}>
        {/*SideBar*/}
        <Sidebar />

        {/*Main Content of Page*/}
        <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export default function DashboardWrapper({children} : {children: React.ReactNode}) {
  return (
    <StoreProvider> {/* Wrap application with redux */}
      <DashboardLayout> {/* Dashboard Layout */ }
        {children} 
      </DashboardLayout>
    </StoreProvider>
  )
}