import { useState } from 'react';
import { Search, Filter, Clock } from 'lucide-react';
import styles from './Articlestab.module.css';

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

const ArticlesTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'prevention', label: 'Prevention' },
    { id: 'testing', label: 'Testing' },
    { id: 'treatment', label: 'Treatment' },
    { id: 'myths', label: 'Myth Busting' }
  ];

  const mythBusters = [
    {
      id: 1,
      tag: 'MYTH BUSTER',
      title: 'Myth: You Would Know If You Had an STI',
      description: 'Many STIs have no symptoms at all. That\'s why regular testing matters.',
      readTime: '4 min',
      views: 4
    },
    {
      id: 2,
      tag: 'MYTH BUSTER',
      title: 'Myth: STIs Only Affect "Certain Types" of People',
      description: 'STIs don\'t discriminate. Anyone who is sexually active can get an STI.',
      readTime: '5 min',
      views: 2
    }
  ];

  const articles = [
    {
      id: 1,
      category: 'prevention',
      tag: 'PREVENTION',
      tagColor: 'mint',
      title: 'Understanding PrEP and PEP for HIV Prevention',
      description: 'Learn about the medications that can prevent HIV infection before and after potential exposure.',
      readTime: '8 min',
      views: 2
    },
    {
      id: 2,
      category: 'myths',
      tag: 'MYTHS',
      tagColor: 'mint',
      title: 'Myth: You Would Know If You Had an STI',
      description: 'Many STIs have no symptoms at all. That\'s why regular testing matters.',
      readTime: '4 min',
      views: 4
    },
    {
      id: 3,
      category: 'prevention',
      tag: 'PREVENTION',
      tagColor: 'mint',
      title: 'How to Talk to Partners About STI Testing',
      description: 'Having "the talk" doesn\'t have to be awkward. Here\'s how to make it easier.',
      readTime: '6 min',
      views: 2
    },
    {
      id: 4,
      category: 'treatment',
      tag: 'TREATMENT',
      tagColor: 'mint',
      title: 'What Happens If You Test Positive',
      description: 'A positive test is not the end of the world. Here\'s what comes next.',
      readTime: '7 min',
      views: 2
    },
    {
      id: 5,
      category: 'testing',
      tag: 'TESTING',
      tagColor: 'mint',
      title: 'Understanding STI Testing: What to Expect',
      description: 'Getting tested is simple, quick, and nothing to worry about. Here\'s what the process looks like.',
      readTime: '5 min',
      views: 1
    },
    {
      id: 6,
      category: 'myths',
      tag: 'MYTHS',
      tagColor: 'mint',
      title: 'Myth: STIs Only Affect "Certain Types" of People',
      description: 'STIs don\'t discriminate. Anyone who is sexually active can get an STI.',
      readTime: '5 min',
      views: 2
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.content}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <Search size={20} color="#999" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Category Filters */}
      <div className={styles.categoryFilters}>
        <div className={styles.filterIcon}><Filter size={20} color="#5a5959" /></div>
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.categoryButtonActive : ''}`}
          >
            {cat.label}
          </div>
        ))}
      </div>

      {/* Myth Busting Section */}
      {selectedCategory === 'all' && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <StarIcon />
            Myth Busting
          </h2>
          <div className={styles.mythGrid}>
            {mythBusters.map(myth => (
              <div key={myth.id} className={styles.mythCard}>
                <div className={styles.mythCardHeader}>
                  <span className={styles.mythTag}>{myth.tag}</span>
                  <div className={styles.readTime}>
                    <Clock size={14} />
                    {myth.readTime}
                  </div>
                </div>
                <h3 className={styles.mythTitle}>{myth.title}</h3>
                <p className={styles.mythDescription}>{myth.description}</p>
                <span className={styles.readMore}>Read More →</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Articles Section */}
      <div>
        <h2 className={styles.sectionTitle}>All Articles</h2>
        <div className={styles.articlesGrid}>
          {filteredArticles.map(article => (
            <div key={article.id} className={styles.articleCard}>
              <div className={styles.articleCardHeader}>
                <span className={styles.articleTag}>{article.tag}</span>
                <div className={styles.readTime}>
                  <Clock size={14} />
                  {article.readTime}
                </div>
              </div>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleDescription}>{article.description}</p>
              <div className={styles.articleFooter}>
                <span className={styles.readArticle}>Read Article</span>
                <div className={styles.views}>{article.views} views</div>
              </div>
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
};

export default ArticlesTab;