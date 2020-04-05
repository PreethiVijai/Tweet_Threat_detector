FROM debian:bullseye
RUN apt-get update
RUN apt-get install -y python3 python3-pip
WORKDIR /Analyzer
ADD src/* /Analyzer/
# Install python libraries
ADD requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt
# Expose port to run on
EXPOSE 8079
CMD python3 Analyzer.py
