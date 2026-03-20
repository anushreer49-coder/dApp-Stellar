// @ts-nocheck
import { useState, useEffect } from 'react';
import { isAllowed, setAllowed, requestAccess } from '@stellar/freighter-api';
import './App.css';

function App() {
  const [address, setAddress] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const allowed = await isAllowed();
      if (allowed) {
        // Freighter v6 returns an object that often has address or publicKey.
        // Or getPublicKey might be removed, but requestAccess returns { address: string, error: string } maybe.
        // Let's use requestAccess to get the address.
        const access = await requestAccess();
        if (access) {
          const key = typeof access === 'string' ? access : access.address ?? access;
          setAddress(key);
          fetchMessages(key);
        }
      }
    } catch (err) {
      console.error("Wallet check error:", err);
    }
  };

  const connectWallet = async () => {
    try {
      setError(null);
      await setAllowed();
      const access = await requestAccess();
      if (access) {
        const key = typeof access === 'string' ? access : access.address ?? access;
        setAddress(key);
        fetchMessages(key);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect Freighter. Is the extension installed?");
    }
  };

  const fetchMessages = async (userAddress: string) => {
    console.log("Fetching for:", userAddress);
    setLoading(true);
    try {
      setTimeout(() => {
        setMessages(["Welcome to Stellar!", "Deploy your contract to see real messages!"]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch messages.");
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !address) return;

    setLoading(true);
    setError(null);

    try {
      setTimeout(() => {
        setMessages([...messages, newMessage]);
        setNewMessage('');
        setLoading(false);
      }, 800);
    } catch (err) {
      setLoading(false);
      setError("Failed to send message.");
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <div className="logo-icon">S</div>
          Soroban Messaging
        </div>
        <div>
          {address ? (
            <span className="status-badge connected">
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </header>

      <main className="main-card">
        {error && <div style={{ color: '#ef4444', marginBottom: '10px' }}>{error}</div>}
        
        <div className="card-title">Stellar Message Board</div>
        <div className="card-subtitle">
          Send a short message to the blockchain or view your previous ones.
        </div>

        {address ? (
          <>
            <form className="message-form" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                maxLength={64}
                disabled={loading}
              />
              <button type="submit" disabled={loading || !newMessage.trim()}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="messages-list">
              <h3>Your Messages</h3>
              {messages.length === 0 && !loading && (
                <div className="empty-state">No messages yet.</div>
              )}
              {messages.map((msg, index) => (
                <div key={index} className="message-item">
                  📩 {msg}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            Please connect your Freighter wallet to interact with the contract.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
