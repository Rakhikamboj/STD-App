import React, { useState } from 'react';
import styles from './Faqs.module.css'
// import { CircleQuestionMark } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the symptom checker work?",
      answer: ""
    },
    {
      question: "Is this the same as a medical diagnosis?",
      answer: "No. The symptom checker is an educational tool that helps you understand what might be going on and what to do next. It cannot diagnose you with a specific infection or condition.\n\nOnly a healthcare provider can give you an official diagnosis after reviewing your medical history, doing an exam, and running lab tests. Think of this tool as a helpful starting point, not a final answer."
    },
    {
      question: "What happens after I answer the questions?",
      answer: ""
    },
    {
      question: "Is my information private?",
      answer: ""
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.header}>
        <div className={styles.iconWrapperWhite}>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        </div>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Everything you need to know about our symptom checker. We're here to support you with clear, honest answers.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button 
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <div className={styles.questionContent}>
                <div className={styles.questionIconGreen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></div>
                <span className={styles.questionText}>{faq.question}</span>
              </div>
              <svg 
                className={`${styles.toggleIcon} ${openIndex === index ? styles.toggleIconOpen : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {openIndex === index ? (
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <>
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
            {openIndex === index && faq.answer && (
              <div className={styles.faqAnswer}>
                {faq.answer.split('\n\n').map((paragraph, i) => (
                  <p key={i} className={styles.answerParagraph}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;