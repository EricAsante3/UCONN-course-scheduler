# UCONN Course Scheduler Setup
Docker commands at bottom
Follow these steps to use the course scheduler. Skip any steps you have already completed.

---

## Prerequisites

1. **Download VSCODE**  
   [VSCODE Download](https://code.visualstudio.com/Download)

2. **Download Git**  
   [Git Download](https://git-scm.com/downloads)

3. **Download Docker**  
   [Docker Download](https://www.docker.com/)  
   *After installation:*
   - Open Docker.
   - If it takes too long to load, close and reopen it.
   - You can choose to create an account or skip.
   - Once open, do not click anything; just leave it open.

---

## Setup Instructions

1. **Create a Project Folder**  
   Open your file system and create a folder in a suitable location (such as Documents) called `Scheduler`.

2. **Open the Folder in VSCODE**  
   - Launch VSCODE.
   - Click **File** in the top left corner, then **Open Folder**.
   - Navigate to and select the `Scheduler` folder you just created.

3. **Clone the Repository**  
   - In VSCODE, open the terminal by clicking **Terminal** > **New Terminal**.
   - Copy and paste the following command into the terminal and hit **Enter**:
     ```bash
     git clone "https://github.com/EricAsante3/UCONN-course-scheduler.git"
     ```

4. **Navigate to the Project Directory**  
   In the terminal, run:
   ```bash
   cd UCONN-course-scheduler
   ```
5. **Build and Run Docker Containers**
     
Execute the following commands one by one. The first two commands may take some time to run—be patient and wait until each finishes before proceeding to the next. **Make sure to include the period at the end of the build commands.**
```bash
docker build -f Containerization/Dockerfile.frontend -t frontend .

docker build -f Containerization/Dockerfile.backend -t backend .

docker run -d -p 5173:5173 frontend

docker run -d -p 5123:5123 backend
```

6. **Access the Application**

Open Google Chrome (or your preferred browser) and enter the following URL:
```bash
http://localhost:5173/
```

7. **Final Steps**    
- Once your schedule is built, remember to register for them on Student Admin.
- Return to the VSCODE terminal and run the following command to stop the Docker containers after done building schedule:
```bash
docker kill $(docker ps -aq)
```
