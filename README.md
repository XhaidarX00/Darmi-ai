Berikut adalah revisi dokumentasi Anda untuk membuatnya lebih rapi, jelas, dan profesional:  

---

# **Darmi AI Chatbot Documentation**  
This documentation provides step-by-step instructions for setting up and running the Darmi AI chatbot project. The project uses **Next.js** for the frontend and **Django** for the backend.  

---

## **Prerequisites**  
Ensure you have the following installed on your system:  
- **Python 3.8+**  
- **Node.js 16+** and **npm**  
- **pip** (Python package manager)  

---

## **Backend Setup**  
1. Navigate to the backend directory:  
   ```bash
   cd backend
   ```  
2. Install the required Python dependencies:  
   ```bash
   pip install -r requirements.txt
   ```  

---

## **Frontend Setup**  
1. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```  
2. Install the required Node.js packages:  
   ```bash
   npm install
   ```  

---

## **Configuration**  

### **Configure the Backend**  
1. Navigate to the `backend/darmi-ai` directory:  
   ```bash
   cd backend/darmi-ai
   ```  
2. Update the `ALLOWED_HOSTS` setting in the `settings.py` file to include the hostname or IP address where the frontend will run.  

   Example:  
   ```python
   ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'your-frontend-domain.com']
   ```  

### **Configure the Frontend**  
1. Navigate to the `frontend` directory:  
   ```bash
   cd frontend
   ```  
2. Open the `.env` file and update the `BACKEND_URL` variable to point to the backend server's URL.  

   Example:  
   ```env
   BACKEND_URL=http://127.0.0.1:8000
   ```  

---

## **Running the Application**  

### **Start the Backend Server**  
1. Navigate to the backend directory:  
   ```bash
   cd backend
   ```  
2. Start the Django development server:  
   ```bash
   python3 manage.py runserver
   ```  

### **Start the Frontend Server**  
1. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```  
2. Start the Next.js development server:  
   ```bash
   npm run dev
   ```  

---

## **Accessing the Application**  
1. The backend server will run by default at:  
   `http://127.0.0.1:8000`  
2. The frontend server will run by default at:  
   `http://localhost:3000`  

---

## **Troubleshooting**  
- **Backend issues:**  
  Ensure all dependencies are installed and `ALLOWED_HOSTS` is configured correctly.  
- **Frontend issues:**  
  Verify that the `.env` file contains the correct backend URL and all dependencies are installed.  

Feel free to reach out for further assistance or clarifications!  

---  
