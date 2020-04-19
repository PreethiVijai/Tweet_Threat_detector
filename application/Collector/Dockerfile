FROM debian:bullseye
RUN apt-get update
RUN apt-get install -y python3 python3-pip
WORKDIR /Collector
# Install python libraries
ADD requirements.txt /Collector/requirements.txt
RUN python3 -m pip install -r requirements.txt
# Upload code
ADD src/* /Collector/
RUN echo $APIKEY >> /Collector/apikey.txt
RUN echo APISECRET >> /Collector/apisecret.txt
# Expose port to run on
EXPOSE 8080
# TODO: Figure out how to give the Collector access to our Twitter API key and secret, currently
# the Collector expects that key and secret to be passed as command-line arguments. The
# Collector will not run until these arguments are being passed in.
CMD python3 Collector.py apikey.txt apisectet.txt rabbitmq
