import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCHzKeQJ0eW1TKGzwV0PS8HBgaZW7317-E",
  authDomain: "mottumobileapp.firebaseapp.com",
  projectId: "mottumobileapp",
  storageBucket: "mottumobileapp.firebasestorage.app",
  messagingSenderId: "731840459543",
  appId: "1:731840459543:web:ddee6f8801e98921adbd52",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância de autenticação para ser usada em outras partes do app
export const auth = getAuth(app);