import { useState } from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import PeerSupport from '../components/PeerSupport';
import AskADoctor from '../components/AskDoctor';
import styles from "./Community.module.css"

const Community = () => {
  const [activeTab, setActiveTab] = useState('peer'); // 'peer' or 'doctor'

  return (
    <div className={styles.container}>
      <div className={styles.community}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Community Support</h1>
          <p className={styles.subtitle}>
            Connect with peers and healthcare professionals in a safe, anonymous space
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabs}>
        <div className={styles.tabNavigation}>
          <div
            onClick={() => setActiveTab('peer')}
            className={`${styles.peerTab} ${activeTab === 'peer' ? styles.activeTab : ''}`}
          >
            <Heart size={20} />
            Peer Support
          </div>
          <div
            onClick={() => setActiveTab('doctor')}
            className={`${styles.doctorTab} ${activeTab === 'doctor' ? styles.activeTab : ''}`}
          >
            <MessageCircle size={20} />
            Ask a Doctor
          </div>
        </div></div>

        {/* Tab Content */}
        {activeTab === 'peer' ? <PeerSupport /> : <AskADoctor />}
      </div>
    </div>
  );
};

export default Community;