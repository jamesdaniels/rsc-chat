"use client"

import { firestore, auth } from "../../lib/firebase-client";
import { collection, orderBy, limitToLast, query, onSnapshot, addDoc, serverTimestamp, loadBundle } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { useMemo, useState } from 'react';
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export default function MessagesListClientComponent({
  children,
  firestoreBundle,
}: {
  children: React.ReactNode,
  firestoreBundle: string,
}) {
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [messageSnapshots, setMessageSnapshots] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);
  const messagesCollection = collection(firestore, "messages");
  const messagesQuery = query(messagesCollection, orderBy('createdAt'), limitToLast(100));
  useMemo(() => {
    let snapshotUnsubscribe: undefined|(()=>void);
    let mounted = true;
    loadBundle(firestore, firestoreBundle).then(() => {
      if (!mounted) return;
      snapshotUnsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        if (!mounted) return;
        if (loading) setLoading(false);
        setMessageSnapshots(snapshot.docs);
      });
    });
    return () => {
      mounted = false;
      if (snapshotUnsubscribe) snapshotUnsubscribe();
    };
  }, []);
  return (<>
    { loading ? children : 
      (<ol>
        { messageSnapshots.map(snapshot => {
          const data = snapshot.data();
          const hasPendingWrites = snapshot.metadata.hasPendingWrites;
          return (<li key={snapshot.id} className={hasPendingWrites ? 'pending' : ''}>{ data.message }</li>);
        }) }
      </ol>)
    }
    <form onSubmit={async (e) => {
      e.preventDefault();
      if (submitting) return;
      setSubmitting(true);
      await auth.authStateReady();
      if (!auth.currentUser) await signInAnonymously(auth);
      await addDoc(messagesCollection, {
        message: newMessage,
        createdAt: serverTimestamp(),
        uid: auth.currentUser!.uid,
      }).then(() => {
        setNewMessage("");
        setSubmitting(false);
      }, (e) => {
        alert(e.message);
        setSubmitting(false);
      });
    }}>
      <input name="message" value={newMessage} onChange={(event) => setNewMessage(event.target.value)} disabled={submitting}></input>
      <button type="submit" disabled={submitting}>Send</button>
    </form>
  </>);
}
