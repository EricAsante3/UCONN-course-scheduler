# Docker Commands to Run Applications

This guide provides the necessary Docker commands to build and run the frontend and backend applications.

## Prerequisites
- Docker installed on your machine.
- Dockerfiles for the frontend and backend applications located in the `Containerization` directory.
- All Docker commands must be run in the root repository directory ./UCONN-course-scheduler for them to work.

## Build Docker Images

1. **Build the Frontend Docker Image**:
   ```bash
   docker build -f Containerization/Dockerfile.frontend -t frontend .
   
2. **Build the Backend Docker Image**:
   ```bash
   docker build -f Containerization/Dockerfile.backend -t backend .
   

3. **Run Frontend**:
   ```bash
   docker run -d -p 5173:5173 frontend
   

4. **Run Backend**:
   ```bash
   docker run -d -p 5123:5123 backend
   
5. **Application should be visable at http://localhost:5173/**:
   ```bash
