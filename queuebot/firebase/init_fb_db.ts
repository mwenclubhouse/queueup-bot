import os from 'os';
const { applicationDefault, initializeApp } = require('firebase-admin/app');
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";
import { memoryUsage } from 'process';
import { firestore } from 'firebase-admin';

export function init_db() {
    let app = initializeApp({
        Credential: applicationDefault()
    });
    const firestore = getFirestore(app);
    return firestore;
}

