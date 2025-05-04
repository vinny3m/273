FROM ubuntu:22.04

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    libpq-dev \
    python3-dev \
    python3-dev default-libmysqlclient-dev build-essential\
    build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY . /app

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 5000 5432
ENV FLASK_APP=server.py

CMD ["python3", "server.py"]
