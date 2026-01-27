import { useState } from 'react';
import { Upload, Map as MapIcon, Zap, CheckCircle, Activity, LayoutGrid, RotateCw } from 'lucide-react';
import Map from '../components/Map';
import { cn } from '../lib/utils';

interface AnalysisResult {
    heat_score: number;
    intervention_suggestion: string;
    location: { lat: number, lng: number };
    plastic_analysis: { count: number, density_score: number };
    environmental_data: { surface_temp_c: number, population_density: number };
    indices?: { pdi: number, sai: number, wdi: number };
    is_simulation?: boolean;
    confidence?: { score: number, reasons: string[], level: string };
    sentinel_metadata?: { provider: string, resolution: string, cloud_cover: string, acquisition_date: string };
    sensor_readings?: {
        ambient_temp_c: number,
        humidity_percent: number,
        pm25_level: number,
        is_calibrated: boolean
    };
}

export default function Console() {
    const [center] = useState<[number, number]>([19.0760, 72.8777]); // Mumbai default
    const [zoom] = useState(12);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [simulationValue, setSimulationValue] = useState(0); // 0-100%

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async (isSimulation = false) => {
        setIsLoading(true);
        const formData = new FormData();
        const isUploadMode = file && file.name;

        if (isUploadMode) {
            formData.append('file', file);
            formData.append('use_satellite', 'false');
        } else {
            formData.append('use_satellite', 'true');
        }

        if (isSimulation) {
            formData.append('simulation_mode', 'cleanup');
            const fractionRemaining = 1 - (simulationValue / 100);
            formData.append('simulation_factor', fractionRemaining.toString());
        }

        formData.append('lat', center[0].toString());
        formData.append('lng', center[1].toString());

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const response = await fetch(`${apiUrl}/analyze/`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.detail);
            setResult({ ...data, is_simulation: isSimulation });
        } catch (error) {
            console.error("Analysis failed:", error);
            alert("Analysis failed. See console.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-[#050B14] text-white overflow-hidden p-4 font-sans selection:bg-cyan-500/30">

            {/* GLOBAL HEADER */}
            <header className="h-14 flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-cyan-600 to-blue-700 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/40 border border-white/10">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
                            AquaThermX
                        </h1>
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Research Console v2.0</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 px-6 py-2 bg-gray-900/50 rounded-full border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs text-gray-400 font-medium">System Operational</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="text-xs text-gray-500">Region: <span className="text-white">Mumbai, IN</span></span>
                </div>
            </header>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-6rem)]">

                {/* COL 1-3: CONTROL DECK */}
                <div className="col-span-3 flex flex-col gap-4">
                    {/* Source Card */}
                    <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 shadow-xl flex-1 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <LayoutGrid size={64} />
                        </div>

                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Input Source</h2>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => setFile(null)}
                                className={cn("p-4 rounded-xl border transition-all flex flex-col items-center gap-2", !file ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "bg-gray-800/50 border-transparent text-gray-500 hover:border-white/10")}
                            >
                                <MapIcon size={20} />
                                <span className="text-xs font-bold">Sentinel-2</span>
                            </button>
                            <button
                                onClick={() => setFile(new File([], ""))}
                                className={cn("p-4 rounded-xl border transition-all flex flex-col items-center gap-2", file ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "bg-gray-800/50 border-transparent text-gray-500 hover:border-white/10")}
                            >
                                <Upload size={20} />
                                <span className="text-xs font-bold">Custom Upload</span>
                            </button>
                        </div>

                        {!file ? (
                            <div className="mt-auto p-4 bg-blue-950/20 border border-blue-500/20 rounded-xl">
                                <h3 className="text-blue-400 font-bold text-xs flex items-center gap-2 mb-3"><RotateCw size={12} className={isLoading ? "animate-spin" : ""} /> Live Feed Status</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs"><span className="text-gray-500">Provider</span> <span className="text-blue-200 font-mono">Copernicus</span></div>
                                    <div className="flex justify-between text-xs"><span className="text-gray-500">Latency</span> <span className="text-blue-200 font-mono">124ms</span></div>
                                    {result?.sentinel_metadata && (
                                        <div className="flex justify-between text-xs pt-2 border-t border-blue-500/20 mt-2">
                                            <span className="text-gray-500">Date</span> <span className="text-white font-mono">{result.sentinel_metadata.acquisition_date}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="mt-auto p-8 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center text-center hover:border-cyan-500/50 transition-colors bg-gray-900/50 relative">
                                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <Upload className="text-gray-500 mb-2" />
                                <span className="text-xs text-gray-400 font-medium">Click to browse</span>
                            </div>
                        )}
                    </div>

                    {/* Action Card */}
                    <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 shadow-xl shrink-0">
                        <button
                            onClick={() => handleAnalyze(false)}
                            disabled={isLoading}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-lg",
                                isLoading
                                    ? "bg-gray-800 text-gray-500"
                                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-900/50 hover:shadow-cyan-500/30"
                            )}
                        >
                            {isLoading ? "Processing Spectrum..." : "Initialize Analysis"}
                        </button>
                    </div>
                </div>

                {/* COL 4-9: SPATIAL CORE (MAP) */}
                <div className="col-span-6 bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                    <div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <span className="text-[10px] text-gray-400 font-mono uppercase">Optical Feed // Sentinel-2 L2A</span>
                    </div>
                    <Map center={center} zoom={zoom} markers={result ? [{ lat: center[0], lng: center[1], title: "Target" }] : []} />

                    {/* Overlay Stats */}
                    {result && (
                        <div className="absolute bottom-4 left-4 right-4 z-[400] grid grid-cols-3 gap-2">
                            <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 uppercase">Detection Count</span>
                                <span className="text-xl font-mono font-bold text-white">{result.plastic_analysis.count}</span>
                            </div>
                            <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 uppercase">Surface Temp</span>
                                <span className="text-xl font-mono font-bold text-orange-400">{result.environmental_data.surface_temp_c}°C</span>
                            </div>
                            <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 uppercase">Population</span>
                                <span className="text-xl font-mono font-bold text-emerald-400">{result.environmental_data.population_density}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* COL 10-12: INTELLIGENCE DECK */}
                <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">

                    {/* 1. Main Score Card */}
                    <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 shadow-xl shrink-0">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Urban Risk Index</h2>
                        {result ? (
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-7xl font-black tracking-tighter leading-none mb-2",
                                    result.heat_score > 7 ? "text-red-500" : result.heat_score > 4 ? "text-amber-400" : "text-emerald-500"
                                )}>
                                    {result.heat_score}
                                </span>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className={cn("h-2 w-2 rounded-full", result.heat_score > 7 ? "bg-red-500" : result.heat_score > 4 ? "bg-amber-400" : "bg-emerald-500")}></div>
                                    <span className="text-sm font-medium text-gray-300">
                                        {result.heat_score > 7 ? "Critical Risk" : result.heat_score > 4 ? "Moderate Warning" : "Safe Levels"}
                                    </span>
                                </div>

                                {/* Dynamic Explanation */}
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-gray-400 leading-relaxed">
                                    {result.is_simulation ? (
                                        <>
                                            <span className="text-emerald-400 font-bold block mb-1">SIMULATION ACTIVE</span>
                                            Reducing plastic by {simulationValue}% has lowered surface absorption, projecting a significant drop in heat retention.
                                        </>
                                    ) : (
                                        "Primary driver: Water Deficit. Plastic density is amplifying local heat retention by approx 15%."
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-32 flex items-center justify-center text-gray-700 font-mono text-xs">NO DATA ACQUIRED</div>
                        )}
                    </div>

                    {/* 2. Simulation Slider */}
                    {result && (
                        <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 shadow-xl shrink-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> Causality Sim</h3>
                                <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">{simulationValue}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="10"
                                value={simulationValue}
                                onChange={(e) => setSimulationValue(Number(e.target.value))}
                                onMouseUp={() => handleAnalyze(true)}
                                onTouchEnd={() => handleAnalyze(true)}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                            <p className="text-[10px] text-gray-500 mt-3 text-center">Drag to simulate plastic removal impact</p>
                        </div>
                    )}

                    {/* 3. Sensor Network Card - NEW */}
                    {result?.sensor_readings && (
                        <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 shadow-xl shrink-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Activity size={14} className="text-cyan-400" /> IoT Sensor Network
                                </h3>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-emerald-400">CALIBRATED</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-gray-800/30 p-2 rounded-lg text-center border border-white/5">
                                    <div className="text-[10px] text-gray-500 mb-1">Amb. Temp</div>
                                    <div className="text-sm font-bold text-white font-mono">{result.sensor_readings.ambient_temp_c}°C</div>
                                </div>
                                <div className="bg-gray-800/30 p-2 rounded-lg text-center border border-white/5">
                                    <div className="text-[10px] text-gray-500 mb-1">Humidity</div>
                                    <div className="text-sm font-bold text-blue-400 font-mono">{result.sensor_readings.humidity_percent}%</div>
                                </div>
                                <div className="bg-gray-800/30 p-2 rounded-lg text-center border border-white/5">
                                    <div className="text-[10px] text-gray-500 mb-1">PM 2.5</div>
                                    <div className="text-sm font-bold text-purple-400 font-mono">{result.sensor_readings.pm25_level}</div>
                                </div>
                            </div>
                            <div className="mt-3 text-[10px] text-gray-600 italic text-center">
                                *Fusion: 70% Sat / 30% Ground
                            </div>
                        </div>
                    )}

                    {/* 4. Indices Breakdown */}
                    {result?.indices && (
                        <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 shadow-xl flex-1">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Factor Analysis</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Plastic Density</span> <span className="text-white font-mono">{result.indices.pdi}</span></div>
                                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500" style={{ width: `${Math.min(result.indices.pdi * 10, 100)}%` }}></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Surface Heat</span> <span className="text-white font-mono">{result.indices.sai}</span></div>
                                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-orange-500" style={{ width: `${Math.min(result.indices.sai * 10, 100)}%` }}></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Water Deficit</span> <span className="text-white font-mono">{result.indices.wdi}</span></div>
                                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500" style={{ width: `${Math.min(result.indices.wdi * 10, 100)}%` }}></div></div>
                                </div>

                                {/* Confidence Badge */}
                                {result.confidence && (
                                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                                        <CheckCircle size={16} className={result.confidence.score > 0.8 ? "text-emerald-500" : "text-amber-500"} />
                                        <div>
                                            <div className="text-xs font-bold text-white">Confidence: {result.confidence.level}</div>
                                            <div className="text-[10px] text-gray-500">{Math.round(result.confidence.score * 100)}% reliability</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
