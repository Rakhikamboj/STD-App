import { Calendar, Clock, Video, MessageCircle, Users, MapPin, ChevronRight, CheckCircle, Lock } from 'lucide-react';
import styles from './Workshopstab.module.css';

const StarIcon = ({ 
  size = 32, 
  color = "#ebb91b", 
  className = "",
  ...props 
}) => {
  return (
    <svg
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      fill={color}
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <style type="text/css">
        {`
          .st0 {
            fill: none;
            stroke: ${color};
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
        `}
      </style>
      <g>
        <path 
          className="st0" 
          d="M17.9,9.9c-4.6,0.9-6,2.3-6.9,6.9c-0.9-4.6-2.3-6-6.9-6.9C8.7,9,10.1,7.6,11,3C11.9,7.6,13.3,9,17.9,9.9z"
        />
      </g>
      <g>
        <path 
          className="st0" 
          d="M21.8,25c-3.2,0.6-4.1,1.6-4.8,4.8c-0.6-3.2-1.6-4.1-4.8-4.8c3.2-0.6,4.1-1.6,4.8-4.8C17.6,23.4,18.6,24.4,21.8,25z"
        />
      </g>
      <g>
        <path 
          className="st0" 
          d="M29,15c-2.6,0.5-3.4,1.3-3.9,3.9c-0.5-2.6-1.3-3.4-3.9-3.9c2.6-0.5,3.4-1.3,3.9-3.9C25.6,13.7,26.4,14.5,29,15z"
        />
      </g>
      <line className="st0" x1="5" y1="23" x2="5" y2="23" />
      <line className="st0" x1="28" y1="6" x2="28" y2="6" />
    </svg>
  );
};

