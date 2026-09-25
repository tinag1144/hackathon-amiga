import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex justify-center items-start sm:py-6 sm:px-4 selection:bg-[#118ab2] selection:text-white">
      <div className="w-full max-w-md bg-[#FAF9F5] sm:bg-[#FAF9F5] sm:rounded-4xl sm:shadow-2xl sm:border sm:border-[#073b4c]/10 min-h-screen sm:min-h-[844px] flex flex-col relative overflow-hidden">
        {/* Soft background decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd166]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#118ab2]/5 rounded-full blur-3xl pointer-events-none -ml-24" />

        {children}
      </div>
    </div>
  );
};
