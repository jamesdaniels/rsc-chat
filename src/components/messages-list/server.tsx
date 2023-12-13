import 'server-only'

import { messageSnapshots } from "../../lib/firebase-admin";

export default async function MessagesListServerComponent() {
  const snapshots = await messageSnapshots;
  return (<>
    <ol>
      { snapshots.map(snapshot => {
        const data = snapshot.data();
        return (<li key={snapshot.id}>{ data.message }</li>);
      }) }
    </ol>
  </>);
}
