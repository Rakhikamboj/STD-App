import { ArrowLeft, BookOpen, ThumbsUp, Users, MessageSquare, Heart } from 'lucide-react';
import styles from './TopicDetail.module.css';
import peerData from "../Json/PeerSupport.data.json";

/**
 * TopicDetail
 * Props:
 *   topicId  — one of 'first-time' | 'living-with-sti' | 'partner-communication'
 *   onBack   — callback to go back to the PeerSupport landing grid
 */
const TopicDetail = ({ topicId, onBack }) => {
  const topic = peerData.topics.find((t) => t.id === topicId);

  if (!topic) return null;

  return (
    <div className={styles.wrapper}>
      {/* ── Back navigation ── */}
      <button className={styles.backLink} onClick={onBack}>
        <ArrowLeft size={17} />
        Back to Journey Selection
      </button>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div
          className={styles.heroIconWrap}
          style={{ backgroundColor: topic.color }}
        >
          {/* Render the icon by name — we map strings to components here */}
          <TopicIcon name={topic.icon} color={topic.iconColor} size={34} />
        </div>
        <h1 className={styles.heroTitle}>{topic.title}</h1>
        <p className={styles.heroSubtitle}>{topic.description}</p>
      </div>

      {/* ── Real Stories ── */}
      <h2 className={styles.sectionHeading}>
        <BookOpen size={22} />
        Real Stories from Your Peers
      </h2>

      <div className={styles.storiesGrid}>
        {topic.stories.map((story) => (
          <div key={story.id} className={styles.storyCard}>
            <h3 className={styles.storyTitle}>{story.title}</h3>
           
            <p className={styles.storyContent}>{story.content}</p>

            <div className={styles.storyMeta}>
              <div className={styles.authorWrap}>
                <div className={styles.authorAvatar}>
                  {story.author.charAt(0).toUpperCase()}
                </div>
                <span className={styles.authorName}>{story.author}</span>
              </div>
              <div className={styles.likeWrap}>
                <ThumbsUp size={15} />
                {story.likes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Join the Conversation ── */}
      <section className={styles.discussionsSection}>
        <h2 className={styles.sectionHeading}>
          <Users size={22} />
          Join the Conversation
        </h2>

        {topic.discussions.map((disc) => (
          <div key={disc.id} className={styles.discussionCard}>
            <div className={styles.discussionInfo}>
              <h3 className={styles.discussionTitle}>{disc.title}</h3>
              <p className={styles.discussionDesc}>{disc.description}</p>
              <span className={styles.participantsLabel}>
                <Users size={14} />
                {disc.participants} participants
              </span>
            </div>
            <button className={styles.joinButton}>Join Discussion</button>
          </div>
        ))}
      </section>

      {/* ── Share Your Story CTA ── */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaHeartIcon}>
          <Heart size={46} color="white" />
        </div>
        <h2 className={styles.ctaTitle}>Have a story to share?</h2>
        <p className={styles.ctaSubtitle}>
          Your experience could help someone else feel less alone. Share your
          journey anonymously and become part of this supportive community.
        </p>
        <button className={styles.ctaButton}>Share Your Story</button>
      </div>
    </div>
  );
};

/* ── Helper: map icon name string → Lucide component ── */
import { Sparkles, MessageCircle } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Heart,
  MessageCircle,
  BookOpen,
  Users,
};

const TopicIcon = ({ name, color, size = 26 }) => {
  const Icon = ICON_MAP[name] ?? Heart;
  return <Icon size={size} color={color} />;
};

export default TopicDetail;