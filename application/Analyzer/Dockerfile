FROM debian:bullseye
RUN apt-get update
RUN apt-get install -y python3 python3-pip
WORKDIR /Analyzer
# Install python libraries
ADD requirements.txt /Analyzer/requirements.txt
RUN python3 -m pip install -r /Analyzer/requirements.txt
# Upload code
ADD src/* /Analyzer/
# Expose port to run on
EXPOSE 8079
CMD python3 Analyzer.py rabbitmq mysql
