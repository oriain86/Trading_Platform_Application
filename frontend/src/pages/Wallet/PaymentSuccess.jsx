// src/pages/Wallet/PaymentSuccess.jsx

import { getUserWallet } from '@/Redux/Wallet/Action'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReloadIcon } from '@radix-ui/react-icons'
import { DollarSignIcon, WalletIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * PaymentSuccess Component - Confirmation screen shown after successful payment
 * Displays the current wallet balance and allows refreshing the balance
 * 
 * @returns {JSX.Element} Rendered PaymentSuccess component
 */
const PaymentSuccess = () => {
  const dispatch = useDispatch();
  // Access wallet state from Redux store
  const { wallet } = useSelector((store) => store);

  /**
   * Fetch updated wallet information from the server
   * Used when user clicks the reload button
   */
  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };
  
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {/* Success message */}
      <h1 className='text-2xl font-semibold pb-5'>Payment Added Successfully</h1>
      
      {/* Wallet balance card */}
      <Card className="w-[50%]">
        <CardHeader className="pb-9">
          <div className="flex justify-between items-center">
            {/* Card title with wallet icon */}
            <div className="flex items-center gap-5">
              <WalletIcon className="h-8 w-8" />
              <CardTitle className="text-2xl">My Balance</CardTitle>
            </div>
            
            {/* Refresh button */}
            <div>
              <Button
                onClick={handleFetchUserWallet}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <ReloadIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {/* Wallet balance display */}
        <CardContent>
          <div className="flex items-center">
            <DollarSignIcon />
            <span className="text-2xl font-semibold">
              {wallet.userWallet?.balance}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentSuccess 
