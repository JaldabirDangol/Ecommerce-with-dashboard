

#node-18 is an verson
#alpine is small lightweight linux image

FROM node:20-alpine


#set workind directory inside container
WORKDIR /app

#copy package files that has all the dependencie needed to run 
#node application and cache it 
#copied to ./

COPY package.json package-lock.json ./

#copy prisma to generate schma from ./prisma/schema.ts file 
COPY prisma ./prisma

#npm i to install node modules
RUN npm i 

#generate prisma client 
RUN npx prisma generate 

#copy rest of the code just like packages

COPY . .

#expose the port where our app runs
EXPOSE 3000

#start the app 

CMD ["npm", "run",  "dev"]


