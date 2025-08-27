FROM node:24-alpine

COPY frontend /app/

WORKDIR /app/frontend

RUN npm install
RUN npm run build

FROM python:3.12-slim

COPY backend /app/
COPY requirements.txt /app/

RUN pip install -r requirements.txt

WORKDIR /app/backend

COPY  --from=0 /app/frontend/dist /app/backend/

RUN python manage.py collectstatic --noinput

CMD gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT