import * as init from "./init_fb_db"
import * as db from "./fb-db";

const firestore = init.init_db();

db.addMem(firestore, "Hello");
