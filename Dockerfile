#Grab the latest alpine image
FROM medicalpoc:latest



# Install dependencies
RUN npm install

# Add our code
ADD ./medicalpoc /opt/medicalpoc/
WORKDIR /opt/medicalpoc

# Expose is NOT supported by Heroku
# EXPOSE 5000 		

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku			
CMD gunicorn --bind 0.0.0.0:$PORT wsgi 

