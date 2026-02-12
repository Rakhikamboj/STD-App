import React from 'react';
import {
  InfoIcon,
  ArrowRight,
  MessageCircle,
  FileText,
  CheckCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import styles from './ResultsScreen.module.css';
import { referenceImagesMap } from './SymptomChecker';

// ─── Risk level display config ────────────────────────────────────────────────
const RISK_CONFIG = {
  low:    { label: 'Low Concern',      color: '#16a34a', bg: '#f0fdf4' },
  medium: { label: 'Moderate Concern', color: '#d97706', bg: '#fffbeb' },
  high:   { label: 'High Concern',     color: '#dc2626', bg: '#fef2f2' },
};

// ─── Static fallback details for known condition names ────────────────────────
// Used when the AI omits incubation / prevalence / expandedInfo for a condition
// whose name partially matches one of these keys (case-insensitive).
const CONDITION_DETAILS = {
  'chlamydia': {
    incubation: '7-21 days',
    prevalence: 'Very common, especially in young adults',
    expandedInfo: 'Chlamydia is completely curable with a short course of antibiotics. Many people carry it without any symptoms, which is why routine testing is the most reliable way to stay informed.',
  },
  'gonorrhea': {
    incubation: '2-14 days',
    prevalence: 'Common, often co-occurs with chlamydia',
    expandedInfo: 'Gonorrhea responds well to antibiotic treatment when identified early. Seeking care promptly helps prevent complications and supports the health of your partners too.',
  },
  'trichomoniasis': {
    incubation: '5-28 days',
    prevalence: 'Common but frequently underdiagnosed',
    expandedInfo: 'Trichomoniasis clears up easily with a single prescribed dose of medication. Because it rarely causes noticeable symptoms, a test is the most dependable way to confirm it.',
  },
  'genital herpes': {
    incubation: '2-12 days',
    prevalence: 'Very common, often asymptomatic',
    expandedInfo: 'Herpes is a manageable long-term condition for millions of people. Daily antiviral therapy can significantly reduce outbreak frequency and lower the risk of transmission.',
  },
  'herpes': {
    incubation: '2-12 days',
    prevalence: 'Very common, often asymptomatic',
    expandedInfo: 'Herpes is a manageable long-term condition for millions of people. Daily antiviral therapy can significantly reduce outbreak frequency and lower the risk of transmission.',
  },
  'genital warts': {
    incubation: '3 weeks – 8 months',
    prevalence: 'Common, caused by certain HPV strains',
    expandedInfo: 'Genital warts have multiple effective treatment paths, and many resolve on their own over time. HPV vaccination provides strong protection against the strains most commonly responsible.',
  },
  'warts': {
    incubation: '3 weeks – 8 months',
    prevalence: 'Common, caused by certain HPV strains',
    expandedInfo: 'Genital warts have multiple effective treatment paths, and many resolve on their own over time. HPV vaccination provides strong protection against the strains most commonly responsible.',
  },
  'syphilis': {
    incubation: '10-90 days',
    prevalence: 'Rates have been rising in recent years',
    expandedInfo: 'Syphilis is fully curable with a course of penicillin, particularly when caught in its early stages. A straightforward blood test is all that is needed to confirm the diagnosis.',
  },
  'scabies': {
    incubation: '2-6 weeks (first exposure)',
    prevalence: 'Common, spreads through close skin contact',
    expandedInfo: 'Scabies is treated effectively with a prescription topical cream applied once. Treating close household contacts at the same time is recommended to prevent re-infection.',
  },
  'molluscum': {
    incubation: '2-7 weeks',
    prevalence: 'Fairly common, particularly in younger adults',
    expandedInfo: 'Molluscum contagiosum bumps often resolve on their own within a few months. Several in-office treatment options are also available if a faster resolution is preferred.',
  },
};

/**
 * Case-insensitive substring match against CONDITION_DETAILS keys.
 * Returns the matched detail object or null.
 */
const getFallbackDetails = (conditionName) => {
  const lower = conditionName.toLowerCase();
  const key   = Object.keys(CONDITION_DETAILS).find((k) => lower.includes(k));
  return key ? CONDITION_DETAILS[key] : null;
};

// ─────────────────────────────────────────────────────────────────────────────

const ResultsScreen = ({ result, onRestart }) => {
  const {
    hasSymptoms             = false,
    possibleConditions      = [],
    recommendations         = [],
    aiMessage               = '',
    analyzedByAI            = false,
    riskLevel               = 'low',
    selectedReferenceImages = [],
  } = result;

  const riskConfig = RISK_CONFIG[riskLevel] || RISK_CONFIG.low;

  return (
    <div className={styles.container}>
      <div className={styles.result}>

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className={styles.resultHeader}>
          <h1 className={styles.resultTitle}>Your Personalized Overview</h1>
          <p className={styles.resultSubtitle}>
            This is not a diagnosis. Please consult a healthcare provider for proper evaluation.
          </p>

          <div
            className={styles.analysisBadge}
            style={{ background: analyzedByAI ? '#eff6ff' : '#f9fafb' }}
          >
            {analyzedByAI ? (
              <>
                <Sparkles size={14} color="#3b82f6" />
                <span style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: 600 }}>
                  AI-powered analysis
                </span>
              </>
            ) : (
              <>
                <ShieldCheck size={14} color="#6b7280" />
                <span style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>
                  Standard assessment
                </span>
              </>
            )}
          </div>
        </div>

        {/* ── AI Supportive Message ─────────────────────────────────────────── */}
        {aiMessage && (
          <div className={styles.aiMessageCard}>
            <p className={styles.aiMessageText}>{aiMessage}</p>
          </div>
        )}

        {/* ── Follow-up / Routine care banner ──────────────────────────────── */}
        {hasSymptoms ? (
          <div className={styles.followUpBanner}>
            <InfoIcon className={styles.bannerIcon} size={22} />
            <div className={styles.bannerContent}>
              <h3 className={styles.bannerTitle}>Medical Evaluation Suggested</h3>
              <p className={styles.bannerText}>
                Consider scheduling an appointment within the next few days
              </p>
            </div>
            <div
              className={styles.riskPill}
              style={{ background: riskConfig.bg, color: riskConfig.color }}
            >
              {riskConfig.label}
            </div>
          </div>
        ) : (
          <div className={styles.routineCareBanner}>
            <CheckCircle className={styles.bannerIconGreen} size={28} />
            <div className={styles.bannerContent}>
              <h3 className={styles.bannerTitleGreen}>Routine Care</h3>
              <p className={styles.bannerText}>
                Consider this as part of regular health maintenance
              </p>
            </div>
          </div>
        )}

        {/* ── Possible Considerations ───────────────────────────────────────── */}
        {possibleConditions.length > 0 && (
          <div className={styles.resultSection}>
            <h2 className={styles.sectionTitle}>Possible Considerations</h2>
            <p className={styles.sectionDescription}>
              Based on your responses and the reference images you selected, here are
              conditions that share similar characteristics. Proper testing is the only
              way to know for certain.
            </p>
         

            <div className={styles.conditions}>
              {possibleConditions.map((condition, index) => {
                // Merge AI fields with static fallback for anything missing
                const fallback    = getFallbackDetails(condition.condition);
                const incubation  = condition.incubation   || fallback?.incubation  || null;
                const prevalence  = condition.prevalence   || fallback?.prevalence  || null;
                const expandedInfo = condition.expandedInfo || fallback?.expandedInfo || null;

                // Resolve the reference image for this condition:
                // 1. AI explicitly set condition.imageType
                // 2. Fallback: find a selectedReferenceImages key contained in the condition name
                const imageType =
                  condition.imageType ||
                  selectedReferenceImages.find((t) =>
                    condition.condition.toLowerCase().includes(t.toLowerCase())
                  ) ||
                  null;

                const imageSrc = imageType ? referenceImagesMap[imageType] : null;

                return (
                  <div key={index} className={styles.conditionCard}>

                    {/* Name + thumbnail side-by-side */}
                    <div className={styles.conditionHeaderRow}>
                      <div className={styles.conditionHeaderText}>
                        <h3 className={styles.conditionName}>{condition.condition}</h3>
                        <p className={styles.conditionDescription}>{condition.description}</p>
                      </div>

                      {imageSrc && (
                        <div className={styles.conditionImageWrapper}>
                          <img
                            src={imageSrc}
                            alt={condition.condition}
                            className={styles.conditionImage}
                          />
                        </div>
                      )}
                    </div>

                    {/* Incubation + Prevalence */}
                    {(incubation || prevalence) && (
                      <div className={styles.conditionMeta}>
                        {incubation && (
                          <span className={styles.metaItem}>
                            <strong>Incubation Period:</strong>
                            {incubation}
                          </span>
                        )}
                        {prevalence && (
                          <div className={styles.metaItem}>
                            <strong>Prevalence:</strong>
                            {prevalence}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Reassuring treatability note */}
                    {condition.descriptionNote && (
                      <div className={styles.descriptionNote}>
                        {condition.descriptionNote}
                      </div>
                    )}

                    {/* Additional clinical context — always visible, no toggle */}
                    {expandedInfo && (
                      <div className={styles.expandedInfo}>
                        <p>{expandedInfo}</p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Your Next Steps ───────────────────────────────────────────────── */}
        {recommendations.length > 0 && (
          <div className={styles.resultSection}>
            <h2 className={styles.sectionTitle}>Your Next Steps</h2>
            <div className={styles.nextSteps}>
              {recommendations.slice(0, 6).map((rec, index) => (
                <div key={index} className={styles.stepItem}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <p className={styles.stepText}>{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Partner Notification ──────────────────────────────────────────── */}
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

        {/* ── Action Cards ──────────────────────────────────────────────────── */}
        <div className={styles.actionCards}>
          <div className={styles.actionCard} onClick={() => window.location.href = '/education'}>
            <FileText className={styles.actionIcon} size={28} />
            <div className={styles.actionCardContent}>
              <h3 className={styles.actionTitle}>Education Hub</h3>
              <p className={styles.actionDescription}>Learn more about STI prevention</p>
            </div>
            <ArrowRight className={styles.actionArrow} size={18} />
          </div>

          <div className={styles.actionCard} onClick={() => window.location.href = '/community'}>
            <MessageCircle className={styles.actionIcon} size={28} />
            <div className={styles.actionCardContent}>
              <h3 className={styles.actionTitle}>Ask a Doctor</h3>
              <p className={styles.actionDescription}>Get answers from professionals</p>
            </div>
            <ArrowRight className={styles.actionArrow} size={18} />
          </div>
        </div>

        {/* ── Restart ───────────────────────────────────────────────────────── */}
        <div className={styles.restartSection}>
          <button onClick={onRestart} className={styles.restartButton}>
            Start New Assessment
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultsScreen;