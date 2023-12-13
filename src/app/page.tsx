import MessagesListComponent from '@/components/messagesList';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <MessagesListComponent></MessagesListComponent>
    </main>
  );
}
