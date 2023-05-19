import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

import "./global.css";

export function App() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.wrapper}>
        <Task />
      </main>
    </div>
  );
}
