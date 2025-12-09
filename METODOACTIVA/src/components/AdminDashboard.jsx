import React, { useState, useEffect } from 'react';
import { Lock, Users, MessageSquare, X, ShieldCheck, Download } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from '../firebase';

const AdminDashboard = ({ isOpen, onClose }) => {
    const [accessKey, setAccessKey] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState({ leads: [], chats: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [lastLead, setLastLead] = useState(null);
    const [lastChat, setLastChat] = useState(null);
    const [hasMoreLeads, setHasMoreLeads] = useState(true);
    const PAGE_SIZE = 20;

    const fetchMoreLeads = async () => {
        if (!lastLead || !hasMoreLeads) return;

        try {
            const leadsRef = collection(db, "leads");
            const q = query(leadsRef, orderBy("timestamp", "desc"), startAfter(lastLead), limit(PAGE_SIZE));
            const snap = await getDocs(q);

            if (snap.empty) {
                setHasMoreLeads(false);
                return;
            }

            const newLeads = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString()
            }));

            setData(prev => ({ ...prev, leads: [...prev.leads, ...newLeads] }));
            setLastLead(snap.docs[snap.docs.length - 1]);
        } catch (err) {
            console.error("Pagination error:", err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (accessKey !== import.meta.env.VITE_ADMIN_KEY) {
            setError('Clave incorrecta');
            setLoading(false);
            return;
        }

        try {
            const leadsRef = collection(db, "leads");
            const chatsRef = collection(db, "chat_logs");

            // Initial Load
            const leadsQuery = query(leadsRef, orderBy("timestamp", "desc"), limit(PAGE_SIZE));
            const chatsQuery = query(chatsRef, orderBy("timestamp", "desc"), limit(PAGE_SIZE));

            const [leadsSnap, chatsSnap] = await Promise.all([
                getDocs(leadsQuery),
                getDocs(chatsQuery)
            ]);

            const leadsData = leadsSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString()
            }));

            const chatsData = chatsSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString()
            }));

            setData({ leads: leadsData, chats: chatsData });
            setLastLead(leadsSnap.docs[leadsSnap.docs.length - 1]);
            setHasMoreLeads(!leadsSnap.empty && leadsSnap.docs.length === PAGE_SIZE);
            setIsAuthenticated(true);
            localStorage.setItem('admin_key', accessKey);
        } catch (err) {
            console.error(err);
            setError('Error de conexión a base de datos');
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        if (!data.leads.length) return;

        const headers = ["ID", "Email", "Fecha", "Fuente"];
        const rows = data.leads.map(l => [
            l.id,
            l.email,
            new Date(l.timestamp).toLocaleString(),
            l.source || 'web'
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers, ...rows].map(e => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `leads_metodo_activa_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const storedKey = localStorage.getItem('admin_key');
        if (storedKey && isOpen && !isAuthenticated) {
            setAccessKey(storedKey);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-[#00AEEF]" />
                        <h2 className="text-xl font-bold text-gray-800">Panel de Administración Aurora</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {!isAuthenticated ? (
                        <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4 mt-10">
                            <div className="text-center mb-8">
                                <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-600">Acceso Seguro</h3>
                            </div>
                            <input
                                type="password"
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                                placeholder="Clave de acceso maestra"
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00AEEF] outline-none"
                            />
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00AEEF] text-white py-4 rounded-xl font-bold hover:bg-[#008CCF] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Verificando...' : 'Entrar al Sistema'}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-8">
                            {/* LEADS SECTION */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="flex items-center gap-2 font-bold text-lg text-gray-700">
                                        <Users className="text-[#00AEEF]" /> Leads Capturados ({data.leads.length})
                                    </h3>
                                    <button
                                        onClick={downloadCSV}
                                        className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
                                    >
                                        <Download size={16} /> Exportar CSV
                                    </button>
                                </div>
                                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 font-medium">
                                            <tr>
                                                <th className="p-4">Email</th>
                                                <th className="p-4">Fecha</th>
                                                <th className="p-4">Origen</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {data.leads.map(lead => (
                                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-4 font-medium text-gray-800">{lead.email}</td>
                                                    <td className="p-4 text-gray-500">
                                                        {new Date(lead.timestamp).toLocaleDateString('es-ES', {
                                                            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </td>
                                                    <td className="p-4 text-gray-400 capitalize">{lead.source || 'web'}</td>
                                                </tr>
                                            ))}
                                            {data.leads.length === 0 && (
                                                <tr><td colSpan="3" className="p-8 text-center text-gray-400">No hay leads todavía</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {hasMoreLeads && (
                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={fetchMoreLeads}
                                            className="text-sm text-[#00AEEF] hover:text-[#008CCF] font-semibold transition-colors"
                                        >
                                            Cargar antiguos...
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* CHATS SECTION */}
                            <div>
                                <h3 className="flex items-center gap-2 font-bold text-lg text-gray-700 mb-4">
                                    <MessageSquare className="text-purple-500" /> Últimas Conversaciones ({data.chats.length})
                                </h3>
                                <div className="space-y-3">
                                    {data.chats.map(chat => (
                                        <div key={chat.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between text-xs text-gray-400 mb-2">
                                                <span>ID: {chat.id.slice(0, 8)}</span>
                                                <span>{new Date(chat.timestamp).toLocaleString()}</span>
                                            </div>
                                            <p className="text-gray-800 font-medium mb-1">👤 "{chat.query}"</p>
                                            <p className="text-gray-600 text-sm">🤖 "{chat.response?.slice(0, 100)}..."</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
