import React, { useState } from 'react';
import styles from './Faqs.module.css'
// import { CircleQuestionMark } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the symptom checker work?",
      answer: "Our symptom checker asks you a series of questions about any symptoms you're experiencing, your sexual health history, and potential exposures. Based on your answers, it provides information about possible causes and recommends next steps—like getting tested or speaking with a doctor."

    },
    {
      question: "Is this the same as a medical diagnosis?",
      answer: "No. The symptom checker is an educational tool that helps you understand what might be going on and what to do next. It cannot diagnose you with a specific infection or condition.\n\nOnly a healthcare provider can give you an official diagnosis after reviewing your medical history, doing an exam, and running lab tests. Think of this tool as a helpful starting point, not a final answer."
    },
    {
      question: "What happens after I answer the questions?",
      answer: "After you complete the questionnaire, you'll receive personalized results that explain: • Possible causes of your symptoms • Which STIs might be worth testing for • Where to get tested or find care • What to expect during testing and treatment Your results are shown on your screen only—we don't store or share them. You can screenshot them to reference later or share with a healthcare provider."
    },
    {
      question: "Is my information private?",
      answer: "Absolutely. Your privacy is our top priority. The symptom checker is completely anonymous—you don't need to create an account or provide any personal information like your name, email, or phone number. Your answers are not stored in our system or linked to you in any way. Everything stays on your device, and no one else can see what you've shared."
    },
    {
      question: "What if I don't have any symptoms?",
      answer: "That's actually really common. Many STIs don't cause noticeable symptoms, especially in the early stages. You can still use this tool to assess your risk based on your sexual activity and history. If you've had unprotected sex or a partner who tested positive, it's a good idea to get tested even without symptoms. The tool can help you figure out which tests might make sense for you. Remember, regular testing is a key part of taking care of your sexual health, even if you feel fine."
    },
    {
      question: "Why am I being asked about body parts?",
      answer: "Different STIs affect different parts of the body, and symptoms can show up in places you might not expect—like your throat, rectum, or skin. We ask about specific body parts to give you the most accurate information.We use clear, respectful language and keep questions as straightforward as possible. You're always in control and can skip questions if you're not comfortable answering."
    },
    {
      question: "Can this tool tell me exactly which STI I have?",
      answer: "No, it can't. The symptom checker can suggest which infections are possible based on your symptoms and history, but it cannot tell you exactly what you have. Many STIs have similar or overlapping symptoms, and some have no symptoms at all. The only way to know for sure is to get tested by a healthcare provider. The tool will help you understand which tests to ask for."
    },
        {
      question: "What should I do if I think I'm at risk?",
      answer: "First, take a breath—you're already doing the right thing by seeking information. The next step is to get tested. Most STIs are treatable, and the sooner you know, the sooner you can take action.The symptom checker will give you resources to find free or low-cost testing near you. If you're worried, reach out to a doctor or visit a clinic. Many offer confidential walk-in appointments or telehealth consultations."
    },
        {
      question: "What if I feel embarrassed or anxious?",
      answer: "It's totally normal to feel nervous, anxious, or embarrassed. Sexual health can feel really personal, and there's a lot of unfair stigma around STIs. Remember: having questions or concerns about your sexual health is responsible, not shameful. Healthcare providers see this every day and are there to help, not judge. You deserve care and support, no matter what. The symptom checker is designed to be a safe, non-judgmental space for you to get information and take control of your health."
    },
        {
      question: "Can I use this without going to a doctor?",
      answer: "You can use this tool anytime to learn more and understand your symptoms, but it's not a replacement for medical care. If the tool suggests you might have an infection, the best next step is to see a healthcare provider.Getting tested and treated early protects your health and prevents complications. Many STIs can be cured with medication, and even the ones that can't be cured can be managed effectively with the right care."
    },



  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.header}>
        <div className={styles.iconWrapperWhite}>
       <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"color='white' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"><circle cx="12" cy="12" r="10" color='white'/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
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