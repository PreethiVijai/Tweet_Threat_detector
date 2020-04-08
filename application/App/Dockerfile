FROM debian:bullseye
RUN apt-get update
RUN apt-get install -y python3 python3-pip
WORKDIR /App
# Install python libraries
ADD requirements.txt /App/requirements.txt
RUN python3 -m pip install -r requirements.txt
# Upload code
ADD src/* /App/
EXPOSE 8080
CMD python3 app.py
