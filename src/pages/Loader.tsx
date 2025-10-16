import { Loader2 } from 'lucide-react';

function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/80 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Loading text with animation */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-lg font-medium">Please wait...</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
  )
}

export default Loader
