"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FiLinkedin, FiX } from "react-icons/fi";

const containerVariants = {
hidden: { opacity: 0 },
show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
hidden: { opacity: 0, y: 30 },
show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
};

export default function TeamPage() {

const [teamData, setTeamData] = useState([]);
const [selectedMember, setSelectedMember] = useState(null);

const networkCanvasRef = useRef(null);
const cursorCanvasRef = useRef(null);

/* ---------------- FETCH TEAM DATA ---------------- */

useEffect(()=>{

fetch("https://armatrix-teampage.onrender.com/api/team")
.then(res=>res.json())
.then(data=>setTeamData(data))
.catch(err=>console.error("Fetch error:",err));

},[]);

/* ---------------- NEURAL NETWORK BACKGROUND ---------------- */

useEffect(()=>{

const canvas = networkCanvasRef.current;
const ctx = canvas.getContext("2d");

let nodes=[];
const nodeCount=40;

function resize(){
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
}

resize();
window.addEventListener("resize",resize);

for(let i=0;i<nodeCount;i++){

nodes.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.25,
vy:(Math.random()-0.5)*0.25
});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<nodes.length;i++){

let n1=nodes[i];

n1.x+=n1.vx;
n1.y+=n1.vy;

if(n1.x<0||n1.x>canvas.width) n1.vx*=-1;
if(n1.y<0||n1.y>canvas.height) n1.vy*=-1;

ctx.beginPath();
ctx.arc(n1.x,n1.y,2,0,Math.PI*2);
ctx.fillStyle="rgba(0,255,136,0.5)";
ctx.fill();

for(let j=i+1;j<nodes.length;j++){

let n2=nodes[j];
let dx=n1.x-n2.x;
let dy=n1.y-n2.y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<110){

ctx.beginPath();
ctx.moveTo(n1.x,n1.y);
ctx.lineTo(n2.x,n2.y);
ctx.strokeStyle=`rgba(0,255,136,${0.15-(dist/700)})`;
ctx.lineWidth=1;
ctx.stroke();

}

}

}

requestAnimationFrame(draw);

}

draw();

return ()=>window.removeEventListener("resize",resize);

},[]);

/* ---------------- LIQUID CURSOR ---------------- */

useEffect(()=>{

const canvas = cursorCanvasRef.current;
const ctx = canvas.getContext("2d");

let blobs=[];
const maxBlobs=40;

function resize(){
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
}

resize();
window.addEventListener("resize",resize);

window.addEventListener("mousemove",(e)=>{

blobs.push({
x:e.clientX,
y:e.clientY,
radius:18,
alpha:0.9
});

if(blobs.length>maxBlobs) blobs.shift();

});

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.globalCompositeOperation="lighter";

blobs.forEach((b,i)=>{

b.radius*=0.97;
b.alpha*=0.94;

const gradient = ctx.createRadialGradient(
b.x,b.y,0,
b.x,b.y,b.radius
);

gradient.addColorStop(0,"rgba(255,220,60,0.9)");
gradient.addColorStop(0.3,"rgba(255,80,140,0.6)");
gradient.addColorStop(1,"rgba(255,80,140,0)");

ctx.beginPath();
ctx.fillStyle=gradient;
ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);
ctx.fill();

});

requestAnimationFrame(animate);

}

animate();

return ()=>window.removeEventListener("resize",resize);

},[]);

/* ---------------- CARD BURST ---------------- */

function createBurst(x,y){

const burst=document.createElement("div");
burst.className="fixed pointer-events-none z-[200]";
burst.style.left=x+"px";
burst.style.top=y+"px";

for(let i=0;i<12;i++){

const p=document.createElement("div");

p.style.position="absolute";
p.style.width="4px";
p.style.height="4px";
p.style.background="#00FF88";
p.style.borderRadius="50%";

const angle=Math.random()*Math.PI*2;
const distance=60+Math.random()*60;

p.animate([
{transform:"translate(0,0)",opacity:1},
{transform:`translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance}px)`,opacity:0}
],{
duration:650,
easing:"ease-out"
});

burst.appendChild(p);

}

document.body.appendChild(burst);
setTimeout(()=>burst.remove(),650);

}

