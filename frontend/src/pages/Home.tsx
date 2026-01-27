
import { Link } from 'react-router-dom';
import { Activity, LayoutGrid, FileText, Settings, ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-[#050B14] text-white flex flex-col items-center justify-center p-8 font-sans selection:bg-cyan-500/30 relative overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="z-10 text-center max-w-4xl w-full">

                {/* Hero Section */}
                <div className="mb-12 space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 shadow-2xl shadow-cyan-900/50 mb-6 border border-white/10">
                        <Activity size={40} className="text-white" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-500 leading-tight">
                        AquaThermX
                        <span className="block text-2xl md:text-3xl font-mono font-medium text-cyan-400 mt-2 tracking-widest uppercase opacity-80">Research Console</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Advanced urban heat island monitoring system using plastic density proxies and satellite telemetry.
                    </p>
                </div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                    {/* Console Card */}
                    <Link to="/console" className="group relative bg-[#0B1221] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20 flex flex-col items-center text-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="mb-6 p-4 bg-cyan-900/20 rounded-full text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                            <LayoutGrid size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Launch Console</h3>
                        <p className="text-sm text-gray-500 mb-6">Access the main analysis dashboard, map interface, and causality simulation tools.</p>
                        <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-600 group-hover:text-cyan-400 transition-colors">
                            Enter System <ArrowRight size={14} />
                        </span>
                    </Link>

                    {/* Documentation Card (Future) */}
                    <div className="group relative bg-[#0B1221] border border-white/5 rounded-2xl p-8 transition-all opacity-50 cursor-not-allowed flex flex-col items-center text-center grayscale">
                        <div className="mb-6 p-4 bg-gray-800 rounded-full text-gray-500">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-400 mb-2">Documentation</h3>
                        <p className="text-sm text-gray-600 mb-6">Technical specifications, API reference, and methodology reports.</p>
                        <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                            Coming Soon
                        </span>
                    </div>

                    {/* Settings Card (Future) */}
                    <div className="group relative bg-[#0B1221] border border-white/5 rounded-2xl p-8 transition-all opacity-50 cursor-not-allowed flex flex-col items-center text-center grayscale">
                        <div className="mb-6 p-4 bg-gray-800 rounded-full text-gray-500">
                            <Settings size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-400 mb-2">Settings</h3>
                        <p className="text-sm text-gray-600 mb-6">System configuration, API keys, and user preferences.</p>
                        <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                            Restricted
                        </span>
                    </div>

                </div>

                <div className="mt-12 flex items-center justify-center gap-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                    <span>v2.1.0-RC</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                    <span>System Operational</span>
                </div>

            </div>
        </div>
    );
}
