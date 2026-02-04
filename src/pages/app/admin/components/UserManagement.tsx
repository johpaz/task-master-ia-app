import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Search, ChevronRight, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserModalStore } from '@/stores/userModalStore';
import { userService } from '@/services/userService';
import { User } from '@/types';
import { motion } from 'framer-motion';

export const UserManagement = () => {
    const navigate = useNavigate();
    const { openModal } = useUserModalStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [recentUsers, setRecentUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentUsers = async () => {
            try {
                setLoading(true);
                const response = await userService.getUsers();
                const sortedUsers = response.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setRecentUsers(sortedUsers.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch recent users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentUsers();
    }, []);

    const filteredUsers = recentUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 h-full relative overflow-hidden"
        >
            <div className="relative z-10 mb-8 flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center space-x-3 text-emerald-400 mb-1">
                        <Users size={18} className="font-bold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Human Capital</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">Staff Reciente</h3>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openModal()}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-all font-black"
                >
                    <Plus size={20} />
                </motion.button>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400" size={16} />
                    <Input
                        placeholder="Interrogar base de personal..."
                        className="bg-white/5 border-white/5 rounded-2xl h-12 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-blue-500/30 transition-all text-xs font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="space-y-3">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                        ))
                    ) : (
                        filteredUsers.map((user) => (
                            <motion.div
                                key={user.id}
                                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.06)' }}
                                className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl cursor-pointer group transition-all"
                                onClick={() => navigate(`/users/${user.id}`)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-white/5 group-hover:border-blue-500/30 transition-all">
                                        <UserCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-black text-white tracking-tight leading-none mb-1.5">{user.name}</p>
                                        <div className="flex items-center space-x-2">
                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${user.role === 'admin' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                                                    user.role === 'manager' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                        'bg-slate-500/10 border-slate-500/20 text-slate-400'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                            </motion.div>
                        ))
                    )}
                </div>

                <Button
                    variant="ghost"
                    className="w-full h-12 rounded-2xl text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all transform active:scale-95"
                    onClick={() => navigate('/users')}
                >
                    Directorio Completo
                </Button>
            </div>
        </motion.div>
    );
};
