/**
 * File: src/pages/Activity/Activity.jsx 
 * Description: Activity page that displays the user's trading history
 */

import TradingHistory from '../Portfolio/TradingHistory.jsx'

/**
 * Activity - Page component that shows trading history
 * 
 * @component
 * @returns {JSX.Element} - The activity page with trading history
 */
const Activity = () => {
  return (
    <div className='px-20'>
      {/* Page title with styling */}
      <p className='py-5 pb-10 text-2xl font-semibold'>Trading History</p>
      
      {/* Trading history component */}
      <TradingHistory/>
    </div>
  )
}

export default Activity 
