/**
 * File: src/pages/SideBar/SideBar.jsx
 * Description: Navigation sidebar component with menu items for the application
 */

// Redux actions
import { logout } from "@/Redux/Auth/Action";
import { useDispatch } from "react-redux";

// UI Components
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

// Icons
import {
  ExitIcon,
  HandIcon, // Imported but not used
  BookmarkFilledIcon, // Imported but not used
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  BellIcon, // Imported but not used
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, SettingsIcon, WalletIcon } from "lucide-react"; // SettingsIcon imported but not used

// React Router
import { useNavigate } from "react-router-dom";

/**
 * Menu items configuration array
 * Each item contains a name, path, and icon
 */
const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6" />,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-6 w-6" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon /> },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6" />,
  },
  { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> },
];

/**
 * SideBar - Navigation sidebar component with menu items
 * 
 * Features:
 * - Menu items with icons for navigation
 * - Special handling for logout action
 * - Close sheet when an item is clicked (for mobile navigation)
 * 
 * @returns {JSX.Element} The sidebar component
 */
const SideBar = () => {
  // Hooks for navigation and Redux actions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  /**
   * Handle user logout
   * Dispatches the logout action
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  /**
   * Handle menu item click
   * Special handling for logout, otherwise navigate to the path
   * 
   * @param {Object} item - The menu item that was clicked
   */
  const handleMenuClick = (item) => {
    if (item.name == "Logout") {
      handleLogout();
      navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mt-10 space-y-5">
      {/* Map through menu items to create navigation buttons */}
      {menu.map((item) => (
        <div key={item} className=""> {/* Note: Using item object as key which could cause issues */}
          {/* SheetClose ensures the sheet/drawer closes when an item is clicked */}
          <SheetClose className="w-full">
            <Button
              onClick={() => handleMenuClick(item)}
              variant="outline"
              className="flex items-center gap-5 py-6 w-full"
            >
              {/* Icon container with fixed width for alignment */}
              <span className="w-8">{item.icon}</span>
              
              {/* Menu item name */}
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default SideBar; 
