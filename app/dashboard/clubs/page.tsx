"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Plus, Users, MapPin, Eye } from "lucide-react"

const CLUBS = [
  {
    id: 1,
    name: "Tech Club",
    members: 234,
    college: "IIT Delhi",
    description: "For tech enthusiasts interested in coding, web development, and AI/ML",
  },
  {
    id: 2,
    name: "Debate Society",
    members: 156,
    college: "NIT Trichy",
    description: "Sharpen your speaking skills and engage in competitive debating",
  },
  {
    id: 3,
    name: "Entrepreneurship Cell",
    members: 189,
    college: "BITS Pilani",
    description: "Build your startup and network with like-minded entrepreneurs",
  },
  {
    id: 4,
    name: "Photography Club",
    members: 112,
    college: "Delhi University",
    description: "Explore your creativity through photography and visual storytelling",
  },
  {
    id: 5,
    name: "Music Society",
    members: 198,
    college: "IIT Bombay",
    description: "For musicians, singers, and music enthusiasts of all levels",
  },
  {
    id: 6,
    name: "Sports & Fitness",
    members: 342,
    college: "BITS Pilani",
    description: "Join fellow students for sports activities and fitness training",
  },
  {
    id: 7,
    name: "Drama & Theatre",
    members: 127,
    college: "Jawaharlal University",
    description: "Experience the magic of theatre and stage performances",
  },
  {
    id: 8,
    name: "Data Science Club",
    members: 215,
    college: "IIT Madras",
    description: "Learn data analytics, machine learning, and big data technologies",
  },
  {
    id: 9,
    name: "Literary Circle",
    members: 89,
    college: "Miranda House",
    description: "For book lovers, writers, and those passionate about literature",
  },
  {
    id: 10,
    name: "Environmental Club",
    members: 156,
    college: "Delhi University",
    description: "Making a difference through sustainability and environmental initiatives",
  },
  {
    id: 11,
    name: "Robotics Team",
    members: 203,
    college: "NIT Delhi",
    description: "Build and program robots for competitions and innovation",
  },
  {
    id: 12,
    name: "Art & Design",
    members: 134,
    college: "BITS Hyderabad",
    description: "Explore visual arts, graphic design, and creative expression",
  },
  {
    id: 13,
    name: "Gaming Community",
    members: 289,
    college: "IIT Delhi",
    description: "Compete in esports tournaments and connect with gamers",
  },
  {
    id: 14,
    name: "Film Festival Club",
    members: 98,
    college: "Jamia Millia",
    description: "Create, watch, and discuss films with fellow cinephiles",
  },
  {
    id: 15,
    name: "Business Club",
    members: 267,
    college: "BITS Pilani",
    description: "Develop business acumen and network with industry professionals",
  },
  {
    id: 16,
    name: "Coding Bootcamp",
    members: 345,
    college: "IIT Bombay",
    description: "Intensive coding training and competitive programming",
  },
  {
    id: 17,
    name: "Social Impact",
    members: 176,
    college: "Delhi University",
    description: "Work on projects that create positive social change",
  },
  {
    id: 18,
    name: "Astronomy Club",
    members: 112,
    college: "Delhi University",
    description: "Explore the cosmos and study astronomy and space science",
  },
  {
    id: 19,
    name: "Culinary Arts",
    members: 145,
    college: "BITS Hyderabad",
    description: "Learn cooking techniques and explore international cuisines",
  },
  {
    id: 20,
    name: "Dance Crew",
    members: 189,
    college: "NIT Delhi",
    description: "Express yourself through various dance styles and performances",
  },
  {
    id: 21,
    name: "Public Speaking",
    members: 203,
    college: "Delhi University",
    description: "Build confidence and master the art of public communication",
  },
  {
    id: 22,
    name: "Volunteer Network",
    members: 267,
    college: "IIT Delhi",
    description: "Join volunteer initiatives and community service projects",
  },
  {
    id: 23,
    name: "History & Culture",
    members: 134,
    college: "Jawaharlal University",
    description: "Discover and celebrate historical events and cultural heritage",
  },
  {
    id: 24,
    name: "Green Initiative",
    members: 156,
    college: "BITS Pilani",
    description: "Campus sustainability and eco-friendly living practices",
  },
  {
    id: 25,
    name: "Startup Incubator",
    members: 198,
    college: "IIT Madras",
    description: "Incubate your business idea with mentorship and funding support",
  },
  {
    id: 26,
    name: "Podcast Club",
    members: 87,
    college: "Delhi University",
    description: "Create and discuss podcasts on various topics",
  },
  {
    id: 27,
    name: "Fitness & Wellness",
    members: 412,
    college: "IIT Delhi",
    description: "Promote physical and mental health through fitness activities",
  },
  {
    id: 28,
    name: "Innovation Hub",
    members: 245,
    college: "NIT Trichy",
    description: "Prototype and commercialize innovative ideas and solutions",
  },
  {
    id: 29,
    name: "Language Club",
    members: 178,
    college: "Delhi University",
    description: "Learn and practice different languages with native speakers",
  },
  {
    id: 30,
    name: "Cricket Association",
    members: 267,
    college: "BITS Hyderabad",
    description: "Organize matches and tournaments for cricket enthusiasts",
  },
  {
    id: 31,
    name: "Mentorship Program",
    members: 189,
    college: "IIT Bombay",
    description: "Connect with experienced mentors for guidance and support",
  },
  {
    id: 32,
    name: "Tech Talks",
    members: 412,
    college: "Delhi University",
    description: "Weekly discussions on latest technology trends and innovations",
  },
  {
    id: 33,
    name: "Animation Club",
    members: 123,
    college: "BITS Pilani",
    description: "Create animations and explore the art of motion graphics",
  },
  {
    id: 34,
    name: "Chess Club",
    members: 156,
    college: "NIT Delhi",
    description: "Compete in chess tournaments and improve your game",
  },
  {
    id: 35,
    name: "Travel Buddies",
    members: 267,
    college: "Delhi University",
    description: "Plan adventures and explore new destinations together",
  },
  {
    id: 36,
    name: "Mental Health Awareness",
    members: 203,
    college: "IIT Delhi",
    description: "Promote mental health awareness and support within campus",
  },
  {
    id: 37,
    name: "Finance Club",
    members: 189,
    college: "BITS Hyderabad",
    description: "Learn investing, trading, and personal finance management",
  },
  {
    id: 38,
    name: "Hackathon Club",
    members: 324,
    college: "IIT Madras",
    description: "Participate in hackathons and build projects in 24-48 hours",
  },
  {
    id: 39,
    name: "Documentary Club",
    members: 112,
    college: "Delhi University",
    description: "Watch and discuss impactful documentaries on global issues",
  },
  {
    id: 40,
    name: "Coding Interview Prep",
    members: 298,
    college: "IIT Delhi",
    description: "Prepare for coding interviews with practice and mock sessions",
  },
]

