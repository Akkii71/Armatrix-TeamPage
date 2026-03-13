"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLinkedin, FiX } from "react-icons/fi";

const containerVariants = {
hidden: { opacity: 0 },
show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
hidden: { opacity: 0, y: 30 },
show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const lineVariants = {
hidden: { opacity: 0 },
show: {
opacity: [0, 1, 0],
x: ["-100%", "100%"],
transition: { duration: 3, repeat: Infinity, ease: "linear" }
}
};

const verticalScan = {
hidden: { opacity: 0 },
show: {
opacity: [0, 1, 0],
y: ["-100%", "100%"],
transition: { duration: 4, repeat: Infinity, ease: "linear" }
}
};

export default function TeamPage() {
const [teamData, setTeamData] = useState([]);
const [selectedMember, setSelectedMember] = useState(null);

useEffect(() => {
fetch("https://armatrix-teampage.onrender.com/api/team")
.then((res) => res.json())
.then((data) => setTeamData(data))
.catch((err) => console.error("Fetch error:", err));
}, []);

return (

<div className="relative min-h-screen bg-[#080C16] text-white overflow-x-hidden font-sans">

{/* 3D BACKGROUND */}

<div className="fixed inset-0 z-0 overflow-hidden">
<div className="relative w-full h-full scale-[1.6] translate-y-[8%] md:scale-110 md:translate-y-0 md:origin-top transition-transform duration-700 ease-in-out">
<iframe
src="https://my.spline.design/nexbotrobotcharacterconcept-3PtCn87VZhADwRspVRo4DOBW/"
frameBorder="0"
width="100%"
height="100%"
allow="autoplay; fullscreen; xr-spatial-tracking"
className="w-full h-full opacity-80"
/>
</div>

<div className="absolute inset-0 bg-gradient-to-b from-[#080C16]/80 via-transparent to-[#080C16] pointer-events-none" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080C16_90%)] opacity-40 pointer-events-none" />
</div>

{/* LOGO */}

<div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
<img
src="/logo.png"
alt="Armatrix Logo"
className="h-10 md:h-14 opacity-90 hover:opacity-100 transition-opacity mix-blend-screen"
/>
</div>

{/* CONTENT */}

<div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pointer-events-none">

<div className="h-[30vh] md:h-[45vh]" />

<div className="mb-12 md:mb-20 text-center pointer-events-auto">
<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 font-mono text-sm text-[#00FF88]"
>
Engineering Team
</motion.div>

<h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase drop-shadow-xl leading-tight">
The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#0088FF]">Minds</span>
<br/>Behind The Matrix
</h1>
</div>

<motion.div
variants={containerVariants}
initial="hidden"
animate="show"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"

>

{teamData.map((member) => (
<motion.div
key={member.id}
variants={cardVariants}
whileHover={{ y: -10 }}
onClick={() => setSelectedMember(member)}
className="cursor-pointer group relative bg-[#080C16]/80 border border-white/10 rounded-2xl p-6 md:p-12 backdrop-blur-sm md:backdrop-blur-md overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col h-full pointer-events-auto"

>

<motion.div
variants={lineVariants}
initial="hidden"
animate="show"
className="absolute top-1/2 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#00FF88] to-transparent opacity-40"
/>

<motion.div
variants={verticalScan}
initial="hidden"
animate="show"
className="absolute left-2 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#00FF88] to-transparent opacity-30"
/>

<div className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.02]">
{member.ini}
</div>

<div className="relative z-10">
<h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
<p className="text-xs text-[#00FF88] uppercase mt-1">{member.role}</p>
<p className="text-sm text-gray-400 mt-3 line-clamp-3">{member.bio}</p>
</div>

</motion.div>
))}
</motion.div>

</div>

{/* EXPANDED PROFILE */} <AnimatePresence>
{selectedMember && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
onClick={() => setSelectedMember(null)}

>

<motion.div
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.8, opacity: 0 }}
transition={{ type: "spring", stiffness: 120 }}
onClick={(e) => e.stopPropagation()}
className="relative bg-[#080C16] border border-white/10 rounded-3xl p-6 md:p-10 max-w-xl w-full shadow-[0_0_80px_rgba(0,255,136,0.2)]"

>

<button
onClick={() => setSelectedMember(null)}
className="absolute top-5 right-5 text-gray-400 hover:text-white"

>

<FiX size={22} />
</button>

<h2 className="text-2xl md:text-3xl font-bold">{selectedMember.name}</h2>
<p className="text-[#00FF88] font-mono mt-1">{selectedMember.role}</p>

<p className="text-gray-300 mt-6 leading-relaxed">
{selectedMember.bio}
</p>

<div className="flex flex-wrap gap-2 mt-6">
{selectedMember.tags.map((tag, i) => (
<span key={i} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded">
{tag}
</span>
))}
</div>

<a
href={selectedMember.li}
target="_blank"
className="flex items-center gap-2 mt-8 text-[#00FF88]"

>

<FiLinkedin />
Connect on LinkedIn
</a>

</motion.div>
</motion.div>
)} </AnimatePresence>

</div>
);
}
