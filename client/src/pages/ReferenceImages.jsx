import React, { useState } from 'react';
import MedicalDiagrams from './MedicalDiagrams';
import styles from './ReferencesImages.module.css';

const ReferenceImages = ({ type = 'skin', onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const skinImages = [
    { id: 'clear', label: 'Clear Skin (Baseline)', type: 'clear' },
    { id: 'herpes', label: 'Fluid-Filled Blisters (Herpes)', type: 'herpes' },
    { id: 'warts', label: 'Cauliflower-Like Bumps (Warts/HPV)', type: 'warts' },
    { id: 'yeast', label: 'Thick Discharge & Irritation (Yeast)', type: 'yeast' },
    { id: 'scabies', label: 'Burrow Tracks (Scabies)', type: 'scabies' },
    { id: 'ulcer', label: 'Painful Deep Ulcers', type: 'ulcer' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.imageGallery}>
        <h2 className={styles.title}>Medical Reference Images</h2>
        <p className={styles.subtitle}>
          For educational purposes only. These images help you understand different conditions.
        </p>

        <div className={styles.disclaimer}>
          <strong>Important:</strong> These images are educational guides only. 
          Only a qualified healthcare provider can make a proper diagnosis.
        </div>

        {selectedImage ? (
          <div className={styles.detailView}>
            <button 
              onClick={() => setSelectedImage(null)}
              className={styles.backToGallery}
            >
              ← Back to Gallery
            </button>
            
            <MedicalDiagrams type={selectedImage} />
            
            <div className={styles.description}>
              {selectedImage === 'herpes' && (
                <>
                  <h3>Genital Herpes (HSV)</h3>
                  <p>Characterized by clusters of painful, fluid-filled blisters on reddened skin.</p>
                  <ul>
                    <li>Typically appears 2-7 days after exposure</li>
                    <li>Blisters are painful and may rupture</li>
                    <li>Highly treatable with antiviral medications</li>
                    <li>Can be managed effectively long-term</li>
                  </ul>
                </>
              )}
              
              {selectedImage === 'warts' && (
                <>
                  <h3>Genital Warts (HPV)</h3>
                  <p>Caused by human papillomavirus, appearing as cauliflower-like growths.</p>
                  <ul>
                    <li>Can appear weeks to months after exposure</li>
                    <li>Usually painless but may cause itching</li>
                    <li>Multiple effective treatment options available</li>
                    <li>Vaccines can prevent certain types of HPV</li>
                  </ul>
                </>
              )}
              
              {selectedImage === 'yeast' && (
                <>
                  <h3>Yeast Infection</h3>
                  <p>Fungal infection causing discharge, redness, and intense itching.</p>
                  <ul>
                    <li>Discharge often thick and cottage cheese-like</li>
                    <li>Red, inflamed, irritated tissue</li>
                    <li>One of the most common vaginal infections</li>
                    <li>Easily treated with antifungal medications</li>
                  </ul>
                </>
              )}
              
              {selectedImage === 'scabies' && (
                <>
                  <h3>Scabies</h3>
                  <p>Parasitic infection causing severe itching and characteristic burrow tracks.</p>
                  <ul>
                    <li>Intense itching, especially at night</li>
                    <li>Thin wavy lines (burrows) on skin</li>
                    <li>Contagious through close contact</li>
                    <li>Treatable with topical medications</li>
                  </ul>
                </>
              )}
              
              {selectedImage === 'ulcer' && (
                <>
                  <h3>Ulcerative Lesions</h3>
                  <p>Painful open sores that require medical evaluation.</p>
                  <ul>
                    <li>Deep, painful open wounds</li>
                    <li>Irregular edges and may produce discharge</li>
                    <li>Often accompanied by swollen lymph nodes</li>
                    <li>Requires professional treatment</li>
                  </ul>
                </>
              )}
            </div>

            <div className={styles.nextSteps}>
              <h3>Next Steps</h3>
              <p>If your symptoms match any of these conditions, consider:</p>
              <ul>
                <li>Scheduling an appointment with a healthcare provider</li>
                <li>Getting tested for STIs if appropriate</li>
                <li>Avoiding sexual contact until evaluated</li>
                <li>Keeping a symptom journal to share with your doctor</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.gallery}>
            {skinImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image.type)}
                className={styles.galleryItem}
              >
                <div className={styles.itemPreview}>
                  <svg viewBox="0 0 150 150" className={styles.preview}>
                    {image.type === 'clear' && (
                      <rect width="150" height="150" fill="#d4a574" rx="4" />
                    )}
                    {image.type === 'herpes' && (
                      <>
                        <rect width="150" height="150" fill="#d4a574" rx="4" />
                        <circle cx="75" cy="75" r="35" fill="#f4a6a6" opacity="0.6" />
                        <circle cx="60" cy="65" r="10" fill="#e8d5e8" stroke="#d084d0" strokeWidth="1" />
                        <circle cx="80" cy="70" r="9" fill="#ead8e8" stroke="#d084d0" strokeWidth="1" />
                        <circle cx="90" cy="80" r="8" fill="#e8d5e8" stroke="#d084d0" strokeWidth="1" />
                        <circle cx="65" cy="90" r="9" fill="#ead8e8" stroke="#d084d0" strokeWidth="1" />
                      </>
                    )}
                    {image.type === 'warts' && (
                      <>
                        <rect width="150" height="150" fill="#d4a574" rx="4" />
                        <ellipse cx="75" cy="75" rx="30" ry="28" fill="#b8956f" />
                        <circle cx="60" cy="60" r="6" fill="#c9a880" />
                        <circle cx="75" cy="55" r="7" fill="#c9a880" />
                        <circle cx="90" cy="65" r="6" fill="#c9a880" />
                        <circle cx="65" cy="85" r="6" fill="#c9a880" />
                        <circle cx="85" cy="90" r="6" fill="#c9a880" />
                      </>
                    )}
                    {image.type === 'yeast' && (
                      <>
                        <rect width="150" height="150" fill="#d4a574" rx="4" />
                        <ellipse cx="75" cy="75" rx="35" ry="30" fill="#f0c8c8" opacity="0.7" />
                        <ellipse cx="75" cy="75" rx="25" ry="20" fill="#f5e6d3" stroke="#e8c9a8" strokeWidth="1" />
                      </>
                    )}
                    {image.type === 'scabies' && (
                      <>
                        <rect width="150" height="150" fill="#d4a574" rx="4" />
                        <ellipse cx="75" cy="75" rx="35" ry="28" fill="#f4a6a6" opacity="0.5" />
                        <path d="M 45 60 Q 60 50 75 60" stroke="#b87070" strokeWidth="2" fill="none" />
                        <path d="M 50 80 Q 70 70 90 80" stroke="#b87070" strokeWidth="2" fill="none" />
                        <circle cx="55" cy="58" r="2" fill="#e8a8a8" />
                        <circle cx="75" cy="62" r="2" fill="#e8a8a8" />
                        <circle cx="90" cy="78" r="2" fill="#e8a8a8" />
                      </>
                    )}
                    {image.type === 'ulcer' && (
                      <>
                        <rect width="150" height="150" fill="#d4a574" rx="4" />
                        <circle cx="75" cy="75" r="30" fill="#f4a6a6" opacity="0.4" />
                        <ellipse cx="75" cy="75" rx="20" ry="18" fill="#d4c5b0" stroke="#b8956f" strokeWidth="1" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className={styles.itemLabel}>{image.label}</h3>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferenceImages;
