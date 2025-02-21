# 🚀 React + FastAPI Seamless Integration: Cold Email Generator

This project showcases the **perfect integration of React (Vite) and FastAPI**, bringing the best of both worlds together. The goal is to **extract job postings from a URL, generate AI-powered cold emails, and display them in an elegant UI**.

## 🌟 Features
- **FastAPI backend** with LangChain for job extraction.
- **React (Vite) frontend** with Framer Motion animations.
- **Railway deployment** for easy cloud hosting.
- **CORS handling** to enable smooth API communication.
- **Seamless RESTful API requests** with `axios`.

## 🛠️ Tech Stack
### **Frontend**
- ⚛️ **React (Vite)**
- 🎨 **Tailwind CSS**
- 🚀 **Framer Motion** (for animations)
- 🌍 **Axios** (for API requests)

### **Backend**
- 🐍 **FastAPI**
- 🤖 **LangChain & ChatGroq API**
- 📂 **ChromaDB** (for vector storage)
- 📝 **Pandas** (for data handling)
- 🌐 **WebBaseLoader** (for scraping job data)

---

## 📷 **Demo Screenshot**
🚀 **[Live Demo](https://cemailgen.vercel.app/)** 
![image](https://github.com/user-attachments/assets/2e1d2cde-3057-4392-a96c-f88f82a2fe98)


---

## 🛠️ **Setup & Installation**
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-username/cold-email-generator.git
cd cold-email-generator
```

### **2️⃣ Backend Setup (FastAPI)**
```sh
cd backend  # Navigate to backend folder
python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate (Mac/Linux) or venv\Scripts\activate (Windows)
pip install -r requirements.txt  # Install dependencies
```

#### **Set Environment Variables** (Create a `.env` file in `backend/`)
```
GROQ_API_KEY=your_actual_api_key
```

#### **Run the Backend**
```sh
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
FastAPI will start running at: **[http://localhost:8000/docs](http://localhost:8000/docs)**

---

### **3️⃣ Frontend Setup (React)**
```sh
cd frontend  # Navigate to frontend folder
npm install  # Install dependencies
npm run dev  # Start development server
```
The frontend will run at: **[http://localhost:5173](http://localhost:5173)**

---

## 🔄 **API Endpoints**
| Method | Endpoint | Description |
|--------|----------|------------|
| **POST** | `/process1` | Extract job data & generate an email (Individual) |
| **POST** | `/process2` | Extract job data & generate an email (Business Executive) |

### **Example Request (POST `/process1`)**
```json
{
  "url": "https://example.com/jobs/software-engineer"
}
```

### **Example Response**
```json
{
  "results": [
    {
      "job": {
        "role": "Software Engineer",
        "skills": ["Python", "Django", "REST APIs"],
        "experience": "2+ years",
        "job_details": "Full-time position in a tech company."
      },
      "email": "Subject: Application for Software Engineer Position\n\nDear Hiring Manager, ..."
    }
  ]
}
```

---

## 🚀 **Deployment**
### **Backend (Railway)**
1. Push your backend code to GitHub.
2. Deploy on **Railway**:
   - Create a **New Railway Project**.
   - Link to your GitHub repo.
   - Add **environment variables** in Railway’s "Variables" tab.
   - Deploy & get the URL (e.g., `https://backendemail.up.railway.app`).

### **Frontend (Vercel)**
1. Push your frontend code to GitHub.
2. Deploy on **Vercel**:
   - Import your GitHub repo.
   - Set the API base URL (`VITE_BACKEND_URL` in `.env`):
     ```
     VITE_BACKEND_URL=https://backendemail.up.railway.app
     ```
   - Deploy & get the live URL (e.g., `https://cemailgen.vercel.app`).

---

## 📌 **Troubleshooting**
### ❓ **Backend Issues**
- **500 Internal Server Error on Railway?**  
  Ensure `GROQ_API_KEY` is added as an **environment variable**.
- **ModuleNotFoundError (bs4)?**  
  Add `beautifulsoup4` to `requirements.txt`:
  ```sh
  pip install beautifulsoup4
  ```

### ❓ **Frontend Issues**
- **CORS Errors?**  
  Ensure **CORS middleware** in `main.py` allows your frontend domain:
  ```python
  allow_origins = ["https://cemailgen.vercel.app", "http://localhost:5173"]
  ```
- **API calls failing in production?**  
  Double-check your **API base URL** in `axios.post()`:
  ```js
  const response = await axios.post("https://backendemail.up.railway.app/process1", { url });
  ```

---

## 📜 **License**
This project is open-source and available under the **MIT License**.

📩 **Feel free to contribute & star this repository!** ⭐🚀
