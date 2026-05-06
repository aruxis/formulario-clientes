import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApW-N3FbmirjweXhJIZzONHm23Mv8ijXU",
  authDomain: "form-clientes.firebaseapp.com",
  projectId: "form-clientes",
  storageBucket: "form-clientes.firebasestorage.app",
  messagingSenderId: "687510686707",
  appId: "1:687510686707:web:8b17aeea1e5cfb5d2da086"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
