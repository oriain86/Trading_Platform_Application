/**
 * File: src/components/custom/SpinnerBackdrop.jsx
 * Description: Loading spinner overlay component that displays during async operations
 */

/**
 * SpinnerBackdrop - A fullscreen loading indicator with semi-transparent background
 * Used to prevent user interaction while operations are in progress
 * 
 * @returns {JSX.Element} A centered spinner with darkened backdrop
 */
const SpinnerBackdrop = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* 
        The spinner circle:
        - Uses border styling to create the spinner effect
        - Top border is lighter to create the spinning indicator
        - Animation is handled by Tailwind's animate-spin utility
      */}
      <div className="w-16 h-16 border-4 border-t-4 border-t-gray-200 border-gray-800 rounded-full animate-spin">
      </div>
    </div>
  );
};

export default SpinnerBackdrop;
