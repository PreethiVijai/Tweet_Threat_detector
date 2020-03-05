FROM debian:bullseye
WORKDIR /App
ADD app.py /App
ADD index.html /App
RUN apt-get update
RUN apt-get install -y python3 python3-pip
RUN pip3 install flask waitress
EXPOSE 8080
CMD python3 app.py