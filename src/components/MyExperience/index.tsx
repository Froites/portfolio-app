import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { experienceService, ExperienceData } from '../../services/experienceService';
import { FaBriefcase, FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MyExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getAllExperience();
        // Garantindo que os itens estejam ordenados do mais recente para o mais antigo
        const sortedData = data.sort((a, b) => {
          // Se endDate for "Atual", considerar como mais recente
          if (a.endDate === 'Atual') return -1;
          if (b.endDate === 'Atual') return 1;
          
          // Caso contrário, comparar as datas de início
          return b.startDate.localeCompare(a.startDate);
        });
        
        setExperiences(sortedData);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const toggleExperience = (experienceId: string) => {
    if (expandedExperience === experienceId) {
      setExpandedExperience(null);
    } else {
      setExpandedExperience(experienceId);
    }
  };

  // Formatador de data de YYYY-MM para MM/YYYY
  const formatDate = (dateString: string) => {
    if (dateString === 'Atual') return 'Atual';
    
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
  };

  if (loading) {
    return <div className={styles.loading}>Carregando experiências...</div>;
  }

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.sectionHeader}>
        <h3>Minha Jornada</h3>
        <h1>Experiência Profissional</h1>
      </div>

      <div className={styles.timeline}>
        {experiences.map((experience, index) => (
          <div 
            key={experience._id} 
            className={`${styles.timelineItem} ${expandedExperience === experience._id ? styles.expanded : ''}`}
          >
            <div className={styles.timelineDot}>
              <FaBriefcase />
            </div>
            
            <div className={styles.timelineContent}>
              <div 
                className={styles.timelineHeader}
                onClick={() => toggleExperience(experience._id)}
              >
                <div className={styles.timelineHeaderMain}>
                  <h3 className={styles.role}>{experience.role}</h3>
                  <h4 className={styles.company}>{experience.company}</h4>
                </div>
                
                <div className={styles.timelinePeriod}>
                  <FaCalendarAlt className={styles.calendarIcon} />
                  <span>
                    {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Atual'}
                  </span>
                  
                  {expandedExperience === experience._id ? 
                    <FaChevronUp className={styles.expandIcon} /> :
                    <FaChevronDown className={styles.expandIcon} />
                  }
                </div>
              </div>
              
              {expandedExperience === experience._id && (
                <div className={styles.timelineDetails}>
                  <div className={styles.description}>
                    <h4>Responsabilidades</h4>
                    <ul>
                      {experience.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div className={styles.achievements}>
                      <h4>Conquistas</h4>
                      <ul>
                        {experience.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className={styles.technologies}>
                    <h4>Tecnologias Utilizadas</h4>
                    <div className={styles.techTags}>
                      {experience.technologies.map((tech, i) => (
                        <span key={i} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyExperience;