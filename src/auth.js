import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./fb";

export async function logarUsuario(email, password) {
    
    return await signInWithEmailAndPassword(auth, email, password);

};