import React from 'react';
import { Calendar, Clock, Video, MessageCircle, Users, MapPin, ChevronRight, CheckCircle, Lock, Sparkles, Sparkle } from 'lucide-react';
import styles from './Workshopstab.module.css';
import workshopsData from "../Json/workshops-data.json"

const WorkshopsTab = ({ workshopsUnlocked, quizzesCompleted, setActiveTab }) => {
  const workshops = workshopsData.workshops;

  if (workshopsUnlocked) {
    return (
      <div className={styles.content}>
        {/* Success Banner */}
        <div className={styles.successBanner}>
          <div className={styles.successIcon}>
            <Sparkles size={24} />
          </div>
          <div className={styles.successContent}>
            <h3 className={styles.successTitle}>Workshops & Events Unlocked!</h3>
            <p className={styles.successDescription}>
              Great job completing 4 quizzes! You now have access to all our expert-led workshops and AMA sessions. Choose a session below and join anonymously with just a nickname.
            </p>
          </div>
        </div>

        {/* Ask Me Anything Events */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <MessageCircle size={24} className={styles.sectionIcon} />
            Ask Me Anything Events
          </h2>
          
          <div className={styles.workshopList}>
            {workshops.filter(w => w.type === 'ama').map(workshop => (
              <div key={workshop.id} className={styles.workshopCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.amaTag}>
                    <MessageCircle size={14} />
                    {workshop.category}
                  </span>
                </div>

                <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                <p className={styles.workshopDescription}>{workshop.description}</p>

                {/* Event Details Grid */}
                <div className={styles.eventDetailsGrid}>
                  <div className={styles.detailItem}>
                    <Calendar size={18} className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>{workshop.date}</div>
                      <div className={styles.detailTime}>{workshop.time}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Clock size={18} className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>{workshop.duration}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    {workshop.format === 'Live Video' ? (
                      <Video size={18} className={styles.detailIcon} />
                    ) : (
                      <MessageCircle size={18} className={styles.detailIcon} />
                    )}
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>{workshop.format}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <ChevronRight size={18} className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>{workshop.questionsSubmitted} questions submitted</div>
                    </div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className={styles.instructorCard}>
                  <div className={styles.instructorAvatar}>
                    {workshop.instructor.avatar}
                  </div>
                  <div className={styles.instructorDetails}>
                    <div className={styles.instructorName}>{workshop.instructor.name}</div>
                    <div className={styles.instructorTitle}>{workshop.instructor.title}</div>
                    <p className={styles.instructorBio}>{workshop.instructor.bio}</p>
                  </div>
                </div>

                {/* Register Button */}
                <button className={styles.registerButtonAma}>
                  Register for AMA
                  <MessageCircle size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expert-Led Workshops */}
        <div className={styles.sectionExpert}>
          <h2 className={styles.sectionTitle}>
            <div className={styles.sectionIcon}>
              <Sparkles size={20} />
            </div>
            Expert-Led Workshops
          </h2>
          
          <div className={styles.workshopList}>
            {workshops.filter(w => w.type === 'workshop').map(workshop => (
              <div key={workshop.id} className={styles.workshopCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.workshopTag}>{workshop.category}</span>
                </div>

                <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                <p className={styles.workshopDescription}>{workshop.description}</p>

                {/* Event Details Grid */}
                <div className={styles.eventDetailsGrid}>
                  <div className={styles.detailItem}>
                    <Calendar size={18} className={styles.detailIconGreen} />
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>{workshop.date}</div>
                      <div className={styles.detailTime}>{workshop.time}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Clock size={18} className={styles.detailIconGreen} />
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>{workshop.duration}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    {workshop.format === 'Online' ? (
                      <Video size={18} className={styles.detailIconGreen} />
                    ) : (
                      <MapPin size={18} className={styles.detailIconGreen} />
                    )}
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>{workshop.format}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Users size={18} className={styles.detailIconGreen} />
                    <div className={styles.detailContent}>
                      <div className={styles.detailValue}>
                        {workshop.registered} registered · {workshop.spotsLeft} spots left
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className={styles.instructorMini}>
                  <div className={styles.instructorAvatarGreen}>
                    {workshop.instructor.avatar}
                  </div>
                  <div>
                    <div className={styles.instructorName}>{workshop.instructor.name}</div>
                    <div className={styles.instructorTitleSmall}>{workshop.instructor.title}</div>
                  </div>
                </div>

                {/* Register Button */}
                <button className={styles.registerButton}>
                  Register Anonymously
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Approach Section */}
        <div className={styles.approachSection}>
          <h2 className={styles.approachTitle}>Our Approach to Education</h2>
          <div className={styles.approachGrid}>
            {[
              {
                title: 'Evidence-Based',
                description: 'All content is reviewed and based on current medical guidelines and research'
              },
              {
                title: 'Inclusive Language',
                description: 'We use gender-neutral and non-judgmental language that respects all identities'
              },
              {
                title: 'Stigma-Free',
                description: 'Sexual health is health. No shame, no judgment, just facts and support'
              }
            ].map((item, idx) => (
              <div key={idx} className={styles.approachItem}>
                <h3 className={styles.approachItemTitle}>{item.title}</h3>
                <p className={styles.approachItemDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Locked State
  return (
    <div className={styles.content}>
      <div className={styles.lockedBanner}>
        <div className={styles.lockedHeader}>
          <div className={styles.lockedIcon}>
            <Lock size={24} />
          </div>
          <div className={styles.lockedHeaderContent}>
            <h2 className={styles.lockedTitle}>Unlock Expert Workshops</h2>
            <button
              onClick={() => setActiveTab('challenge')}
              className={styles.startQuizzesButton}
            >
              Start Taking Quizzes
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        
        <p className={styles.lockedDescription}>
          Complete 3 myth-busting quizzes to unlock access to our exclusive, expert-led workshops!
        </p>

        {/* Progress */}
        <div className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Your Progress</span>
            <span className={styles.progressCount}>{quizzesCompleted}/3 quizzes</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(quizzesCompleted / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* What You'll Unlock */}
        <div className={styles.unlockSection}>
          <h3 className={styles.unlockTitle}>
            <Sparkles size={20} className={styles.unlockIcon} />
            What you'll unlock:
          </h3>
          <div className={styles.unlockList}>
            {[
              'Live sessions with healthcare professionals',
              'Anonymous attendance with nickname-only participation',
              'Interactive Q&A in a judgment-free space',
              'Both online and in-person options',
              'Monthly AMA sessions with renowned experts'
            ].map((item, idx) => (
              <div key={idx} className={styles.unlockItem}>
                <CheckCircle size={18} className={styles.checkIcon} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopsTab;