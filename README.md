# **Darmi AI Chatbot Documentation**

This documentation provides step-by-step instructions for setting up and running the Darmi AI chatbot project. The project uses **Next.js** for the frontend and **Django** for the backend API.

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

3. Apply database migrations:
   ```bash
   python3 manage.py migrate
   ```

4. Create a superuser for accessing the Django admin panel (optional but recommended):
   ```bash
   python3 manage.py createsuperuser
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

3. Create an `.env.local` file in the `frontend` directory with the following content:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
   ```
   Replace `http://127.0.0.1:8000` with your backend URL if it is hosted remotely.

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

3. Configure CORS (Cross-Origin Resource Sharing):
   Install the Django CORS headers package if not already installed:
   ```bash
   pip install django-cors-headers
   ```

   Add it to your `INSTALLED_APPS` and middleware in `settings.py`:
   ```python
   INSTALLED_APPS += ['corsheaders']
   MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')
   CORS_ALLOWED_ORIGINS = [
       'http://localhost:3000',
       'http://your-frontend-domain.com',
   ]
   ```

### **Configure the Frontend**

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Ensure the `.env.local` file contains the correct backend URL:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
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

1. The backend API will run by default at:
   `http://127.0.0.1:8000`

2. The frontend application will run by default at:
   `http://localhost:3000`

---

## **Troubleshooting**

- **Backend issues:**
  - Ensure all dependencies are installed.
  - Verify that `ALLOWED_HOSTS` and CORS settings are configured correctly.
  - Check for database migrations.

- **Frontend issues:**
  - Verify that the `.env.local` file contains the correct backend URL.
  - Ensure all dependencies are installed.
  - Check the browser console for errors.

---

## **Production Deployment**

### **Backend Deployment**

1. Use a production-ready web server like **Gunicorn** or **uWSGI** with a reverse proxy such as **Nginx**.
2. Configure the database with production settings.
3. Set `DEBUG = False` in `settings.py` and configure a secret key.
4. Use HTTPS for secure communication.

### **Frontend Deployment**

1. Build the production version of the frontend:
   ```bash
   npm run build
   ```

2. Serve the built frontend using a static file server like **Vercel**, **Netlify**, or **Nginx**.
3. Ensure the environment variable `NEXT_PUBLIC_BACKEND_URL` points to the production backend URL.

Feel free to reach out for further assistance or clarifications!

