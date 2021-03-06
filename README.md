This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#Deployment

##MongoDB
podman run -d --name mongoAdexOpenness -p 3027:27017 \
     -v ./data:/data/db \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.4
     
##Node server
1. zip -r nodeServer.zip ./nodeServer
2. place zip on server
3. unzip
4. cd nodeServer
5. docker build -t nodeserveropenness:mongo .
6. docker run --publish 3028:5000 --detach --name nodeserveropenness --restart on-failure:5 nodeserveropenness:mongo
7. Verify connection: docker logs nodeserver


## Dockerizing app
1. change redirect uri (login.jsx)
2. podman build -t adex:dev .
3. podman run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3008:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    adex:dev
4. change redirect uri  
5. create zip
    ```zip -r adex.zip ./adex```
6. put zip on server
7. unzip 
8. cd adex
9. podman stop adexopenness
10. podman rm adexopenness
11. podman build -t adex:openness .
12. podman run -dit --name adexopenness -p 3029:3000 adex:openness

    