/* ---------------- PAGE ---------------- */

return(

<LayoutGroup>

<div className="relative min-h-screen bg-[#080C16] text-white overflow-x-hidden font-sans">

{/* Neural Network */} <canvas
ref={networkCanvasRef}
className="fixed inset-0 z-[1] pointer-events-none"
/>

{/* Liquid Cursor */} <canvas
ref={cursorCanvasRef}
className="fixed inset-0 z-[2] pointer-events-none"
/>

{/* Robot Background */}

<div className="fixed inset-0 z-0 overflow-hidden">

<div className="relative w-full h-full scale-[1.6] translate-y-[8%] md:scale-110 md:translate-y-0 md:origin-top">

<iframe
src="https://my.spline.design/nexbotrobotcharacterconcept-3PtCn87VZhADwRspVRo4DOBW/"
frameBorder="0"
width="100%"
height="100%"
allow="autoplay; fullscreen; xr-spatial-tracking"
className="w-full h-full opacity-80"
/>

</div>

<div className="absolute inset-0 bg-gradient-to-b from-[#080C16]/80 via-transparent to-[#080C16] pointer-events-none"/>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080C16_90%)] opacity-40 pointer-events-none"/>

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
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 font-mono text-sm text-[#00FF88]"

>

Engineering Team
</motion.div>

<h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase leading-tight">
The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#0088FF]">Minds</span>
<br/>Behind The Matrix
</h1>

</div>

<motion.div
variants={containerVariants}
initial="hidden"
animate="show"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"

>

{teamData.map(member=>(

<motion.div
layoutId={`card-${member.id}`}
key={member.id}
variants={cardVariants}
whileHover={{y:-10,scale:1.05}}
transition={{type:"spring",stiffness:280,damping:25}}
onClick={(e)=>{
createBurst(e.clientX,e.clientY);
setSelectedMember(member);
}}
className="cursor-pointer group relative bg-[#080C16]/80 border border-white/10 rounded-2xl p-6 md:p-12 backdrop-blur-sm overflow-hidden hover:bg-white/[0.08] hover:border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col h-full pointer-events-auto"

>

<div className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.02]">
{member.ini}
</div>

<div className="relative z-10">

<h3 className="text-lg md:text-xl font-bold">
{member.name}
</h3>

<p className="text-xs text-[#00FF88] uppercase mt-1">
{member.role}
</p>

<p className="text-sm text-gray-400 mt-3 line-clamp-3">
{member.bio}
</p>

</div>

</motion.div>

))}

</motion.div>

</div>

{/* MODAL */}

<AnimatePresence>

{selectedMember && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4"
onClick={()=>setSelectedMember(null)}

>

<motion.div
layoutId={`card-${selectedMember.id}`}
initial={{scale:0.6,opacity:0}}
animate={{scale:1,opacity:1}}
exit={{scale:0.6,opacity:0}}
transition={{type:"spring",stiffness:200,damping:20}}
className="relative bg-[#080C16] border border-white/10 rounded-3xl p-6 md:p-10 max-w-xl w-full shadow-[0_0_80px_rgba(0,255,136,0.25)]"
onClick={(e)=>e.stopPropagation()}

>

<button
onClick={()=>setSelectedMember(null)}
className="absolute top-5 right-5 text-gray-400 hover:text-white"

>

<FiX size={22}/>
</button>

<h2 className="text-2xl md:text-3xl font-bold">
{selectedMember.name}
</h2>

<p className="text-[#00FF88] font-mono mt-1">
{selectedMember.role}
</p>

<p className="text-gray-300 mt-6 leading-relaxed">
{selectedMember.bio}
</p>

<div className="flex flex-wrap gap-2 mt-6">
{selectedMember.tags.map((tag,i)=>(
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

<FiLinkedin/>
Connect on LinkedIn
</a>

</motion.div>

</motion.div>

)}

</AnimatePresence>

</div>

</LayoutGroup>

);

}
