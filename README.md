# Resume Builder - Full-Stack Developer Internship Assignment

## Project Overview
This project is a **Full-Stack Resume Builder Application** developed as part of the Full-Stack Developer Internship assignment at **ResumeKaro AI**. The application allows users to create, edit, and manage resumes with an intuitive UI and a seamless backend.

## Live Demo
🔗 **Live Deployment:** [Live Link](https://ai-powered-resume-builder-n1kpxn6or.vercel.app/)

## Repository
📂 **GitHub Repository:** [GitHub Link](https://github.com/Anurag915/AI-Powered-Resume-Builder)

## Features
✅ User authentication (Sign Up & Sign In)  
✅ Resume creation and editing  
✅ Secure API with authentication and authorization  
✅ Responsive UI for an enhanced user experience  
✅ Integration with a database for storing resumes  

## Tech Stack
### Frontend:
- **React.js** (with Vite)
- **Tailwind CSS**
- **Axios** for API calls

### Backend:
- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **CORS & dotenv** for security and environment variables

## Installation & Setup
### Clone the repository
```sh
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   ```
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the frontend environment variables:
   ```env
   VITE_BACKEND_URL=https://your-backend-domain.com
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

## API Endpoints
| Method | Endpoint                   | Description             |
|--------|----------------------------|-------------------------|
| POST   | `/api/users/register`      | User registration       |
| POST   | `/api/users/login`         | User login              |
| GET    | `/api/resumes/getAllResume` | Fetch all resumes       |
| POST   | `/api/resumes/createResume` | Create a new resume     |

## Deployment
The application is deployed on:
- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Render](https://render.com)


## Contact
For any queries, feel free to reach out.

Best regards,  
**Anurag Prajapati**