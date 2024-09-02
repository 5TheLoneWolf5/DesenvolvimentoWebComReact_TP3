import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./fb";


export async function insertPessoa(pessoa) {

    const docRef = await addDoc(collection(db, "pessoas"), pessoa);
    return docRef.id;
    
};

export async function listPessoas() {
    
    let result;

    await getDocs(collection(db, "pessoas"))
        .then((querySnapshot) => {
            result = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        }, () => console.log("Erro!"));

    return result;

};

export async function obtainPessoa(id) {

    const docRef = doc(db, "pessoas", id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();

};

export async function removePessoa(id) {

    await deleteDoc(doc(db, "pessoas", id));

};

export async function updatePessoa(pessoa) {

    await setDoc(doc(db, "pessoas", pessoa.id), pessoa);

};