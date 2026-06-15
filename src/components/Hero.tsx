import type { JsonResumeBasics } from "@/data/resume";
import styles from "./Hero.module.css";

interface HeroProps {
  basics: JsonResumeBasics;
}

export default function Hero({ basics }: HeroProps) {
  const location = [basics.location?.city, basics.location?.region]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={styles.hero}>
      <h1 className={styles.name}>{basics.name}</h1>
      <p className={styles.title}>{basics.label}</p>
      <div className={styles.contact}>
        <span className={styles.contactItem}>{location}</span>
      </div>
    </div>
  );
}
