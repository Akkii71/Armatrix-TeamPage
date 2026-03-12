"use client"; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function TeamPage() {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    fetch('https://armatrix-teampage.onrender.com/api/team')
      .then((res) => res.json())
      .then((data) => setTeamData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080C16] text-white overflow-x-hidden font-sans">
      
      {/* --- 3D BACKGROUND: INTERACTION FIX --- */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full scale-[2.5] translate-y-[10%] md:scale-110 md:translate-y-0 md:origin-top transition-transform duration-700 ease-in-out">
          <iframe 
            src="https://my.spline.design/nexbotrobotcharacterconcept-3PtCn87VZhADwRspVRo4DOBW/" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            allow="autoplay; fullscreen; xr-spatial-tracking"
            className="w-full h-full opacity-80"
          ></iframe>
        </div>
        
        {/* pointer-events-none on overlays ensures mouse 'clicks through' to the robot */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C16]/80 via-transparent to-[#080C16] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080C16_90%)] opacity-40 pointer-events-none" />
      </div>

      {/* --- LOGO --- */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
        <img 
          src="/logo.png" 
          alt="Armatrix Logo" 
          className="h-10 md:h-14 opacity-90 hover:opacity-100 transition-opacity mix-blend-screen" 
        />
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      {/* We use pointer-events-none on the wrapper and 'auto' on interactive items */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pointer-events-none">
        
        <div className="h-[30vh] md:h-[45vh] w-full"></div>
        
        <div className="mb-12 md:mb-20 text-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 font-mono text-sm text-[#00FF88]"
          >
            Engineering Team
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase drop-shadow-xl leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#0088FF]">Minds</span> Behind<br/>The Matrix
          </h1>
        </div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamData.map((member) => (
            <motion.div 
              key={member.id} 
              variants={cardVariants} 
              whileHover={{ y: -10 }} 
              className="group relative bg-[#080C16]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col h-full pointer-events-auto"
            >
              <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF88] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scanline" />
              
              <div className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.02] z-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {member.ini}
              </div>

              <div className="flex flex-col h-full justify-between gap-6 relative z-10">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{member.name}</h3>
                    <span className="font-mono text-[10px] text-white/40 px-2 py-1 bg-white/5 rounded border border-white/5">ID:{member.id}</span>
                  </div>
                  <p className="font-mono text-xs text-[#00FF88] mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={member.li} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#00FF88] transition-colors mt-2 w-max"
                >
                  <FiLinkedin className="text-lg" />
                  <span>Establish Connection</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}