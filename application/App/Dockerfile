FROM debian:bullseye
RUN apt-get update
RUN apt-get install -y python3 python3-pip
WORKDIR /App
# Install python libraries
RUN apt-get update && apt-get install -y git curl default-mysql-client default-libmysqlclient-dev
ADD requirements.txt /App/requirements.txt
RUN python3 -m pip install -r requirements.txt
# Upload code
ADD src/* /App/
EXPOSE 3000
CMD python3 mysqlloginreg.py
