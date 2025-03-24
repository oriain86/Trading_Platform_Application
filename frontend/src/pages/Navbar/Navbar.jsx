/**
 * File: src/pages/Navbar/Navbar.jsx
 * Description: Navigation bar component with sidebar drawer for the application
 */

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Imported but not used
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Icons
import {
  AvatarIcon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

// Components
import SideBar from "../SideBar/SideBar";

// React and routing
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Imported but not used
import { useSelector } from "react-redux";

/**
 * Navbar - Main navigation component for the application
 * 
 * Features:
 * - Slide-out sidebar menu accessed via hamburger button
 * - Application branding
 * - Search button
 * - User avatar with profile navigation
 * - Role-based navigation to admin or user profile pages
 * 
 * @returns {JSX.Element} The navigation bar component
 */
const Navbar = () => {
  // Hooks for navigation and Redux state
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  /**
   * Handle avatar click navigation based on user role
   * Navigates to admin page for admin users, or profile page for regular users
   */
  const handleNavigate = () => {
    if (auth.user) {
      auth.user.role === "ROLE_ADMIN" 
        ? navigate("/admin/withdrawal") 
        : navigate("/profile");
    }
  };

  return (
    <>
      {/* Main navbar container - sticky positioned at top */}
      <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
        {/* Left section - Menu, brand, search */}
        <div className="flex items-center gap-3">
          {/* Slide-out sidebar sheet component */}
          <Sheet className="">
            {/* Hamburger button to trigger sidebar */}
            <SheetTrigger>
              <Button
                className="rounded-full h-11 w-11"
                variant="ghost"
                size="icon"
              >
                <DragHandleHorizontalIcon className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            
            {/* Sidebar content */}
            <SheetContent
              className="w-72 border-r-0 flexs flex-col justify-center"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>
                  {/* App logo and branding in sidebar */}
                  <div className="text-3xl flex justify-center items-center gap-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://cdn.pixabay.com/photo/2015/11/23/12/28/letter-1058269_1280.jpg" />
                    </Avatar>
                    <div>
                      <span className="font-bold text-orange-700">Treu</span>
                      <span>Trade</span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              
              {/* Sidebar navigation component */}
              <SideBar />
            </SheetContent>
          </Sheet>

          {/* App name/brand - clickable to navigate home */}
          <p
            onClick={() => navigate("/")}
            className="text-sm lg:text-base cursor-pointer"
          >
            Treu Trading
          </p>

          {/* Search button */}
          <div className="p-0 ml-9">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="flex items-center gap-3"
            >
              <MagnifyingGlassIcon className="left-2 top-3" />
              <span>Search</span>
            </Button>
          </div>
        </div>
        
        {/* Right section - User avatar */}
        <div>
          <Avatar className="cursor-pointer" onClick={handleNavigate}>
            {/* Show default avatar icon if no user, otherwise show user's initial */}
            {!auth.user ? (
              <AvatarIcon className="h-8 w-8" />
            ) : (
              <AvatarFallback>{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar; 
