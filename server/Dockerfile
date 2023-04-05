FROM python:3.10
WORKDIR /server
RUN apt-get install -y libpq-dev
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN pip install psycopg2-binary
EXPOSE 8080
COPY . .
CMD ["gunicorn", "wsgi:app", "-w 2", "-b 0.0.0.0:8080", "-t 30"]