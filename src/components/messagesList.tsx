import 'server-only'

import { firestore, messageSnapshots } from "@/lib/firebase-admin";
import MessagesListClientComponent from './messages-list/client';
import MessagesListServerComponent from './messages-list/server';

export default async function MessagesDataBundleComponent() {
  const snapshots = await messageSnapshots;
  const bundle = firestore.bundle("messages");
  for (const snapshot of snapshots) {
    bundle.add(snapshot);
  }
  return (<>
    <MessagesListClientComponent firestoreBundle={bundle.build().toString()}>
      <MessagesListServerComponent></MessagesListServerComponent>
    </MessagesListClientComponent>
  </>);
}
