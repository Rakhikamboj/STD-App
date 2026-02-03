import styles from './MedicalDiagram.module.css';

const MedicalDiagrams = ({ type = 'herpes' }) => {
  return (
    <div className={styles.diagramContainer}>
      {type === 'herpes' && (
        <svg viewBox="0 0 300 300" className={styles.diagram}>
          <title>Genital Herpes - Fluid-filled blisters</title>
          {/* Background - skin */}
          <rect width="300" height="300" fill="#d4a574" rx="8" />
          
          {/* Healthy skin area */}
          <circle cx="80" cy="80" r="40" fill="#c9956f" opacity="0.8" />
          
          {/* Inflamed area background */}
          <ellipse cx="200" cy="180" rx="80" ry="60" fill="#f4a6a6" opacity="0.6" />
          
          {/* Fluid-filled blisters */}
          <circle cx="160" cy="150" r="18" fill="#e8d5e8" stroke="#d084d0" strokeWidth="2" />
          <circle cx="200" cy="160" r="16" fill="#ead8e8" stroke="#d084d0" strokeWidth="2" />
          <circle cx="220" cy="140" r="14" fill="#e8d5e8" stroke="#d084d0" strokeWidth="2" />
          <circle cx="190" cy="210" r="15" fill="#ead8e8" stroke="#d084d0" strokeWidth="2" />
          
          {/* Fluid shine effect */}
          <circle cx="165" cy="145" r="6" fill="white" opacity="0.7" />
          <circle cx="205" cy="155" r="5" fill="white" opacity="0.7" />
          <circle cx="225" cy="135" r="4" fill="white" opacity="0.7" />
          <circle cx="195" cy="205" r="5" fill="white" opacity="0.7" />
          
          {/* Redness around blisters */}
          <circle cx="160" cy="150" r="25" fill="none" stroke="#e8a8a8" strokeWidth="3" opacity="0.5" />
          <circle cx="200" cy="160" r="23" fill="none" stroke="#e8a8a8" strokeWidth="3" opacity="0.5" />
          
          {/* Label */}
          <text x="150" y="280" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            Fluid-filled blisters
          </text>
          <text x="150" y="295" textAnchor="middle" fontSize="12" fill="#666">
            Often painful, may rupture
          </text>
        </svg>
      )}

      {type === 'warts' && (
        <svg viewBox="0 0 300 300" className={styles.diagram}>
          <title>Genital Warts (HPV) - Cauliflower-like growths</title>
          {/* Background - skin */}
          <rect width="300" height="300" fill="#d4a574" rx="8" />
          
          {/* Healthy skin area */}
          <circle cx="80" cy="80" r="40" fill="#c9956f" opacity="0.8" />
          
          {/* Wart cluster - cauliflower-like */}
          <g transform="translate(200, 160)">
            {/* Main base */}
            <ellipse cx="0" cy="0" rx="35" ry="30" fill="#b8956f" />
            
            {/* Bumpy texture - multiple small bumps */}
            <circle cx="-15" cy="-15" r="8" fill="#c9a880" />
            <circle cx="5" cy="-18" r="9" fill="#c9a880" />
            <circle cx="20" cy="-12" r="7" fill="#c9a880" />
            <circle cx="-20" cy="0" r="8" fill="#c9a880" />
            <circle cx="0" cy="-5" r="9" fill="#c9a880" />
            <circle cx="22" cy="5" r="8" fill="#c9a880" />
            <circle cx="-10" cy="15" r="8" fill="#c9a880" />
            <circle cx="10" cy="18" r="7" fill="#c9a880" />
            <circle cx="-25" cy="10" r="7" fill="#c9a880" />
            
            {/* Surface texture lines */}
            <path d="M -15 -15 Q -10 -10 -5 -8" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 5 -18 Q 8 -12 10 -8" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M -20 0 Q -15 5 -10 10" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 20 5 Q 15 10 10 15" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.5" />
          </g>
          
          {/* Surrounding redness */}
          <circle cx="200" cy="160" r="55" fill="none" stroke="#e8a8a8" strokeWidth="2" opacity="0.5" />
          
          {/* Label */}
          <text x="150" y="280" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            Cauliflower-like growths
          </text>
          <text x="150" y="295" textAnchor="middle" fontSize="12" fill="#666">
            Usually painless, multiple bumps
          </text>
        </svg>
      )}

      {type === 'yeast' && (
        <svg viewBox="0 0 300 300" className={styles.diagram}>
          <title>Yeast Infection - Discharge and irritation</title>
          {/* Background - skin */}
          <rect width="300" height="300" fill="#d4a574" rx="8" />
          
          {/* Healthy skin area */}
          <circle cx="80" cy="80" r="40" fill="#c9956f" opacity="0.8" />
          
          {/* Inflamed area */}
          <ellipse cx="200" cy="180" rx="75" ry="55" fill="#f0c8c8" opacity="0.7" />
          
          {/* Thick discharge representation */}
          <ellipse cx="200" cy="175" rx="50" ry="35" fill="#f5e6d3" stroke="#e8c9a8" strokeWidth="2" />
          
          {/* Texture for thick discharge - cottage cheese-like */}
          <circle cx="180" cy="160" r="6" fill="#f8ead8" stroke="#e8c9a8" strokeWidth="1" />
          <circle cx="200" cy="155" r="7" fill="#f8ead8" stroke="#e8c9a8" strokeWidth="1" />
          <circle cx="220" cy="165" r="5" fill="#f8ead8" stroke="#e8c9a8" strokeWidth="1" />
          <circle cx="190" cy="190" r="6" fill="#f8ead8" stroke="#e8c9a8" strokeWidth="1" />
          <circle cx="210" cy="195" r="5" fill="#f8ead8" stroke="#e8c9a8" strokeWidth="1" />
          <circle cx="170" cy="180" r="5" fill="#f8ead8" stroke="#e8c9a8" strokeWidth="1" />
          <circle cx="225" cy="185" r="4" fill="#f8ead8" stroke="#e8c9a8" strokeWidth="1" />
          
          {/* Red irritation patches */}
          <circle cx="160" cy="160" r="15" fill="none" stroke="#e8a8a8" strokeWidth="2" opacity="0.6" />
          <circle cx="240" cy="200" r="12" fill="none" stroke="#e8a8a8" strokeWidth="2" opacity="0.6" />
          
          {/* Itch indicator - small lines */}
          <line x1="230" y1="140" x2="240" y2="130" stroke="#d0756f" strokeWidth="2" opacity="0.7" />
          <line x1="235" y1="135" x2="248" y2="125" stroke="#d0756f" strokeWidth="2" opacity="0.7" />
          
          {/* Label */}
          <text x="150" y="280" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            Thick discharge with irritation
          </text>
          <text x="150" y="295" textAnchor="middle" fontSize="12" fill="#666">
            Often accompanied by itching
          </text>
        </svg>
      )}

      {type === 'scabies' && (
        <svg viewBox="0 0 300 300" className={styles.diagram}>
          <title>Scabies - Burrow tracks and intense itching</title>
          {/* Background - skin */}
          <rect width="300" height="300" fill="#d4a574" rx="8" />
          
          {/* Healthy skin area */}
          <circle cx="80" cy="80" r="40" fill="#c9956f" opacity="0.8" />
          
          {/* Affected area with burrows */}
          <ellipse cx="200" cy="180" rx="80" ry="60" fill="#f4a6a6" opacity="0.5" />
          
          {/* Burrow tracks - wavy lines */}
          <path d="M 140 140 Q 160 130 180 140 Q 200 150 220 140" stroke="#b87070" strokeWidth="3" fill="none" />
          <path d="M 145 160 Q 170 150 200 165 Q 220 175 240 160" stroke="#b87070" strokeWidth="3" fill="none" />
          <path d="M 150 190 Q 180 185 210 200 Q 230 210 240 200" stroke="#b87070" strokeWidth="3" fill="none" />
          
          {/* Small red bumps along burrows */}
          <circle cx="155" cy="135" r="4" fill="#e8a8a8" />
          <circle cx="175" cy="140" r="3" fill="#e8a8a8" />
          <circle cx="195" cy="148" r="4" fill="#e8a8a8" />
          <circle cx="215" cy="142" r="3" fill="#e8a8a8" />
          <circle cx="230" cy="148" r="4" fill="#e8a8a8" />
          
          <circle cx="160" cy="158" r="4" fill="#e8a8a8" />
          <circle cx="185" cy="155" r="3" fill="#e8a8a8" />
          <circle cx="210" cy="168" r="4" fill="#e8a8a8" />
          <circle cx="230" cy="165" r="3" fill="#e8a8a8" />
          
          <circle cx="165" cy="190" r="4" fill="#e8a8a8" />
          <circle cx="195" cy="195" r="3" fill="#e8a8a8" />
          <circle cx="220" cy="205" r="4" fill="#e8a8a8" />
          <circle cx="240" cy="202" r="3" fill="#e8a8a8" />
          
          {/* Itch indicators - small spark-like lines */}
          <line x1="250" y1="130" x2="265" y2="115" stroke="#d0756f" strokeWidth="2" opacity="0.8" />
          <line x1="255" y1="140" x2="270" y2="140" stroke="#d0756f" strokeWidth="2" opacity="0.8" />
          <line x1="250" y1="150" x2="265" y2="160" stroke="#d0756f" strokeWidth="2" opacity="0.8" />
          
          {/* Label */}
          <text x="150" y="280" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            Burrow tracks with intense itching
          </text>
          <text x="150" y="295" textAnchor="middle" fontSize="12" fill="#666">
            Wavy lines, worse at night
          </text>
        </svg>
      )}

      {type === 'ulcer' && (
        <svg viewBox="0 0 300 300" className={styles.diagram}>
          <title>Ulcerative Lesion - Painful open sore</title>
          {/* Background - skin */}
          <rect width="300" height="300" fill="#d4a574" rx="8" />
          
          {/* Healthy skin area */}
          <circle cx="80" cy="80" r="40" fill="#c9956f" opacity="0.8" />
          
          {/* Inflammatory halo */}
          <circle cx="200" cy="180" r="60" fill="#f4a6a6" opacity="0.4" />
          <circle cx="200" cy="180" r="50" fill="#f4a6a6" opacity="0.6" />
          
          {/* Ulcer base - gray/yellowish */}
          <ellipse cx="200" cy="180" rx="35" ry="30" fill="#d4c5b0" stroke="#b8956f" strokeWidth="2" />
          
          {/* Irregular edges */}
          <path d="M 165 170 Q 160 175 165 180 Q 160 185 170 190 Q 175 185 175 175 Z" 
                fill="#d4c5b0" stroke="#8b7355" strokeWidth="1" />
          <path d="M 235 165 Q 240 170 235 180 Q 245 185 240 195 Q 230 190 230 175 Z" 
                fill="#d4c5b0" stroke="#8b7355" strokeWidth="1" />
          
          {/* Deep depression effect */}
          <ellipse cx="200" cy="180" rx="30" ry="25" fill="#d4c5b0" opacity="0.7" />
          
          {/* Pus/exudate representation */}
          <ellipse cx="200" cy="180" rx="22" ry="18" fill="#e8d4b8" opacity="0.6" />
          
          {/* Swollen lymph nodes indicator */}
          <circle cx="200" cy="80" r="12" fill="none" stroke="#e8a8a8" strokeWidth="2" opacity="0.8" />
          <circle cx="200" cy="80" r="8" fill="#f4d4d4" opacity="0.6" />
          <text x="240" y="85" fontSize="11" fill="#c97070">Swollen glands</text>
          
          {/* Pain indicator lines */}
          <line x1="150" y1="150" x2="140" y2="130" stroke="#d0756f" strokeWidth="2" opacity="0.8" />
          <line x1="250" y1="150" x2="260" y2="135" stroke="#d0756f" strokeWidth="2" opacity="0.8" />
          <line x1="200" y1="220" x2="200" y2="240" stroke="#d0756f" strokeWidth="2" opacity="0.8" />
          
          {/* Label */}
          <text x="150" y="280" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            Painful deep ulcer
          </text>
          <text x="150" y="295" textAnchor="middle" fontSize="12" fill="#666">
            Open sore with swollen nodes
          </text>
        </svg>
      )}
    </div>
  );
};

export default MedicalDiagrams;
