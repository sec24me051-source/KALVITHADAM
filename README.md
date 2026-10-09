<<<<<<< HEAD
# 🎓 Digital Education Continuity & Opportunity Access Platform

A web-based platform designed to support students who struggle to continue their education by providing educational resources, skill development, motivation, higher-study information, scholarships, and career opportunities.

---

## 🎯 Project Objective

The main objective of this project is to help students who face difficulties in continuing their education.

Many students face challenges such as financial difficulties, family circumstances, lack of awareness, limited access to educational resources, and lack of information about higher education and career opportunities.

This platform brings important educational and career-related resources together in one place to help students continue their education and build a better future.

The project initially focused on supporting students from:

- Rural areas
- Slum communities
- Underserved communities
- Students with disabilities

The idea was later expanded to support **any student who struggles to continue their education**, regardless of their background.

---

## 💡 Project Idea

The platform provides students with resources and information related to education, skills, motivation, higher studies, scholarships, and career opportunities.

The overall concept is:

**Education → Skills → Motivation → Higher Studies → Opportunities**

The platform aims to help students identify suitable learning paths and continue their educational journey.

---

## 🚀 Key Features

### 👨‍🎓 Student Support

- Student registration and login
- Education continuity support
- School dropout prevention
- Learning resources
- Downloadable study materials
- Life motivation videos

### 📚 Education & Learning

- Educational learning resources
- Skill-based learning
- Digital skill development
- Information about higher studies
- Higher-study information based on students' skills and interests

### 🎯 Opportunities

- Scholarship information
- Career opportunities
- Employment opportunities
- Higher-education opportunities
- Information to help students identify suitable opportunities

### ♿ Accessibility & Inclusion

- Support for students with disabilities
- Support for students from rural areas
- Support for students from underserved communities
- Low-data usage support
- Accessible learning resources

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB

=======
# KALVITHADAM – Digital Education Continuity & Opportunity Access Platform

KALVITHADAM is a full-stack digital education platform built to provide educational continuity, track and prevent student dropouts, and connect students to learning resources and opportunities.

---

## 🛠 Technology Stack

- **Frontend**: React 19, Vite, React Router v7, Lucide Icons, Axios
- **Backend API**: Node.js, Express.js 5, JSON Web Tokens (JWT), Bcrypt.js
- **Database**: MongoDB (Mongoose ORM)
- **Deployment Platform**: Netlify (Frontend + Serverless Functions) with MongoDB Atlas

---

## 📁 Repository Structure

```text
KALVITHADAM/
├── backend/
│   ├── config/
│   │   └── db.js                 # Cached MongoDB connection for serverless & standalone
│   ├── controllers/              # Route controllers (auth, students, courses, etc.)
│   ├── middleware/               # Authentication & authorization middleware
│   ├── models/                   # Mongoose schemas (User, Student, Course, Opportunity, DropoutCase)
│   ├── routes/                   # Express REST API routes
│   ├── utils/                    # JWT generator and database seed script
│   ├── app.js                    # Core Express application (exported for serverless & standalone)
│   ├── server.js                 # Standalone Node.js entry point (with app.listen)
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Server environment template
│   └── .gitignore                # Excludes node_modules and .env
├── frontend/
│   ├── public/
│   │   └── _redirects            # SPA fallback & API proxy rewrite
│   ├── src/
│   │   ├── components/           # Navbar, Footer, Widgets, ProtectedRoute
│   │   ├── context/              # Auth & Accessibility contexts
│   │   ├── pages/                # Public and role-based portal views
│   │   └── services/
│   │       └── api.js            # Axios client with dynamic environment API URL
│   ├── index.html
│   ├── package.json              # Frontend dependencies and Vite build script
│   ├── vite.config.js            # Vite configuration with local proxy
│   ├── .env.example              # Frontend environment template
│   └── .gitignore
├── netlify/
│   └── functions/
│       └── api.js                # Netlify Serverless Function entry point (serverless-http)
├── netlify.toml                  # Netlify build, function bundling & redirect configuration
├── package.json                  # Root monorepo workspace configuration
├── .gitignore                    # Root Git ignore rules
└── README.md                     # Deployment and setup documentation
```

---

## ⚙️ Environment Variables

### Backend / Netlify Environment Variables
Set these in **Netlify Site Configuration > Environment variables** (or in `backend/.env` for local testing):

| Variable | Description | Example / Value |
| :--- | :--- | :--- |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/digital-education-platform?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for signing authentication tokens | Long secure random string |
| `NODE_ENV` | Runtime environment | `production` |
| `FRONTEND_URL` | Deployed frontend origin (for CORS) | `https://your-site-name.netlify.app` |

### Frontend Environment Variables (Optional)
If deploying backend on Netlify Functions with the same domain, **leave `VITE_API_URL` empty**. The app uses the relative path `/api` which Netlify automatically rewrites to the function.

If deploying the backend separately (e.g., on Render or Railway):
- `VITE_API_URL` = `https://your-backend-api.onrender.com/api`

---

## 🚀 Deployment to Netlify

### Step 1: Push Changes to GitHub
```bash
git add .
git commit -m "Configure project for Netlify full-stack deployment"
git push origin main
```

*(Optional clean up: If `backend/node_modules` was previously committed, remove it from git tracking without deleting local files)*:
```bash
git rm -r --cached backend/node_modules
git commit -m "Remove tracked backend node_modules from git index"
git push origin main
```

### Step 2: Import into Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** > **Import an existing project**.
3. Select **GitHub** and authorize access to `KALVITHADAM`.
4. Configure site settings:
   - **Base directory**: Leave blank / root (`.`)
   - **Build command**: `npm run build --workspace=frontend`
   - **Publish directory**: `frontend/dist`
   - **Functions directory**: `netlify/functions` (auto-detected via `netlify.toml`)

### Step 3: Configure Environment Variables
1. Go to **Site configuration** > **Environment variables** > **Add a variable**.
2. Add:
   - `MONGO_URI`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: Your production JWT secret string.
   - `NODE_ENV`: `production`
3. Click **Deploy site** (or trigger a new deploy under the Deploys tab).

---

## 🍃 MongoDB Atlas Configuration

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a user with `Read and write to any database` privileges.
3. Under **Network Access**, click **Add IP Address** and choose **Allow Access From Anywhere (`0.0.0.0/0`)** to allow Netlify serverless functions to connect.
4. Copy your connection string:
   `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/digital-education-platform?retryWrites=true&w=majority`
5. Replace `<username>` and `<password>` with your database user credentials.
6. To migrate local Compass data:
   - Use `mongodump` and `mongorestore` or Compass's **Export Collection** / **Import Data** feature to export local collections and import into Atlas.
   - Or run the built-in seed script pointing `MONGO_URI` to Atlas: `node utils/seed.js` from `backend/`.

---

## 💻 Local Development

1. Install all dependencies from root:
   ```bash
   npm install
   ```
2. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```
3. Start the frontend (in a separate terminal):
   ```bash
   cd frontend
   npm run dev
   ```
4. Access frontend at `http://localhost:5173`. Requests to `/api` proxy automatically to `http://localhost:5000`.
>>>>>>> 631a108 (chore: configure Netlify deployment)
