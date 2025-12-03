import {db} from './firebase.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

export const readEntries = async () => {
    //const records = await getDocs(collection(db, "entries"), where("userId","==",userId));
    const q = query(collection(db,"entries"), where("userId","==",userId));
    const records = await getDocs(q);
    records.forEach((doc) => {
        console.log(doc.id)
        console.log(doc.data());
    });

    return records.docs.map(d => ({id: d.id, ...d.data() }))
} 
