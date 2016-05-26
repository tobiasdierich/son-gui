FROM ubuntu:14.04

# Install apache
RUN apt-get update && apt-get install -y apache2 && \
apt-get install -y nodejs nodejs-legacy npm libfontconfig1 && \
npm install -g  grunt

COPY ./ /var/www/html/
RUN ls -la /var/www/html/*
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN sed -i 's_DocumentRoot /var/www/html_DocumentRoot /var/www/html/app_' /etc/apache2/sites-enabled/000-default.conf
WORKDIR "/var/www/html"
#RUN npm cache clean && npm install


#ADD run.sh /run.sh
RUN chmod 0755 /var/www/html/run.sh
CMD ["./run.sh"]


