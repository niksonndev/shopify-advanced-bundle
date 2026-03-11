FROM nginx:alpine

# Default Nginx static files directory
WORKDIR /usr/share/nginx/html

# Copy project static files into Nginx
COPY index.html ./index.html
COPY index.js ./index.js
COPY demo.gif ./demo.gif

# Expose default HTTP port
EXPOSE 80

# Default nginx command is already suitable:
# ["nginx", "-g", "daemon off;"]
