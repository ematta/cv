"use client";

import styles from "./PrintButton.module.css";

export default function PrintButton() {
  return (
    <button
      type="button"
      className={`${styles.button} no-print`}
      onClick={() => window.print()}
      aria-label="Download as PDF"
    >
      PDF
    </button>
  );
}
