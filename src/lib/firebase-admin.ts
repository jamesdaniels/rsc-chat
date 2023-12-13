import { initializeApp as initializeAdmin, getApps, getApp } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

export const app = getApps().length ? getApp() : initializeAdmin();
export const firestore = getAdminFirestore(app);

export const messageSnapshots = firestore
    .collection("messages")
    .orderBy('createdAt')
    .limitToLast(100)
    .get()
    .then(it => it.docs);