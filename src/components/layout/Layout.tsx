import React, { ReactNode } from 'react';
import styles from "../../app/page.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.page}>
      <header>
        <h1>SV - JIRA PARSING</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2024 Sharing Vision</p>
      </footer>

      {/* <main className={styles.main}>
        asd
      </main>
      <footer className={styles.footer}>
        asdasd
      </footer> */}
    </div>
  );
};

export default Layout;
