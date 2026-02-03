import { useState } from 'react';
import { BookOpen, Search, ChevronRight } from 'lucide-react';
import styles from './EducationHub.module.css';

// Educational content stored as data (can be moved to JSON files)
const educationContent = {
  categories: [
    {
      id: 'sti-basics',
      title: 'STI Basics',
      description: 'Understanding sexually transmitted infections',
      icon: '🦠',
      articles: [
        {
          id: 'what-are-stis',
          title: 'What Are STIs?',
          summary: 'Learn about sexually transmitted infections, how they spread, and prevention methods.',
          content: `
            <h2>Understanding Sexually Transmitted Infections</h2>
            <p>Sexually transmitted infections (STIs) are infections passed from one person to another through sexual contact. They can be caused by bacteria, viruses, or parasites.</p>
            
            <h3>Common STIs Include:</h3>
            <ul>
              <li><strong>Chlamydia:</strong> A bacterial infection that can affect the reproductive organs</li>
              <li><strong>Gonorrhea:</strong> A bacterial infection affecting the genital tract</li>
              <li><strong>Herpes:</strong> A viral infection causing sores and blisters</li>
              <li><strong>HIV/AIDS:</strong> A virus that attacks the immune system</li>
              <li><strong>HPV:</strong> A virus that can cause genital warts and certain cancers</li>
              <li><strong>Syphilis:</strong> A bacterial infection that progresses in stages</li>
            </ul>
            
            <h3>How STIs Spread</h3>
            <p>STIs can spread through:</p>
            <ul>
              <li>Vaginal, anal, or oral sex</li>
              <li>Skin-to-skin contact in genital areas</li>
              <li>Sharing needles or syringes</li>
              <li>From mother to baby during pregnancy or childbirth</li>
            </ul>
            
            <h3>Prevention</h3>
            <p>Protect yourself by:</p>
            <ul>
              <li>Using condoms consistently and correctly</li>
              <li>Getting tested regularly</li>
              <li>Limiting number of sexual partners</li>
              <li>Getting vaccinated (HPV, Hepatitis B)</li>
              <li>Having open conversations with partners</li>
            </ul>
          `
        },
        {
          id: 'testing-importance',
          title: 'Why Testing Matters',
          summary: 'The importance of regular STI testing and what to expect.',
          content: `
            <h2>The Importance of STI Testing</h2>
            <p>Regular STI testing is crucial for maintaining sexual health, even if you have no symptoms.</p>
            
            <h3>Why Get Tested?</h3>
            <ul>
              <li>Many STIs show no symptoms initially</li>
              <li>Early detection allows for effective treatment</li>
              <li>Prevents transmission to partners</li>
              <li>Protects your reproductive health</li>
              <li>Gives you peace of mind</li>
            </ul>
            
            <h3>Who Should Get Tested?</h3>
            <ul>
              <li>Anyone who is sexually active</li>
              <li>People with new or multiple partners</li>
              <li>Those experiencing symptoms</li>
              <li>Anyone whose partner has an STI</li>
              <li>Before starting a new relationship</li>
            </ul>
            
            <h3>What to Expect</h3>
            <p>STI testing typically involves:</p>
            <ul>
              <li>Blood tests for HIV, syphilis, and herpes</li>
              <li>Urine samples for chlamydia and gonorrhea</li>
              <li>Swabs from affected areas</li>
              <li>Physical examination if needed</li>
            </ul>
            
            <p>Most tests are quick, painless, and confidential. Results usually take a few days to a week.</p>
          `
        }
      ]
    },
    {
      id: 'sexual-health',
      title: 'Sexual Health',
      description: 'Comprehensive sexual wellness information',
      icon: '❤️',
      articles: [
        {
          id: 'healthy-relationships',
          title: 'Healthy Sexual Relationships',
          summary: 'Building healthy, communicative sexual relationships.',
          content: `
            <h2>Healthy Sexual Relationships</h2>
            <p>A healthy sexual relationship is built on trust, respect, communication, and mutual consent.</p>
            
            <h3>Key Components</h3>
            <ul>
              <li><strong>Communication:</strong> Open discussions about boundaries, desires, and concerns</li>
              <li><strong>Consent:</strong> Ongoing, enthusiastic agreement from all parties</li>
              <li><strong>Trust:</strong> Feeling safe and respected with your partner</li>
              <li><strong>Respect:</strong> Honoring boundaries and preferences</li>
              <li><strong>Safety:</strong> Protecting physical and emotional wellbeing</li>
            </ul>
            
            <h3>Talking About Sex</h3>
            <p>Effective communication includes:</p>
            <ul>
              <li>Discussing STI testing and status</li>
              <li>Sharing sexual history when appropriate</li>
              <li>Expressing desires and boundaries clearly</li>
              <li>Asking for consent before and during activities</li>
              <li>Checking in with your partner regularly</li>
            </ul>
            
            <h3>Red Flags</h3>
            <p>Unhealthy patterns to watch for:</p>
            <ul>
              <li>Pressure to engage in unwanted activities</li>
              <li>Ignoring boundaries or consent</li>
              <li>Making you feel guilty about decisions</li>
              <li>Refusing to discuss sexual health or protection</li>
              <li>Any form of coercion or manipulation</li>
            </ul>
          `
        },
        {
          id: 'contraception-guide',
          title: 'Contraception Guide',
          summary: 'Overview of contraceptive methods and how to choose.',
          content: `
            <h2>Contraception Options</h2>
            <p>There are many effective methods of contraception. The best choice depends on your health, lifestyle, and preferences.</p>
            
            <h3>Barrier Methods</h3>
            <ul>
              <li><strong>Condoms:</strong> 85-98% effective, also prevent STIs</li>
              <li><strong>Diaphragm:</strong> 88-94% effective with spermicide</li>
              <li><strong>Cervical Cap:</strong> 71-86% effective</li>
            </ul>
            
            <h3>Hormonal Methods</h3>
            <ul>
              <li><strong>Birth Control Pills:</strong> 91-99% effective with perfect use</li>
              <li><strong>Patch:</strong> 91-99% effective</li>
              <li><strong>Vaginal Ring:</strong> 91-99% effective</li>
              <li><strong>Injectable (Depo-Provera):</strong> 94-99% effective</li>
              <li><strong>Implant:</strong> Over 99% effective</li>
            </ul>
            
            <h3>Long-Acting Methods</h3>
            <ul>
              <li><strong>IUD (Copper):</strong> Over 99% effective, lasts 10+ years</li>
              <li><strong>IUD (Hormonal):</strong> Over 99% effective, lasts 3-7 years</li>
            </ul>
            
            <h3>Emergency Contraception</h3>
            <p>Available if regular contraception fails:</p>
            <ul>
              <li>Emergency contraceptive pills (Plan B, ella)</li>
              <li>Copper IUD insertion within 5 days</li>
            </ul>
            
            <p><strong>Important:</strong> Only condoms protect against STIs. Consider using condoms along with other methods for dual protection.</p>
          `
        }
      ]
    },
    {
      id: 'reproductive-health',
      title: 'Reproductive Health',
      description: 'Information about reproductive system health',
      icon: '🌸',
      articles: [
        {
          id: 'menstrual-health',
          title: 'Understanding Menstruation',
          summary: 'Everything about menstrual cycles and period health.',
          content: `
            <h2>Understanding Menstrual Health</h2>
            <p>The menstrual cycle is a natural process that prepares the body for potential pregnancy each month.</p>
            
            <h3>Normal Cycle</h3>
            <ul>
              <li>Average cycle: 28 days (range: 21-35 days is normal)</li>
              <li>Period length: 3-7 days typically</li>
              <li>Flow varies from light to heavy</li>
              <li>Mild cramping is common</li>
            </ul>
            
            <h3>When to See a Doctor</h3>
            <p>Consult a healthcare provider if you experience:</p>
            <ul>
              <li>Periods lasting longer than 7 days</li>
              <li>Very heavy bleeding (soaking through a pad/tampon every hour)</li>
              <li>Severe pain that interferes with daily activities</li>
              <li>Bleeding between periods</li>
              <li>Missing periods (and not pregnant)</li>
              <li>Sudden changes in cycle pattern</li>
            </ul>
            
            <h3>Period Products</h3>
            <p>Options include:</p>
            <ul>
              <li>Pads and panty liners</li>
              <li>Tampons</li>
              <li>Menstrual cups</li>
              <li>Period underwear</li>
            </ul>
            
            <h3>Managing Symptoms</h3>
            <ul>
              <li>Use heat for cramps</li>
              <li>Stay hydrated</li>
              <li>Exercise can help reduce cramps</li>
              <li>Over-the-counter pain relievers if needed</li>
              <li>Track your cycle to understand patterns</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'mental-health',
      title: 'Mental Health & Sexuality',
      description: 'The connection between mental and sexual health',
      icon: '🧠',
      articles: [
        {
          id: 'body-image',
          title: 'Body Image and Self-Esteem',
          summary: 'Building confidence and a healthy relationship with your body.',
          content: `
            <h2>Body Image and Sexual Health</h2>
            <p>A positive body image is important for overall wellbeing and healthy sexual relationships.</p>
            
            <h3>What is Body Image?</h3>
            <p>Body image is how you think and feel about your physical appearance. It includes:</p>
            <ul>
              <li>How you see yourself</li>
              <li>How you think others perceive you</li>
              <li>How you feel in your body</li>
              <li>How you behave as a result of these perceptions</li>
            </ul>
            
            <h3>Impact on Sexual Health</h3>
            <p>Body image can affect:</p>
            <ul>
              <li>Comfort with intimacy</li>
              <li>Sexual confidence</li>
              <li>Communication with partners</li>
              <li>Overall satisfaction in relationships</li>
            </ul>
            
            <h3>Building Positive Body Image</h3>
            <ul>
              <li>Focus on what your body can do, not just how it looks</li>
              <li>Challenge negative self-talk</li>
              <li>Limit exposure to unrealistic media images</li>
              <li>Surround yourself with positive influences</li>
              <li>Practice self-compassion</li>
              <li>Seek professional support if needed</li>
            </ul>
            
            <h3>Remember</h3>
            <p>Bodies come in all shapes, sizes, and forms. There is no "perfect" body. What matters most is health, happiness, and feeling comfortable in your own skin.</p>
          `
        }
      ]
    }
  ]
};

const EducationHub = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedArticle(null);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBack = () => {
    if (selectedArticle) {
      setSelectedArticle(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  const filterContent = () => {
    if (!searchTerm) return educationContent.categories;
    
    return educationContent.categories.map(category => ({
      ...category,
      articles: category.articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.articles.length > 0);
  };

  const filteredCategories = filterContent();

  return (
    <div className={styles.container}>
      <div className={styles.hub}>
        <div className={styles.header}>
          <h1 className={styles.title}>Education Hub</h1>
          <p className={styles.subtitle}>
            Evidence-based information about sexual health and wellness
          </p>
          
          <div className={styles.searchBox}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {selectedArticle ? (
          <div className={styles.article}>
            <button onClick={handleBack} className={styles.backButton}>
              ← Back to {selectedCategory.title}
            </button>
            <div className={styles.articleHeader}>
              <h1 className={styles.articleTitle}>{selectedArticle.title}</h1>
              <p className={styles.articleSummary}>{selectedArticle.summary}</p>
            </div>
            <div 
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          </div>
        ) : selectedCategory ? (
          <div className={styles.categoryView}>
            <button onClick={handleBack} className={styles.backButton}>
              ← Back to Categories
            </button>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIcon}>{selectedCategory.icon}</span>
              <h2 className={styles.categoryTitle}>{selectedCategory.title}</h2>
              <p className={styles.categoryDescription}>{selectedCategory.description}</p>
            </div>
            <div className={styles.articlesList}>
              {selectedCategory.articles.map(article => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className={styles.articleCard}
                >
                  <h3 className={styles.articleCardTitle}>{article.title}</h3>
                  <p className={styles.articleCardSummary}>{article.summary}</p>
                  <span className={styles.readMore}>
                    Read more <ChevronRight size={16} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.categories}>
            {filteredCategories.map(category => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={styles.categoryCard}
              >
                <span className={styles.categoryCardIcon}>{category.icon}</span>
                <h3 className={styles.categoryCardTitle}>{category.title}</h3>
                <p className={styles.categoryCardDescription}>{category.description}</p>
                <div className={styles.articleCount}>
                  {category.articles.length} article{category.articles.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationHub;
