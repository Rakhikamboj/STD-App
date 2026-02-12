import { Heart, Shield, Sparkles, MessageCircle, BookOpen, Users} from 'lucide-react';
import styles from './PeerSupport.module.css';

const PEER_SUPPORT_TOPICS = [
  {
    id: 'first-time',
    icon: Sparkles,
    title: 'First-Time Testing',
    description: 'For those taking the brave step of getting tested for the first time',
    color: '#ccfbf1',
    Iconcolor: "#0d9488"


  },
  {
    id: 'living-with-sti',
    icon: Heart,
    title: 'Living with an STI',
    description: 'Support and stories from people managing a recent or ongoing diagnosis',
    color: '#fce7f3',
    Iconcolor: "#db2777"
  },
  {
    id: 'partner-communication',
    icon: MessageCircle,
    title: 'Partner Communication',
    description: 'Tips and experiences on talking to partners about testing or results',
    color: '#dbeafe',
    Iconcolor: "#2c68eb"
  },];

  const Real_Stories =[
  {
    id: 'real-stories',
    icon: BookOpen,
    title: 'Real Stories',
    description: 'Anonymous experiences from people who\'ve been where you are',
    color: '#ccfbf1',
    Iconcolor: "#0d9488"
  },
  {
    id: 'discussion-groups',
    icon: Users,
    title: 'Discussion Groups',
    description: 'Join conversations with others on similar journeys',
    color: '#fce7f3',
    Iconcolor: "#db2777"
  },
  {
    id: 'zero-judgment',
    icon: Heart,
    title: 'Zero Judgment',
    description: 'A compassionate community free from stigma and shame',
    color: '#dbeafe',
    Iconcolor: "#2c68eb"
  }
];

const PeerSupport = () => {
  return (
    <div className={styles.peerSupport}>
      <div className={styles.peerHero}>
        <div className={styles.peerIcon}>
          <Heart size={48} />
        </div>
        <h2 className={styles.peerTitle}>Peer-Safe Companion</h2>
        <p className={styles.peerDescription}>
          You're not alone. Connect with others, read real stories, and find support on your journey.
        </p>
      </div>

      <div className={styles.safetyNotice}>
        <div className={styles.safetyIcon}>
          <Shield size={20} />
        </div>
        <div className={styles.safetyContent}>
          <strong>This is a safe, anonymous space</strong>
          <p>Everyone here uses a nickname. No personal information is required or shared. All content is moderated to keep this space supportive and judgment-free.</p>
        </div>
      </div>

      <h3 className={styles.topicsHeading}>What brings you here today?</h3>
      
      <div className={styles.topicsGrid}>
{PEER_SUPPORT_TOPICS.map(topic => {
  const Icon = topic.icon;

  return (
    <div key={topic.id} className={styles.topicCard}>
      <div className={styles.topicIcon} style={{ backgroundColor: topic.color }}>
        <span style={{ color: topic.Iconcolor }}><Icon size={26} /></span>
      </div>
      <h4 className={styles.topicTitle}>{topic.title}</h4>
            <p className={styles.topicDescription}>{topic.description}</p>
    
         <button className={styles.exploreButton}>
              Explore →
            </button>
    </div>
  );
})}

      </div>
      <div className={styles.topicsGridReal}>
{Real_Stories.map(topic => {
  const Icon = topic.icon;

  return (
    <div key={topic.id} className={styles.topicCardReal}> 
    <div className={styles.iconReal} style={{ backgroundColor: topic.color }}>
      <div className={styles.topicIconReal} > 

        <span style={{ color: topic.Iconcolor }}><Icon size={26} /></span>
      </div> </div>
      <h4 className={styles.topicTitle}>{topic.title}</h4>
            <p className={styles.topicDescription}>{topic.description}</p>
    
        
    </div>

  );
})}

      </div>
    </div>
  );
};

export default PeerSupport;