interface ClubDetailsModal {
  isOpen: boolean
  club: (typeof CLUBS)[0] | null
}

export default function ClubsPage() {
  const [search, setSearch] = useState("")
  const [joined, setJoined] = useState<number[]>([1])
  const [modal, setModal] = useState<ClubDetailsModal>({ isOpen: false, club: null })

  const filteredClubs = CLUBS.filter((club) => club.name.toLowerCase().includes(search.toLowerCase()))

  const toggleJoin = (id: number) => {
    setJoined((prev) => (prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clubs & Communities</h1>
          <p className="text-muted-foreground mt-1">Join clubs, meet people, grow together</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          Create Club
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClubs.map((club) => (
          <Card
            key={club.id}
            className="bg-card/50 border-border/50 glass p-6 rounded-lg hover:bg-card/70 transition-colors"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary mb-3" />
              <h3 className="text-lg font-semibold text-foreground">{club.name}</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{club.description}</p>

            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {club.members} members
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {club.college}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setModal({ isOpen: true, club })}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-card gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button
                onClick={() => toggleJoin(club.id)}
                variant={joined.includes(club.id) ? "default" : "outline"}
                className={`flex-1 ${
                  joined.includes(club.id)
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-foreground hover:bg-card"
                }`}
              >
                {joined.includes(club.id) ? "Joined" : "Join"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {modal.isOpen && modal.club && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-card border-border max-w-md w-full p-8 rounded-lg">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-primary to-secondary mb-4" />
              <h2 className="text-2xl font-bold text-foreground">{modal.club.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{modal.club.college}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{modal.club.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">{modal.club.members}</div>
                <div className="text-xs text-muted-foreground">Members</div>
              </div>
              <div className="bg-background/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-secondary">Est.</div>
                <div className="text-xs text-muted-foreground">Founded</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setModal({ isOpen: false, club: null })}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-card"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  toggleJoin(modal.club!.id)
                  setModal({ isOpen: false, club: null })
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {joined.includes(modal.club.id) ? "Leave Club" : "Join Club"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
