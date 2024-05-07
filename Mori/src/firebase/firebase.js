import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6oHlYXwiBMvSBjs3xyzemcGy6L94TN_g",
  authDomain: "mori-3d9e0.firebaseapp.com",
  projectId: "mori-3d9e0",
  storageBucket: "mori-3d9e0.appspot.com",
  messagingSenderId: "167896719443",
  appId: "1:167896719443:web:36d29098c1664d6a8266a6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth};