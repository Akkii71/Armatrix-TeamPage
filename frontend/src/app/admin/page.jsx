"use client";
import React, { useState, useEffect, useCallback } from 'react';

export default function AdminPage() {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: '', ini: '', role: '', bio: '', tags: '', li: ''
  });

  // 1. FETCH TEAM
  const fetchTeam = useCallback(() => {
    fetch('https://armatrix-teampage.onrender.com/api/team')
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // 2. ADD MEMBER
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMember = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    await fetch('https://armatrix-teampage.onrender.com/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember)
    });

    setFormData({ name: '', ini: '', role: '', bio: '', tags: '', li: '' });
    fetchTeam();
  };

  // 3. DELETE MEMBER (Fixed the syntax error here)
  const handleDelete = async (id) => {
    await fetch(`https://armatrix-teampage.onrender.com/api/team/${id}`, {
      method: 'DELETE'
    });
    fetchTeam();
  };

  return (
    <div className="min-h-screen bg-[#080C16] text-white p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#00FF88] font-mono">&gt;_ ARMATRIX_DATABASE_TERMINAL</h1>
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-10 shadow-2xl">
          <h2 className="text-xl mb-4 font-bold tracking-tight">Add New Team Member</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Full Name" className="bg-black/50 border border-white/10 p-3 rounded text-sm text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required placeholder="Initials (e.g. JD)" className="bg-black/50 border border-white/10 p-3 rounded text-sm text-white" value={formData.ini} onChange={e => setFormData({...formData, ini: e.target.value})} />
            <input required placeholder="Role" className="bg-black/50 border border-white/10 p-3 rounded text-sm text-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
            <input required placeholder="LinkedIn URL" className="bg-black/50 border border-white/10 p-3 rounded text-sm text-white" value={formData.li} onChange={e => setFormData({...formData, li: e.target.value})} />
            <input required placeholder="Tags (comma separated)" className="bg-black/50 border border-white/10 p-3 rounded text-sm text-white md:col-span-2" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
            <textarea required placeholder="Bio..." className="bg-black/50 border border-white/10 p-3 rounded text-sm text-white md:col-span-2 h-24" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
            
            <button type="submit" className="md:col-span-2 bg-[#00FF88] text-black font-bold py-3 rounded hover:bg-[#00cc6a] transition-all active:scale-95">
              INJECT_DATA_INTO_MAINFRAME
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl mb-4 font-bold tracking-tight">Current Directory</h2>
          <div className="flex flex-col gap-3">
            {team.map((member) => (
              <div key={member.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/5 border border-white/10 p-4 rounded-lg gap-4 hover:bg-white/[0.07] transition-colors">
                <div>
                  <p className="font-bold">{member.name} <span className="text-[10px] text-gray-500 font-mono ml-2 uppercase">ID: {member.id}</span></p>
                  <p className="text-xs text-[#00FF88] uppercase tracking-wider">{member.role}</p>
                </div>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded text-xs hover:bg-red-500 hover:text-white transition-all w-full md:w-auto"
                >
                  DELETE_RECORD
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}