"use client";

import { useState } from "react";
import styles from "./page.module.css";

const TikTokLogo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="black"/>
    <g transform="translate(13, 11) scale(0.045)">
      <path fill="#00f2fe" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31v89.89a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" transform="translate(-15, -15)"/>
      <path fill="#fe2c55" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31v89.89a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" transform="translate(15, 15)"/>
      <path fill="#ffffff" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31v89.89a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
    </g>
  </svg>
);

const COIN_OPTIONS = [
  { id: 1, amount: 30, price: "$0.31" },
  { id: 2, amount: 350, price: "$3.65" },
  { id: 3, amount: 700, price: "$7.25" },
  { id: 4, amount: 1400, price: "$14.49" },
  { id: 5, amount: 3500, price: "$36.20" },
];

export default function Home() {
  const [username, setUsername] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<number | "custom" | null>(null);
  const [customCoin, setCustomCoin] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [tempCustomCoin, setTempCustomCoin] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "payoneer" | "bank" | null>(null);
  
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const handleSend = () => {
    if (!username || !selectedCoin || !paymentMethod) return;
    if (selectedCoin === "custom" && !customCoin) return;

    setIsSending(true);

    // Simulate network delay
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      const coinsAmount = selectedCoin === "custom" ? customCoin : COIN_OPTIONS.find(c => c.id === selectedCoin)?.amount;
      
      setReceiptData({
        username,
        amount: coinsAmount,
        method: paymentMethod,
        transactionId: "TX-" + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
        date: new Date().toLocaleString(),
      });
    }, 2000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setUsername("");
    setSelectedCoin(null);
    setCustomCoin("");
    setPaymentMethod(null);
    setReceiptData(null);
  };

  const isFormValid = username.trim() !== "" && 
                      (selectedCoin !== null && (selectedCoin !== "custom" || customCoin.trim() !== "")) && 
                      paymentMethod !== null;

  if (isSuccess && receiptData) {
    return (
      <main className={styles.successContainer}>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className={styles.successIconWrapper}>
            <svg className={styles.successIcon} viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" style={{ animation: "checkmark 0.6s ease-in-out forwards" }} />
            </svg>
          </div>
          <h2 className={styles.successTitle}>Purchase completed</h2>
          <p className={styles.successSubtitle}>
            You recharged {receiptData.amount} Coins. You can use Coins to send virtual Gifts.
          </p>
        </div>

        <button className={styles.doneButton} onClick={handleReset}>
          Done
        </button>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        Get Coins
      </header>

      {/* Username Input Card */}
      <div className={styles.inputCard}>
        <div className={styles.tiktokLogoIcon}>
          <TikTokLogo size={28} />
        </div>
        <input 
          type="text" 
          placeholder="Enter username" 
          className={styles.input} 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Recharge Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Recharge</h3>
        <p className={styles.sectionSubtitle}>Save around 25% with a lower third-party service fee.</p>
        
        <div className={styles.coinGrid}>
          {COIN_OPTIONS.map((coin) => (
            <div 
              key={coin.id} 
              className={`${styles.coinOption} ${selectedCoin === coin.id ? styles.selected : ''}`}
              onClick={() => setSelectedCoin(coin.id)}
            >
              <div className={styles.coinAmountWrapper}>
                <div className={styles.goldCoin}>d</div>
                <span>{coin.amount}</span>
              </div>
              <div className={styles.coinPrice}>{coin.price}</div>
            </div>
          ))}

          {/* Custom Option */}
          <div 
            className={`${styles.coinOption} ${selectedCoin === "custom" ? styles.selected : ''}`}
            onClick={() => {
              setTempCustomCoin(customCoin);
              setShowCustomModal(true);
            }}
          >
            {selectedCoin === "custom" && customCoin ? (
              <>
                <div className={styles.coinAmountWrapper}>
                  <div className={styles.goldCoin}>d</div>
                  <span>{customCoin}</span>
                </div>
                <div className={styles.coinPrice}>Custom Amount</div>
              </>
            ) : (
              <span className={styles.customText}>Custom</span>
            )}
          </div>
        </div>
      </section>

      {/* List Cards (Payment Methods) */}
      <div className={styles.listCards}>
        <div 
          className={`${styles.listCard} ${paymentMethod === 'paypal' ? styles.selected : ''}`}
          onClick={() => setPaymentMethod('paypal')}
        >
          <div className={styles.listCardLeft}>
            <div className={styles.listCardIcon}>💳</div>
            <div className={styles.listCardText}>
              <span className={styles.listCardTitle}>PayPal</span>
              <span className={styles.listCardSubtitle}>Select to pay with PayPal</span>
            </div>
          </div>
          <div className={`${styles.radioCircle} ${paymentMethod === 'paypal' ? styles.radioCircleSelected : ''}`}>
            <div className={styles.radioInner} />
          </div>
        </div>

        <div 
          className={`${styles.listCard} ${paymentMethod === 'payoneer' ? styles.selected : ''}`}
          onClick={() => setPaymentMethod('payoneer')}
        >
          <div className={styles.listCardLeft}>
            <div className={styles.listCardIcon}>🏦</div>
            <div className={styles.listCardText}>
              <span className={styles.listCardTitle}>Payoneer</span>
              <span className={styles.listCardSubtitle}>Select to pay with Payoneer</span>
            </div>
          </div>
          <div className={`${styles.radioCircle} ${paymentMethod === 'payoneer' ? styles.radioCircleSelected : ''}`}>
            <div className={styles.radioInner} />
          </div>
        </div>

        <div 
          className={`${styles.listCard} ${paymentMethod === 'bank' ? styles.selected : ''}`}
          onClick={() => setPaymentMethod('bank')}
        >
          <div className={styles.listCardLeft}>
            <div className={styles.listCardIcon}>🏛️</div>
            <div className={styles.listCardText}>
              <span className={styles.listCardTitle}>Bank Account</span>
              <span className={styles.listCardSubtitle}>Select to pay with Bank Account</span>
            </div>
          </div>
          <div className={`${styles.radioCircle} ${paymentMethod === 'bank' ? styles.radioCircleSelected : ''}`}>
            <div className={styles.radioInner} />
          </div>
        </div>
      </div>

      {/* Recharge Button */}
      <button 
        className={styles.rechargeButton} 
        disabled={!isFormValid || isSending}
        onClick={handleSend}
      >
        {isSending ? (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          "Recharge"
        )}
      </button>

      {/* Footer Logo */}
      <div className={styles.footerLogo}>
        <div className={styles.footerLogoIcon}>
          <TikTokLogo size={40} />
        </div>
      </div>

      {/* Custom Amount Modal */}
      {showCustomModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCustomModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M9 9a3 3 0 0 1 5.9-1.3c0 2-3 3-3 3"/>
                  <circle cx="12" cy="17" r="1" fill="currentColor"/>
                </svg>
              </div>
              <h3 className={styles.modalTitle}>Custom</h3>
              <div className={styles.modalHeaderIcon} onClick={() => setShowCustomModal(false)}>
                ✕
              </div>
            </div>
            
            <div className={styles.modalSubtitleRow}>
              <span>Number of Coins</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>

            <div className={styles.modalInputBox}>
              <div className={styles.goldCoin} style={{ width: '20px', height: '20px', fontSize: '12px' }}>d</div>
              <span className={styles.modalInputText}>{tempCustomCoin || '0'}</span>
            </div>

            <div className={styles.keyboard}>
              {['1', '2', '3', 'backspace', '4', '5', '6', '000', '7', '8', '9', '0'].map((key, i) => (
                <button 
                  key={i}
                  className={`${styles.key} ${key === 'backspace' || key === '000' ? styles.keyAction : ''}`}
                  onClick={() => {
                    if (key === 'backspace') {
                      setTempCustomCoin(prev => prev.slice(0, -1));
                    } else {
                      setTempCustomCoin(prev => (prev === '0' ? key : prev + key).slice(0, 8));
                    }
                  }}
                >
                  {key === 'backspace' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.5 }}><path d="M22 3H7c-.7 0-1.4.3-1.8.9L.3 11c-.4.5-.4 1.4 0 2l4.9 7.1c.4.6 1.1.9 1.8.9h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3.3 12.3L17.3 14 14 10.7l-3.3 3.3-1.4-1.4 3.3-3.3-3.3-3.3 1.4-1.4 3.3 3.3 3.3-3.3 1.4 1.4-3.3 3.3 3.3 3.3-1.4 1.4z"/></svg>
                  ) : key}
                </button>
              ))}
            </div>

            <div className={styles.modalTotalRow}>
              <span className={styles.modalTotalLabel}>Total</span>
              <span className={styles.modalTotalValue}>
                $ {tempCustomCoin ? (parseInt(tempCustomCoin) * 0.0103).toFixed(2) : '0'}
              </span>
            </div>

            <button 
              className={styles.modalBtnConfirm} 
              disabled={!tempCustomCoin || tempCustomCoin === '0'}
              onClick={() => {
                if (tempCustomCoin.trim() !== "" && tempCustomCoin !== '0') {
                  setCustomCoin(tempCustomCoin);
                  setSelectedCoin("custom");
                  setShowCustomModal(false);
                }
              }}
            >
              Recharge
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
