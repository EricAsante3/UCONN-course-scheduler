# Project Dependencies

## Run Instructions

```sh
pip3 install -r requirements.txt
python3 app.py
```
## Jira Board
https://admin.atlassian.com/o/7301734a-8e2f-4227-b056-d5585d5e07ff/users?status=ACTIVE



docker commands:

docker build -f Containerization/Dockerfile.frontend -t frontend .
docker build -f Containerization/Dockerfile.backend -t backend .


docker run -d -p 5173:5173 frontend

docker run -d -p 5123:5123 backend
