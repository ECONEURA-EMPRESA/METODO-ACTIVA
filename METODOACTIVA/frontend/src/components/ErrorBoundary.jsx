import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
                        <p className="text-gray-500 mb-6">
                            Ha ocurrido un error inesperado en la aplicación. Hemos notificado al equipo técnico.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-brand-blue text-white font-bold rounded-lg shadow-lg hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 w-full"
                        >
                            <RefreshCw size={18} /> Recargar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
