import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Documentation() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050B14] text-white p-8 font-sans">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back to Home</span>
            </button>

            <div className="max-w-4xl mx-auto space-y-8">
                <header className="border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-white/5">
                            <FileText className="text-gray-400" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Documentation</h1>
                            <p className="text-gray-400">Technical specifications and methodology</p>
                        </div>
                    </div>
                </header>

                <div className="grid gap-6">
                    <section className="bg-[#0B1221] p-6 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-4 text-cyan-400">System Architecture</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            AquaThermX uses a hybrid sensing approach, fusing optical satellite telemetry (Sentinel-2 L2A)
                            with ground-level IoT sensor arrays to determine the Urban Risk Index.
                        </p>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-400">
                            [Architecture Diagram Placeholder]
                        </div>
                    </section>

                    <section className="bg-[#0B1221] p-6 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-4 text-cyan-400">Methodology</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            <li><strong>Plastic Detection:</strong> YOLOv8 (Nano) model trained on specific waste signatures.</li>
                            <li><strong>Heat Index:</strong> Comparative analysis of surface temperature vs. baseline vegetation cooling.</li>
                            <li><strong>Water Deficit:</strong> Calculated using NDVI inverse correlation.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
