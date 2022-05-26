import "dotenv/config";

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

export async function addMem(firestore: FirebaseFirestore.Firestore, name : string, id: string = "") {
    let th = await firestore.collection("test").doc(id).get();
    if(th.createTime == undefined) {
        const d = new Date();
        let time = d.getTime();
        await firestore.collection("test").doc(id).set({
            name: name,
            timestamp: time,
            id: id,
        });
        return true;
    }
    else {
        return false;
    }
}

export async function getNext(firestore: FirebaseFirestore.Firestore) {
    let next = await firestore.collection("test").orderBy("timestamp").limit(1).get();
    console.log(next.docs[0].data().name);
    return next.docs[0].data().name;
}

export async function dequeueMem(firestore: FirebaseFirestore.Firestore, ) {
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

export async function clearQueue(firestore: FirebaseFirestore.Firestore, ) {
    firestore.collection('test').get().then(snap => {
        let size = snap.size;
        for(let i = 0; i < size; i++) {
            firestore.collection("helped").add(snap.docs[0].data());
            snap.docs[i].ref.delete();
        }
    });
}
