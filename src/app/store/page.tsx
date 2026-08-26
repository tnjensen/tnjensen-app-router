"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>NextCove</h1>
          <p className={styles.tagline}>Modern Next.js-application</p>
        </div>

        <div className={styles.product}>
          <div className={styles.productInfo}>
            <h2>Get started</h2>
            <p>
              Upon payment, send me an email from the <Link href={"/contact"}>Contact</Link> page, 
              with your github username, and I'll give you access to the source code by inviting you as a collaborator on the github project. 
              You will have read access, and you'll want to clone the project and create your own repo on your account.
              Follow the instructions in the readme file, and you should be good to go. 
            </p>
          </div>
          <div className={styles.productInfo}>
            <h2>Source Code</h2>
            <p>
              Get access to the full source-code for NextCove. Perfect for learning,
              customizing or developing.
            </p>
            <ul className={styles.features}>
              <li>Full source-code (Next.js + TypeScript)</li>
              <li>Documentation inkluded</li>
            </ul>
          </div>

          <div className={styles.pricing}>
            <div className={styles.priceCard}>
              <span className={styles.price}>99 kr</span>
              <span className={styles.priceNote}>One time buy</span>
              <button
                onClick={() => setShowPayment(true)}
                className={styles.buyButton}
              >
                Buy now
              </button>
              <p className={styles.payment}>Payment through Vipps</p>
            </div>
          </div>
        </div>

        {showPayment && (
          <div className={styles.modal} onClick={() => setShowPayment(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2>Pay with Vipps</h2>
              <p>Scan the QR-code or use the Vipps-number below:</p>
              <div className={styles.qrPlaceholder}>
                <span>Vipps QR</span>
              </div>
              <p className={styles.vippsNumber}>Vipps-number: <strong>91337217</strong></p>
              <p className={styles.vippsAmount}>Amount: <strong>99 kr</strong></p>
              <p className={styles.vippsNote}>Label the payment: <strong>NextCove</strong></p>
              <p className={styles.vippsNote2}>
                After payment, send receipt by email to gain access.
              </p>
              <button className={styles.closeButton} onClick={() => setShowPayment(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
