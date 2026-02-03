import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Heart, Book, MessageCircle, Share2, Copy } from 'lucide-react';
import styles from './ResultsScreen.module.css';

const ResultsScreen = ({ result, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [showPartnerTemplate, setShowPartnerTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('direct');

  const templates = {
    direct: {
      title: 'Direct Message',
      description: 'Share directly with your partner',
      template: `I recently got tested for my sexual health and I wanted to be transparent with you. I'm working with my healthcare provider to address some things that came up. I'd really appreciate if you could also get tested so we can both stay healthy. It's important to me that we communicate openly about this. [Your healthcare provider's guidance may be specific to your situation]`
    },
    anonymous: {
      title: 'Anonymous Notification Service',
      description: 'Your health department can notify them confidentially',
      template: `Many health departments offer confidential partner notification services. You can ask your healthcare provider to initiate this. They'll contact your partner(s) without revealing your identity, giving them a chance to get tested.`
    },
    supportive: {
      title: 'Supportive Approach',
      description: 'Focus on health and relationship',
      template: `I care about both of our health and I have something important to share. I recently discovered some health concerns that I'm addressing with my doctor. Because of the nature of it, it's important that you get tested too. I know this might be uncomfortable, but I value our honesty with each other. Can we talk about this together?`
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        {/* Header */}
        <div className={styles.resultHeader}>
          <h1 className={styles.resultTitle}>Your Health Assessment</h1>
          <p className={styles.resultSubtitle}>
            Thank you for completing this assessment. Here's what we found:
          </p>
        </div>

        {/* Main Message */}
        {result.hasSymptoms ? (
          <div className={styles.mainMessage}>
            <AlertCircle size={32} style={{ color: '#0d9488' }} />
            <div>
              <h2>Medical Evaluation Suggested</h2>
              <p>
                Consider scheduling an appointment with a healthcare provider within the next few days. 
                They can properly evaluate your symptoms and recommend appropriate testing if needed.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.mainMessage} style={{ borderColor: '#10b981', background: '#ecfdf5' }}>
            <CheckCircle size={32} style={{ color: '#10b981' }} />
            <div>
              <h2>Proactive Health Management</h2>
              <p>
                You're being proactive about your sexual health! Continue practicing safe sex 
                and get tested regularly as recommended by your healthcare provider.
              </p>
            </div>
          </div>
        )}

        {/* Possible Considerations */}
        {result.possibleConditions && result.possibleConditions.length > 0 && (
          <div className={styles.resultSection}>
            <h2 className={styles.resultSectionTitle}>
              <AlertCircle size={24} />
              Possible Considerations
            </h2>
            <p className={styles.sectionDescription}>
              Based on your responses, here are some conditions that share similar characteristics. 
              Remember, many STIs have similar symptoms, and proper testing is the only way to know for sure.
            </p>
            <div className={styles.conditions}>
              {result.possibleConditions.map((condition, index) => (
                <div key={index} className={styles.conditionCard}>
                  <div className={styles.conditionContent}>
                    <h3 className={styles.conditionName}>{condition.condition}</h3>
                    {condition.description && (
                      <p className={styles.conditionDescription}>{condition.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className={styles.resultSection}>
            <h2 className={styles.resultSectionTitle}>
              <CheckCircle size={24} />
              Your Next Steps
            </h2>
            <ul className={styles.recommendations}>
              {result.recommendations.map((rec, index) => (
                <li key={index} className={styles.recommendation}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Partner Notification */}
        {result.hasSymptoms && (
          <div className={styles.resultSection}>
            <h2 className={styles.resultSectionTitle}>
              <Heart size={24} />
              Partner Notification
            </h2>
            <p className={styles.sectionDescription}>
              If you test positive, letting partners know is the responsible thing to do. 
              Here are some thoughtful approaches:
            </p>

            <div className={styles.templateSelector}>
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => {
                    setShowPartnerTemplate(true);
                    setSelectedTemplate(key);
                  }}
                  className={`${styles.templateButton} ${
                    showPartnerTemplate && selectedTemplate === key ? styles.selected : ''
                  }`}
                >
                  <MessageCircle size={20} />
                  {template.title}
                </button>
              ))}
            </div>

            {showPartnerTemplate && templates[selectedTemplate] && (
              <div className={styles.templateDetail}>
                <h3>{templates[selectedTemplate].title}</h3>
                <p className={styles.templateDescription}>
                  {templates[selectedTemplate].description}
                </p>
                <div className={styles.templateContent}>
                  <p>{templates[selectedTemplate].template}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(templates[selectedTemplate].template)}
                  className={styles.copyButton}
                >
                  <Copy size={18} />
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Education Hub */}
        <div className={styles.resultSection}>
          <h2 className={styles.resultSectionTitle}>
            <Book size={24} />
            Education Hub
          </h2>
          <p className={styles.sectionDescription}>
            Learn more about sexual health, STI testing, and prevention:
          </p>
          <div className={styles.educationLinks}>
            <a 
              href="https://www.plannedparenthood.org/learn/health-and-wellness/stis" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.educationLink}
            >
              <span>STI Information & Prevention - Planned Parenthood</span>
              <Share2 size={16} />
            </a>
            <a 
              href="https://www.cdc.gov/std/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.educationLink}
            >
              <span>CDC STI Testing & Treatment Guide</span>
              <Share2 size={16} />
            </a>
            <a 
              href="https://www.aasect.org/find-a-provider" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.educationLink}
            >
              <span>Find a Sexual Health Provider</span>
              <Share2 size={16} />
            </a>
            <a 
              href="https://www.webmd.com/sexual-conditions/guide/stis" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.educationLink}
            >
              <span>Understanding Common STIs</span>
              <Share2 size={16} />
            </a>
          </div>
        </div>

        {/* Ask Doctor Section */}
        <div className={styles.resultSection}>
          <h2 className={styles.resultSectionTitle}>
            <MessageCircle size={24} />
            Ask a Doctor Anonymously
          </h2>
          <p className={styles.sectionDescription}>
            Have specific questions? Connect with medical professionals who can provide personalized guidance:
          </p>
          <div className={styles.doctorServices}>
            <div className={styles.service}>
              <h3>Telehealth Options</h3>
              <p>Many platforms offer confidential video consultations with licensed doctors.</p>
              <button className={styles.ctaButton}>
                Find Telehealth Providers
              </button>
            </div>
            <div className={styles.service}>
              <h3>Sexual Health Clinics</h3>
              <p>Local sexual health clinics often provide discreet, judgment-free care.</p>
              <button className={styles.ctaButton}>
                Find Health Clinics
              </button>
            </div>
            <div className={styles.service}>
              <h3>Anonymous Text Lines</h3>
              <p>Text your health questions to confidential health information services.</p>
              <button className={styles.ctaButton}>
                Health Text Services
              </button>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className={styles.disclaimer}>
          <AlertCircle size={20} />
          <div>
            <strong>Important Medical Disclaimer:</strong>
            <p>
              This tool provides general guidance only and is not a substitute for professional medical advice. 
              Always consult with a qualified healthcare provider for diagnosis, treatment recommendations, 
              and personalized medical guidance. The information provided here is educational and should not 
              be used for self-diagnosis.
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className={styles.privacyNotice}>
          <strong>Privacy Notice:</strong> Your responses were completely anonymous and have not been stored. 
          This assessment is confidential and provided for educational purposes only.
        </div>

        {/* Action Buttons */}
        <div className={styles.resultActions}>
          <button onClick={onRestart} className={styles.restartButton}>
            Take Assessment Again
          </button>
          <a href="/" className={styles.homeButton}>
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
