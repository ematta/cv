"use client";

import { useState } from "react";
import styles from "./PrintButton.module.css";

export default function PrintButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resume");
      if (!res.ok) throw new Error(`Server error (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Enrique-Matta-Rodriguez-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF download failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.button} no-print`}
      onClick={handleDownload}
      disabled={loading}
      aria-label="Download resume PDF"
    >
      {loading ? "..." : "PDF"}
    </button>
  );
}
