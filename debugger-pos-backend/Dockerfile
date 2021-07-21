FROM node:12
WORKDIR /app/backend
COPY package.json /app/backend
RUN npm install
COPY . /app/backend
RUN mkdir uploaded_files
RUN mkdir cropped_uploaded_files
RUN mkdir combined_images

# COPY tmp_deploy/identified-leopards/ /app/webapp/src/assets/img/identified-leopards/

CMD npm start
EXPOSE 4000
