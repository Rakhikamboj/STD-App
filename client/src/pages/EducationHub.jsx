import { useState } from "react";
import { BookOpen, Trophy, Calendar, MessageCircle } from "lucide-react";
import ArticlesTab from "../components/ArticleTab.jsx";
import ChallengeTab from "../components/ChallengeTab.jsx";
import WorkshopsTab from "../components/WorkshopsTab.jsx";
import styles from "./EducationHub.module.css";
import EducationAssistant from "../components/EducationAssistant.jsx";

const EducationHub = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const workshopsUnlocked = quizzesCompleted >= 3;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Education Hub</h1>
        <p className={styles.heroDescription}>
          Knowledge is power. Explore evidence-based information about sexual
          health, testing, and prevention in a judgment-free space.
        </p>

        {/* Ask Assistant Button */}
        <div
          className={styles.assistantButton}
          onClick={() => setIsAssistantOpen(true)}
        >
          <span className={styles.assistantIcon}>
            <MessageCircle size={20} />
          </span>
          Ask the Education Assistant
        </div>
{ /* Modal */}
<EducationAssistant
  isOpen={isAssistantOpen}
  onClose={()=> setIsAssistantOpen(false)}/>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          {[
            { id: "articles", label: "Articles", icon: BookOpen },
            {
              id: "challenge",
              label: "Challenge Yourself",
              icon: Trophy,
              badge: `${quizzesCompleted}/3`,
            },
            {
              id: "workshops",
              label: "Workshops",
              icon: Calendar,
              locked: !workshopsUnlocked,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              >
                <Icon size={18} />
                {tab.label}
                {tab.locked && (
                  <span className={styles.tabLockedBadge}>Locked</span>
                )}
                {tab.badge && (
                  <span className={styles.tabBadge}>{tab.badge}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "articles" && <ArticlesTab />}

      {activeTab === "challenge" && (
        <ChallengeTab
          quizzesCompleted={quizzesCompleted}
          setQuizzesCompleted={setQuizzesCompleted}
        />
      )}

      {activeTab === "workshops" && (
        <WorkshopsTab
          workshopsUnlocked={workshopsUnlocked}
          quizzesCompleted={quizzesCompleted}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default EducationHub;
