# Hidden founders web coding challenge
This is my **Frontend** participation for the challenge. 
The **Backend** is linked on another repository which you can check from the link [Nearby Shops Back End](https://github.com/Alhydra/Nearby-shops.backend).

The App is built using **ReactJs** and a couple of handful javascript libraries such us **MomentJs**,**lodash** and **Axios**

The app functions as a SPA (Single Page App), and it's main functionality is displaying a list of nearby shops to the user's location, ranked by the closest.

The App uses a set of coordinates to calculate the the distance between the user and the shop.

#### User Workflow
- The user can Sign up a new account using an email and a password
- The user Sign in with his created email and password
- The user can view the list of shops ranked by the closest to his location
- The user can like a shop, and it will disappear from the main shops list and will display in the preferred shops list page
- The user can remove the liked shops from his preferred page
- The user can dislike a shop and it will be hidden from the main lit for 2 hours




Instructions
---------------

Clone the repository

```bash
$ git clone https://github.com/Alhydra/Nearby-shops.frontend.git
```
To run the app you have Two options:

#### I-Use the development mode

By running the start script

##### Using yarn
```bash
$ Yarn start
```

##### Using npm
```bash
$ npm start
```

The server will run on the local machine on port 3000, http://localhost:3000
#### II-Use the static app

Which you can get running the build script from the command line.

##### Using yarn
```bash
$ Yarn build
$ cd /build
```

##### Using npm
```bash
$ npm build
$ cd /build
```

