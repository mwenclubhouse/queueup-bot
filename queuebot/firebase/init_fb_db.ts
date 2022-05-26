const { applicationDefault, initializeApp } = require('firebase-admin/app');
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";


export function init_db() {
    let app = initializeApp({
        Credential: applicationDefault()
    });
    const firestore = getFirestore(app);
    return firestore;
}

