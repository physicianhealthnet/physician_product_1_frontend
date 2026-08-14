import React from 'react';
import { ThinkingOrb } from 'thinking-orbs';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50/50 backdrop-blur-md z-50">
            <div className="relative">
                {/* Ambient Soft Glows */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-3xl rounded-full animate-pulse"></div>

                {/* Glassmorphism Card Wrapper */}
                <div className="relative flex flex-col items-center gap-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_24px_48px_-12px_rgba(71,85,105,0.08)] rounded-3xl p-10 min-w-[280px]">
                    <div className="flex items-center justify-center h-20 w-20">
                        <ThinkingOrb state="searching" size={64} />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-800 tracking-[0.25em] uppercase">
                            PHN Workstation
                        </h2>
                        <span className="text-xs text-slate-400 font-medium">Curating your workspace...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
