import type { Contact } from "@/data/resume";
import styles from "./Hero.module.css";

interface HeroProps {
  contact: Contact;
}

export default function Hero({ contact }: HeroProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.name}>{contact.name}</h1>
      <p className={styles.title}>{contact.title}</p>
      <div className={styles.contact}>
        <span className={styles.contactItem}>{contact.location}</span>
      </div>
    </div>
  );
}
