import os from 'os';
const { applicationDefault, initializeApp } = require('firebase-admin/app');
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";
import { memoryUsage } from 'process';

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const app = initializeApp({
    Credential: applicationDefault()
});
const firestore = getFirestore(app);

async function addMem(name : string) {
    const d = new Date();
    let time = d.getTime();
    await firestore.collection("test").add({name: name, timestamp: time});
}

async function dequeueMem() {
    let name: string = "";
    let mem: any = null;

    firestore.collection("test").orderBy("timestamp").limit(1).get().then(element => {
        if(element.docs.length == 0) {
            return false;
        }
        firestore.collection("helped").add(element.docs[0].data());
        mem = element.docs[0].data();
        element.docs[0].ref.delete();
    });
    return true;
}

async function clearQueue() {
    firestore.collection("test").get().then(element => {
        firestore.collection("helped").add(element.docs[0].data());
        console.log(element.docs.length);
        element.docs[0].ref.delete();
    });
}


for(let i = 0; i < 15; i++) {
    addMem("Student in queue #" + String(i), ).then();
} 

clearQueue().then();
