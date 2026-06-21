# SkillLoop

<table>
  <tr>
    <td colspan="2"><img width="100%" alt="SkillLoop Screenshot 1" src="PASTE_LINK_1_HERE" /></td>
  </tr>
  <tr>
    <td width="50%"><img width="100%" alt="SkillLoop Screenshot 2" src="PASTE_LINK_2_HERE" /></td>
    <td width="50%"><img width="100%" alt="SkillLoop Screenshot 3" src="PASTE_LINK_3_HERE" /></td>
  </tr>
</table>

SkillLoop is an AI-powered peer-to-peer skill exchange platform that helps users learn new skills by teaching the skills they already possess.

Instead of paying for courses or finding tutors, users can create barter requests, get matched with compatible learners, exchange knowledge, share resources, and build meaningful learning relationships.

## Demo

Live app: [SkillLoop on Vercel](https://skill-loop-connect.vercel.app/)

## Features

### Skill Barter Marketplace

* Create requests to learn a skill.
* Offer skills you can teach.
* Discover compatible learners and mentors.

### Smart Matching Engine

* Matches users based on complementary skills.
* Supports direct and multi-user barter chains.
* Uses graph algorithms to identify optimal learning paths.

### AI-Powered Recommendations

* OpenRouter AI suggests learning resources.
* Personalized recommendations based on requested skills.
* Context-aware resource discovery.

### Resource Sharing

* Share articles, documentation, videos, and learning materials.
* Resources are linked directly to active matches.
* Centralized knowledge repository for each learning exchange.

### Loop Detection

* Detects circular skill-exchange chains.
* Prevents invalid barter cycles.
* Ensures fair and meaningful skill exchanges.

### Authentication & Security

* JWT-based authentication.
* Protected API routes.
* Secure user sessions.

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI Integration

* OpenRouter API

### Authentication

* JSON Web Tokens (JWT)
* bcrypt.js

---

## System Architecture

1. User registers and creates a skill barter request.
2. Matching engine identifies compatible users.
3. Graph algorithms evaluate possible barter chains.
4. Loop detection validates exchange feasibility.
5. OpenRouter AI recommends relevant learning resources.
6. Users exchange skills and track progress.

---

## API Modules

### Authentication

* Register User
* Login User
* JWT Verification

### Barter Requests

* Create Request
* View Requests
* Update Request
* Delete Request

### Matching

* Find Compatible Users
* Generate Skill Exchange Paths

### Resources

* Add Resource
* Fetch Resources by Match

### AI Recommendations

* Generate Learning Resources
* Personalized Suggestions

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Rohandeep512/SkillLoop.git
cd SkillLoop
```

### Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm start
```

---

## Project Structure

```
SkillLoop/
│
├── backend/
│   ├── config/             # MongoDB connection setup
│   ├── controllers/        # Auth, barter, matching, and AI controllers
│   ├── middleware/         # JWT verification middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── utils/              # Helper utilities
│   ├── package.json
│   └── server.js           # Express app entry point
│
├── frontend/
│   ├── public/
│   ├── src/                # Components, pages, App.jsx, main.jsx
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Future Enhancements

* Skill ratings and reviews
* Real-time chat
* Learning progress tracking
* Reputation system
* Leaderboard to highlight top contributors and active learners
* Filter and sort matches by location or college

---

## Motivation

SkillLoop was built to make learning more accessible by enabling people to exchange knowledge directly. Everyone has something valuable to teach and something new to learn. SkillLoop creates a collaborative ecosystem where skills become a currency for growth.

---

## Author/Developer

Rohandeep Singh

NSUT | Full-Stack Developer

LinkedIn: [Rohandeep Singh](https://www.linkedin.com/in/rohandeep-singh-283465323/)

GitHub: [@Rohandeep512](https://github.com/Rohandeep512)

⭐ If you found this project interesting, consider giving it a star!
