# frontend/Dockerfile
FROM httpd:alpine

COPY ./static/ /usr/local/apache2/htdocs/

EXPOSE 8080
