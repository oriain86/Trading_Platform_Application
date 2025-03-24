/**
 * File: src/pages/Home/AssetTable.jsx
 * Description: Scrollable table component for displaying cryptocurrency data
 */

// UI Components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// React and routing
import { useSelector } from "react-redux"; // Imported but not used
import { useNavigate } from "react-router-dom";

/**
 * Sample invoice data (not used in this component)
 * This appears to be example data that was kept in the file
 * but is not actually used by the AssetTable component
 */
export const invoices = [
  // ... (large array of invoice objects)
];

/**
 * AssetTable - Component for displaying cryptocurrency assets in a table format
 * 
 * Features:
 * - Scrollable container with fixed header
 * - Clickable rows that navigate to detailed coin view
 * - Visual indicators for price changes (green/red)
 * - Avatar images for each cryptocurrency
 * - Responsive height based on category
 * 
 * @param {Array} coins - Array of cryptocurrency objects with market data
 * @param {string} category - Category filter that affects table height ('all' or other)
 * @returns {JSX.Element} - The cryptocurrency asset table
 */
export function AssetTable({ coins, category }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <Table className="px-5 border-t relative">
      {/* Scrollable container with dynamic height based on category */}
      <ScrollArea className={category == "all" ? "h-[74vh]" : "h-[82vh]"}>
        {/* Table header - remains fixed during scrolling */}
        <TableHeader>
          <TableRow className="sticky top-0 left-0 right-0 bg-background">
            <TableHead className="py-4">Coin</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24H</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body - scrollable content */}
        <TableBody>
          {coins.map((item) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => navigate(`/market/${item.id}`)} // Navigate to coin detail page on click
              key={item.id}
            >
              {/* Coin name with avatar */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.image} alt={item.symbol} />
                </Avatar>
                <span>{item.name}</span>
              </TableCell>
              
              {/* Symbol (uppercase) */}
              <TableCell>{item.symbol.toUpperCase()}</TableCell>
              
              {/* Trading volume */}
              <TableCell>{item.total_volume}</TableCell>
              
              {/* Market capitalization */}
              <TableCell>{item.market_cap}</TableCell>
              
              {/* 24-hour change percentage with conditional color */}
              <TableCell
                className={`${
                  item.market_cap_change_percentage_24h < 0
                    ? "text-red-600"  // Red for negative change
                    : "text-green-600" // Green for positive change
                }`}
              >
                {item.market_cap_change_percentage_24h}%
              </TableCell>
              
              {/* Current price (right-aligned) */}
              <TableCell className="text-right">{item.current_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}  
