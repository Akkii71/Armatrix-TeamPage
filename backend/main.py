from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Armatrix Team API")

# Allow Next.js frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We will restrict this to your Vercel URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SCHEMA ---
class TeamMember(BaseModel):
    name: str
    ini: str
    role: str
    bio: str
    tags: List[str]
    li: str

class TeamMemberResponse(TeamMember):
    id: str

# --- IN-MEMORY DATABASE ---
# Pre-populated with the founding team so it looks great immediately
db = {
    "001": {"id": "001", "name": "Vishrant Dave", "ini": "VD", "role": "Co-Founder & CEO", "bio": "IIT Kanpur aerospace & materials engineer. Leads vision and strategy — building hyper-redundant robotic arms that access confined, hazardous industrial spaces no conventional arm can reach.", "tags": ["Co-Founder", "CEO", "IIT Kanpur"], "li": "https://www.linkedin.com/in/vishrant-dave/"},
    "002": {"id": "002", "name": "Prateesh Awasthi", "ini": "PA", "role": "Co-Founder", "bio": "IIT Kanpur engineer and co-founder. Part of the founding trio who built Armatrix from a hostel room at IITK into a $2.1M-backed deep-tech robotics startup.", "tags": ["Co-Founder", "IIT Kanpur", "Systems"], "li": "https://www.linkedin.com/in/prateesh-awasthi-4a5215109/"},
    "003": {"id": "003", "name": "Ayush Ranjan", "ini": "AR", "role": "Co-Founder", "bio": "IIT Kanpur · MITACS Research Scholar at University of Alberta · Supply Chain intern at P&G · Team Captain ERA IITK. Bridges deep robotics research with operational expertise.", "tags": ["Co-Founder", "MITACS UAlberta", "ERA IITK"], "li": "https://www.linkedin.com/in/ayranjan/"},
    "004": {"id": "004", "name": "Pulkit Sinha", "ini": "PS", "role": "Founding Engineer", "bio": "Founding engineer at Armatrix, shaping core systems from the ground up. Works at the intersection of mechanical and software to build robots that operate reliably in demanding environments.", "tags": ["Founding Engineer", "Robotics", "Systems"], "li": "https://in.linkedin.com/in/pulkit-sinha-803907200"},
    "005": {"id": "005", "name": "Anushtup Nandy", "ini": "AN", "role": "Founding Engineer — Robotics", "bio": "Columbia University · BITS Pilani · CMU Research Intern under Howie Choset. Expert in multi-agent path planning, bio-inspired robotics, underwater propulsion, and controls.", "tags": ["Columbia Robotics", "BITS Pilani", "CMU"], "li": "https://www.linkedin.com/in/anushtup-nandy/"},
    "006": {"id": "006", "name": "Shashank Singh Tomar", "ini": "SS", "role": "Mechatronics Engineer", "bio": "IIT Kanpur mechatronics engineer with industry experience from a GMET internship at Jaguar Land Rover India. Integrates mechanical, electrical, and software into the Armatrix platform.", "tags": ["Mechatronics", "JLR India", "IIT Kanpur"], "li": "https://www.linkedin.com/in/shashank-singh-tomar-773834234/"},
    "007": {"id": "007", "name": "Akshat Khandelwal", "ini": "AK", "role": "Head of Operations", "bio": "Runs operations at Armatrix — bridging engineering output with business execution as the company scales from R&D to real industrial deployments.", "tags": ["Head of Ops", "Operations", "Execution"], "li": "https://www.linkedin.com/search/results/all/?keywords=Akshat+Khandelwal+Armatrix"},
    "008": {"id": "008", "name": "Sounak Senapati", "ini": "SN", "role": "Chief of Staff", "bio": "KiiT University · Legal Counsel IP background at Tresa Motors. Brings a sharp mix of legal, ops, and strategy as Chief of Staff — keeping everything moving as the team scales.", "tags": ["Chief of Staff", "Legal IP", "Operations"], "li": "https://www.linkedin.com/in/sounak-senapati-8442a7174/"}
}

# --- ENDPOINTS ---

@app.get("/api/team", response_model=List[TeamMemberResponse])
def get_team():
    """Fetch all team members"""
    return list(db.values())

@app.post("/api/team", response_model=TeamMemberResponse)
def add_team_member(member: TeamMember):
    """Add a new team member"""
    new_id = str(uuid.uuid4())[:8] # Generate a short unique ID
    new_member = member.dict()
    new_member["id"] = new_id
    db[new_id] = new_member
    return new_member

@app.put("/api/team/{member_id}", response_model=TeamMemberResponse)
def update_team_member(member_id: str, member: TeamMember):
    """Update an existing team member"""
    if member_id not in db:
        raise HTTPException(status_code=404, detail="Member not found")
    
    updated_member = member.dict()
    updated_member["id"] = member_id
    db[member_id] = updated_member
    return updated_member

@app.delete("/api/team/{member_id}")
def delete_team_member(member_id: str):
    """Delete a team member"""
    if member_id not in db:
        raise HTTPException(status_code=404, detail="Member not found")
    del db[member_id]
    return {"message": "Team member deleted successfully"}