const WorkshopsTab = ({ workshopsUnlocked, quizzesCompleted, setActiveTab }) => {
  const workshops = [
    {
      id: 1,
      type: 'ama',
      category: 'ASK ME ANYTHING',
      title: 'AMA: Real Talk About Sexual Health',
      description: 'Join Dr. Rachel Martinez for an honest, no-judgment Q&A session. Ask anything about sexual health, testing, relationships, or prevention. All questions are anonymous!',
      date: 'Thursday, February 12',
      time: '5:26 PM',
      duration: '90 minutes',
      format: 'Live Video',
      questionsSubmitted: 0,
      instructor: {
        name: 'Dr. Rachel Martinez',
        title: 'MD, OB-GYN, Sexual Health Specialist, 15+ years experience',
        avatar: 'D',
        bio: 'Dr. Martinez is a board-certified OB-GYN specializing in adolescent and young adult sexual health. She has dedicated her career to providing stigma-free, comprehensive sexual health education and care. She believes that no question is too small or too embarrassing when it comes to your health.'
      }
    },
    {
      id: 2,
      type: 'ama',
      category: 'ASK ME ANYTHING',
      title: 'AMA: Mental Health & Sexual Wellness',
      description: 'Chat with licensed therapist Jordan Chen about the connection between mental health and sexual wellness. Discuss shame, anxiety, relationships, and self-care in a safe, anonymous space.',
      date: 'Friday, February 20',
      time: '5:26 PM',
      duration: '75 minutes',
      format: 'Chat Only',
      questionsSubmitted: 0,
      instructor: {
        name: 'Jordan Chen',
        title: 'LCSW, Sex Therapist, Mental Health Advocate',
        avatar: 'J',
        bio: 'Jordan Chen is a licensed clinical social worker and certified sex therapist with over 10 years of experience helping young adults navigate the emotional aspects of sexual health. They specialize in addressing shame, anxiety, and trauma in a compassionate, affirming environment.'
      }
    },
    {
      id: 3,
      type: 'ama',
      category: 'ASK ME ANYTHING',
      title: 'AMA: STI Prevention with Dr. James Kim',
      description: 'Got questions about prevention, condoms, PrEP, or vaccines? Dr. Kim is here to answer everything. This is your chance to learn from one of the top infectious disease experts in the field.',
      date: 'Friday, February 27',
      time: '5:26 PM',
      duration: '60 minutes',
      format: 'Live Video',
      questionsSubmitted: 0,
      instructor: {
        name: 'Dr. James Kim',
        title: 'MD, PhD, Infectious Disease Specialist',
        avatar: 'D',
        bio: 'Dr. Kim is a leading expert in STI prevention and public health. He has published over 50 research papers and works with organizations worldwide to improve sexual health education and access to preventive care.'
      }
    },
    {
      id: 4,
      type: 'workshop',
      category: 'Testing & Prevention',
      categoryColor: '#b2dfdb',
      title: 'First Time Testing 101',
      description: 'Everything you need to know about getting tested for the first time. We\'ll walk through the process, what to expect, and answer all your questions in a judgment-free space.',
      date: 'Tuesday, February 17',
      time: '5:12 PM',
      duration: '75 minutes',
      format: 'Online',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Dr. Sarah Chen',
        title: 'MD, Sexual Health Specialist, 10+ years experience',
        avatar: 'D'
      }
    },
    {
      id: 5,
      type: 'workshop',
      category: 'Safe Practices',
      categoryColor: '#b2dfdb',
      title: 'Let\'s Talk Condoms',
      description: 'An honest, shame-free conversation about condoms, consent, and communication. Learn how to talk about protection with partners confidently.',
      date: 'Tuesday, February 24',
      time: '5:12 PM',
      duration: '60 minutes',
      format: 'Hybrid',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Alex Rodriguez',
        title: 'MPH, Youth Health Educator',
        avatar: 'A'
      }
    },
    {
      id: 6,
      type: 'workshop',
      category: 'Treatment & Support',
      categoryColor: '#b2dfdb',
      title: 'Caring for Your Body After an STI',
      description: 'Diagnosed with an STI? You\'re not alone. Join us for practical advice on treatment, talking to partners, and maintaining your mental and physical health.',
      date: 'Monday, March 2',
      time: '5:12 PM',
      duration: '90 minutes',
      format: 'Online',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Dr. Maya Patel',
        title: 'MD, Infectious Disease Specialist',
        avatar: 'D'
      }
    },
    {
      id: 7,
      type: 'workshop',
      category: 'Communication',
      categoryColor: '#b2dfdb',
      title: 'Love, Sex & Shame: How to Talk About It',
      description: 'Break the silence around sexual health. Learn communication strategies for talking about STIs, testing, and sexual health with partners, friends, and healthcare providers.',
      date: 'Monday, March 9',
      time: '5:12 PM',
      duration: '75 minutes',
      format: 'Online',
      registered: 0,
      spotsLeft: 100,
      instructor: {
        name: 'Jordan Lee',
        title: 'LCSW, Relationship Therapist',
        avatar: 'J'
      }
    }
  ];

  if (workshopsUnlocked) {
    return (
      <div className={styles.content}>
        {/* Success Banner */}
        <div className={styles.successBanner}>
          <div className={styles.successEmoji}><StarIcon /></div>
          <div>
            <h3 className={styles.successTitle}>Workshops & Events Unlocked!</h3>
            <p className={styles.successDescription}>
              Great job completing 3 quizzes! You now have access to all our expert-led workshops and AMA sessions. Choose a session below and join anonymously with just a nickname.
            </p>
          </div>
        </div>

        {/* Ask Me Anything Events */}
        <div className={styles.section}>
          <h2 className={styles.workshopSectionTitle}>
            <MessageCircle size={28} color="#a855f7" />
            Ask Me Anything Events
          </h2>
          
          <div className={styles.workshopList}>
            {workshops.filter(w => w.type === 'ama').map(workshop => (
              <div key={workshop.id} className={styles.workshopCard}>
                <span className={styles.amaTag}>
                   <MessageCircle size={28} color="#a855f7" />   {workshop.category}
                </span>

                <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                <p className={styles.workshopDescription}>{workshop.description}</p>

                {/* Event Details */}
                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <Calendar size={18} color="#a855f7" />
                    <div>
                      <div className={styles.eventDetailLabel}>Date</div>
                      <div className={styles.eventDetailValue}>{workshop.date}</div>
                      <div className={styles.eventDetailTime}>{workshop.time}</div>
                    </div>
                  </div>

                  <div className={styles.eventDetail}>
                    <Clock size={18} color="#a855f7" />
                    <div>
                      <div className={styles.eventDetailLabel}>Duration</div>
                      <div className={styles.eventDetailValue}>{workshop.duration}</div>
                    </div>
                  </div>

                  <div className={styles.eventDetail}>
                    {workshop.format === 'Live Video' ? (
                      <Video size={18} color="#a855f7" />
                    ) : (
                      <MessageCircle size={18} color="#a855f7" />
                    )}
                    <div>
                      <div className={styles.eventDetailLabel}>Format</div>
                      <div className={styles.eventDetailValue}>{workshop.format}</div>
                    </div>
                  </div>

                  <div className={styles.eventDetail}>
                    <ChevronRight size={18} color="#a855f7" />
                    <div>
                      <div className={styles.eventDetailLabel}>Questions</div>
                      <div className={styles.eventDetailValue}>{workshop.questionsSubmitted} questions submitted</div>
                    </div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className={styles.instructorInfo}>
                  <div className={styles.instructorHeader}>
                    <div className={styles.instructorAvatarAma}>{workshop.instructor.avatar}</div>
                    <div>
                      <div className={styles.instructorName}>{workshop.instructor.name}</div>
                      <div className={styles.instructorTitleAma}>{workshop.instructor.title}</div>
                      <p className={styles.instructorBio}>{workshop.instructor.bio}</p>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <button className={styles.registerButtonAma}>
                  <MessageCircle size={18} />
                  Register for AMA
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expert-Led Workshops */}
        <div>
          <h2 className={styles.workshopSectionTitle}>
            🎓 Expert-Led Workshops
          </h2>
          
          <div className={styles.workshopList}>
            {workshops.filter(w => w.type === 'workshop').map(workshop => (
              <div key={workshop.id} className={styles.workshopCard}>
                <span className={styles.workshopTag}>{workshop.category}</span>

                <h3 className={styles.workshopTitle}>{workshop.title}</h3>
                <p className={styles.workshopDescription}>{workshop.description}</p>

                {/* Event Details */}
                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <Calendar size={18} color="#00897b" />
                    <div>
                      <div className={styles.eventDetailLabel}>Date</div>
                      <div className={styles.eventDetailValue}>{workshop.date}</div>
                      <div className={styles.eventDetailTime}>{workshop.time}</div>
                    </div>
                  </div>

                  <div className={styles.eventDetail}>
                    <Clock size={18} color="#00897b" />
                    <div>
                      <div className={styles.eventDetailLabel}>Duration</div>
                      <div className={styles.eventDetailValue}>{workshop.duration}</div>
                    </div>
                  </div>

                  <div className={styles.eventDetail}>
                    {workshop.format === 'Online' ? (
                      <Video size={18} color="#00897b" />
                    ) : (
                      <MapPin size={18} color="#00897b" />
                    )}
                    <div>
                      <div className={styles.eventDetailLabel}>Format</div>
                      <div className={styles.eventDetailValue}>{workshop.format}</div>
                    </div>
                  </div>

                  <div className={styles.eventDetail}>
                    <Users size={18} color="#00897b" />
                    <div>
                      <div className={styles.eventDetailLabel}>Availability</div>
                      <div className={styles.eventDetailValue}>
                        {workshop.registered} registered · {workshop.spotsLeft} spots left
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className={styles.workshopInstructor}>
                  <div className={styles.instructorAvatar}>{workshop.instructor.avatar}</div>
                  <div>
                    <div className={styles.instructorName}>{workshop.instructor.name}</div>
                    <div className={styles.instructorTitle}>{workshop.instructor.title}</div>
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
              <div key={idx}>
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
    <div className={styles.lockedBannerContent}>  
   <div className={styles.lockedIcon}>
     <Lock size={28} color="#f0efee" />
   </div>
        <h2 className={styles.lockedTitle}>Unlock Expert Workshops</h2></div>  
        <p className={styles.lockedDescription}>
          Complete 3 myth-busting quizzes to unlock access to our exclusive, expert-led workshops!
        </p>

        {/* Progress */}
        <div className={styles.lockedProgress}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Your Progress</span>
            <span className={styles.lockedProgressCount}>{quizzesCompleted}/3 quizzes</span>
          </div>
          <div className={styles.lockedProgressBar}>
            <div 
              className={styles.lockedProgressFill}
              style={{ width: `${(quizzesCompleted / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* What You'll Unlock */}
        <div className={styles.unlockList}>
          <h3 className={styles.unlockListTitle}>
            ✨ What you'll unlock:
          </h3>
          <div className={styles.unlockItems}>
            {[
              'Live sessions with healthcare professionals',
              'Anonymous attendance with nickname-only participation',
              'Interactive Q&A in a judgment-free space',
              'Both online and in-person options',
              'Monthly AMA sessions with renowned experts'
            ].map((item, idx) => (
              <div key={idx} className={styles.unlockItem}>
                <CheckCircle size={20} color="#00897b" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setActiveTab('challenge')}
          className={styles.startQuizzesButton}
        >
          Start Taking Quizzes
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default WorkshopsTab;