FROM debian:bullseye
RUN apt-get update
RUN apt-get install -y python3 python3-pip
WORKDIR /Collector
ADD src/* /Collector/
EXPOSE 8080
CMD python3 Collector.py