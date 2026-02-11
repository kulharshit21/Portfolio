import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center z-50">
            <div className="text-center">
                {/* Animated Logo/Initials */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-blue-400">HK</span>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <h2 className="text-2xl font-semibold text-white mb-2">
                    Loading Portfolio
                </h2>
                <div className="flex gap-1 justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>

            {/* Background stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="stars"></div>
                <div className="twinkle"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
