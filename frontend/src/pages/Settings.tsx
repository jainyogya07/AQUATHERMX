import { Settings as SettingsIcon, ArrowLeft, ToggleLeft, ToggleRight, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Settings() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className="min-h-screen bg-[#050B14] text-white p-8 font-sans">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back to Home</span>
            </button>

            <div className="max-w-2xl mx-auto space-y-8">
                <header className="border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-white/5">
                            <SettingsIcon className="text-gray-400" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">System Configuration</h1>
                            <p className="text-gray-400">Manage API keys and preferences</p>
                        </div>
                    </div>
                </header>

                <div className="space-y-4">
                    <div className="bg-[#0B1221] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold">Real-time Notifications</h3>
                            <p className="text-sm text-gray-400">Receive alerts when heat index > 7.0</p>
                        </div>
                        <button onClick={() => setNotifications(!notifications)} className="text-cyan-500">
                            {notifications ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-gray-600" />}
                        </button>
                    </div>

                    <div className="bg-[#0B1221] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold">Dark Mode</h3>
                            <p className="text-sm text-gray-400">High contrast interface for operations</p>
                        </div>
                        <button onClick={() => setDarkMode(!darkMode)} className="text-cyan-500">
                            {darkMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-gray-600" />}
                        </button>
                    </div>

                    <div className="bg-[#0B1221] p-6 rounded-2xl border border-white/5">
                        <h3 className="font-bold mb-4">API Configuration</h3>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase">Sentinel Hub Client ID</label>
                            <input
                                type="password"
                                value="************************"
                                disabled
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-gray-400 font-mono"
                            />
                        </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
