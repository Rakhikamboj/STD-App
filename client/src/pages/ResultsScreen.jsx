import React, { useState } from 'react';
import { InfoIcon, AlertCircle, ChevronRight, MessageCircle, FileText, CheckCircle } from 'lucide-react';
import styles from './ResultsScreen.module.css';

const ResultsScreen = ({ result, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [expandedCondition, setExpandedCondition] = useState(null);
    const [showPartnerTemplate, setShowPartnerTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('direct');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const conditionDetails = {
    'Chlamydia': {
      incubation: '7-21 days',
      prevalence: 'Very common, especially in young adults',
      expandedInfo: 'Chlamydia is one of the most common STIs and is completely curable with a simple course of antibiotics. Many people have no symptoms, which is why routine testing is important.'
    },
    'Gonorrhea': {
      incubation: '2-14 days',
      prevalence: 'Common, often occurs with chlamydia',
      expandedInfo: 'Gonorrhea is treatable with antibiotics, though some strains are becoming resistant. It\'s important to get tested and treated promptly to prevent complications.'
    },
    'Trichomoniasis': {
      incubation: '5-28 days',
      prevalence: 'Common but underdiagnosed',
      expandedInfo: 'Trichomoniasis is easily treated with a single dose of medication. Many people have no symptoms but can still pass it to partners.'
    },
    'Genital Herpes': {
      incubation: '2-12 days',
      prevalence: 'Very common, often asymptomatic',
      expandedInfo: 'Genital herpes is manageable with antiviral medications. While there\'s no cure, outbreaks can be controlled and transmission risk can be reduced.'
    },
    'Genital Warts': {
      incubation: '3 weeks to 8 months',
      prevalence: 'Common, caused by HPV',
      expandedInfo: 'Genital warts are caused by certain types of HPV. They can be treated, and vaccines are available to prevent the most common types.'
    },
    'Syphilis': {
      incubation: '10-90 days',
      prevalence: 'Increasing in recent years',
      expandedInfo: 'Syphilis is curable with antibiotics, especially when caught early. Left untreated, it can cause serious health problems.'
    }
  };

  const partnerTemplates = {
    direct: {
      title: 'Direct Message',
      message: '"I recently got tested and found out I have [condition]. I wanted to let you know so you can get tested too. It\'s treatable, and I\'m already working with my doctor."'
    },
    anonymous: {
      title: 'Anonymous Notification',
      message: 'Many health departments offer anonymous partner notification services. They\'ll contact your partners without revealing your identity.'
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        {/* Header */}
        <div className={styles.resultHeader}>
          <h1 className={styles.resultTitle}>Your Personalized Overview</h1>
          <p className={styles.resultSubtitle}>
            This is not a diagnosis. Please consult a healthcare provider for proper evaluation.
          </p>
        </div>

        {/* Follow-up Banner */}
        {result.hasSymptoms ? (
          <div className={styles.followUpBanner}>
            <InfoIcon className={styles.bannerIcon} size={22} />
            <div>
              <h3 className={styles.bannerTitle}>Medical Evaluation Suggested</h3>
              <p className={styles.bannerText}>
                Consider scheduling an appointment within the next few days
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.routineCareBanner}>
            <CheckCircle className={styles.bannerIconGreen} size={28} />
            <div>
              <h3 className={styles.bannerTitleGreen}>Routine Care</h3>
              <p className={styles.bannerText}>
                Consider this as part of regular health maintenance
              </p>
            </div>
          </div>
        )}

        {/* Possible Considerations */}
        {result.possibleConditions && result.possibleConditions.length > 0 && (
          <div className={styles.resultSection}>
            <h2 className={styles.sectionTitle}>Possible Considerations</h2>
            <p className={styles.sectionDescription}>
              Based on your responses, here are some conditions that share similar characteristics. 
              Remember, many STIs have similar symptoms, and proper testing is the only way to know for sure.
            </p>

            <div className={styles.conditions}>
              {result.possibleConditions.map((condition, index) => {
                const details = Object.keys(conditionDetails).find(key => 
                  condition.condition.toLowerCase().includes(key.toLowerCase())
                );
                const conditionInfo = details ? conditionDetails[details] : null;
                const isExpanded = expandedCondition === index;

                return (
                  <div 
                    key={index} 
                    className={`${styles.conditionCard} ${isExpanded ? styles.expanded : ''}`}
                    onClick={() => setExpandedCondition(isExpanded ? null : index)}
                  >
                    <div className={styles.conditionHeader}>
                      <h3 className={styles.conditionName}>{condition.condition}</h3>
                    </div>
                    
                    <p className={styles.conditionDescription}>{condition.description}</p>

                    {conditionInfo && (
                      <>
                        <div className={styles.conditionMeta}>
                         <span className={styles.metaItem}>
                          <strong>Incubation Period:</strong> {conditionInfo.incubation}
                          </span>
                          <div className={styles.metaItem}>
                            <strong>Prevalence:</strong> {conditionInfo.prevalence}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className={styles.expandedInfo}>
                            <p>{conditionInfo.expandedInfo}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}  

        {/* Your Next Steps */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className={styles.resultSection}>
            <h2 className={styles.sectionTitle}>Your Next Steps</h2>
            <div className={styles.nextSteps}>
              {result.recommendations.slice(0, 5).map((rec, index) => (
                <div key={index} className={styles.stepItem}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <p className={styles.stepText}>{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partner Notification */}
       
          <div className={styles.partnerNotificationSection}>
            <div className={styles.gradientCard}>
              <h2 className={styles.gradientCardTitle}>Partner Notification Templates</h2>
              <p className={styles.gradientCardSubtitle}>
                If you test positive, letting partners know is the responsible thing to do. 
                Here are some ways to approach it:
              </p>

              <div className={styles.templates}>
                <div className={styles.templateCard}>
                  <h3 className={styles.templateTitle}>Direct Message</h3>
                  <p className={styles.templateMessage}>
                    "I recently got tested and found out I have [condition]. I wanted to let you 
                    know so you can get tested too. It's treatable, and I'm already working with my doctor."
                  </p>
                </div>

                <div className={styles.templateCard}>
                  <h3 className={styles.templateTitle}>Anonymous Notification</h3>
                  <p className={styles.templateMessage}>
                    Many health departments offer anonymous partner notification services. They'll 
                    contact your partners without revealing your identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
      

        {/* Bottom Action Cards */}
        <div className={styles.actionCards}>
          <div className={styles.actionCard} onClick={() => window.location.href = '/education'}>
            <FileText className={styles.actionIcon} size={32} />
            <div>
              <h3 className={styles.actionTitle}>Education Hub</h3>
              <p className={styles.actionDescription}>Learn more about STI prevention</p>
            </div>
            <ChevronRight className={styles.actionArrow} size={20} />
          </div>

          <div className={styles.actionCard} onClick={() => window.location.href = '/community'}>
            <MessageCircle className={styles.actionIcon} size={32} />
            <div>
              <h3 className={styles.actionTitle}>Ask a Doctor</h3>
              <p className={styles.actionDescription}>Get answers from professionals</p>
            </div>
            <ChevronRight className={styles.actionArrow} size={20} />
          </div>
        </div>

        {/* Start New Assessment */}
        <div className={styles.restartSection}>
          <button onClick={onRestart} className={styles.restartButton}>
            Start New Assessment
          </button>
        </div>

        {/* Important Disclaimer */}
       
      </div>
    </div>
  );
};

export default ResultsScreen;
