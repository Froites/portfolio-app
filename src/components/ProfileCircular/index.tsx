// src/components/ProfileCircular/index.tsx
import { useState, useEffect } from 'react';
import { FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaLaravel, FaLinkedin } from 'react-icons/fa';
import styles from './styles.module.css';
import { profileService, ProfileData } from '../../services/profileService';
import { skillsService, SkillData } from '../../services/skillsService';

// Mapeamento de nomes de ícones para componentes de ícones
const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaLaravel,
  FaLinkedin
  // Adicione mais ícones conforme necessário
};

const ProfileCircular: React.FC = () => {
  const [animateSkills, setAnimateSkills] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Buscar dados do perfil e habilidades da API
        const profileData = await profileService.getProfile();
        const skillsData = await skillsService.getAllSkills();
        
        setProfile(profileData);
        setSkills(skillsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Falha ao carregar os dados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
        
        // Iniciar animação após os dados serem carregados
        setTimeout(() => {
          setAnimateSkills(true);
        }, 300);
      }
    };

    fetchData();
  }, []);

  // Função para renderizar o ícone baseado no nome
  const renderIcon = (iconName: string, color: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent color={color} /> : null;
  };

  // Renderizar o estado de carregamento
  if (loading) {
    return (
      <aside className={styles.profileContainer}>
        <div className={styles.loading}>Carregando perfil...</div>
      </aside>
    );
  }

  // Renderizar o erro, se houver
  if (error || !profile) {
    return (
      <aside className={styles.profileContainer}>
        <div className={styles.error}>
          {error || 'Não foi possível carregar o perfil.'}
        </div>
      </aside>
    );
  }

  const { github, linkedin } = profile.socialLinks || {};

  return (
    <aside className={styles.profileContainer}>
      <div className={styles.coverArea}>
        <img 
          className={styles.coverImage} 
          src={profile.coverUrl}
          alt="Cover"
        />
      </div>
      
      <div className={styles.profileInfo}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarWrapper}>
            <img 
              className={styles.avatar} 
              src={profile.avatarUrl}
              alt={profile.name} 
            />
          </div>
        </div>
        
        <h1 className={styles.name}>{profile.name}</h1>
        <h2 className={styles.role}>{profile.role}</h2>
        
        <div className={styles.socialLinks}>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaGithub />
            </a>
          )}
          
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaLinkedin />
            </a>
          )}
        </div>
      </div>
      
      <div className={styles.skillsContainer}>
        <h3 className={styles.skillsTitle}>Minhas Habilidades</h3>
        
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div key={skill._id} className={styles.skillItem}>
              <div 
                className={styles.skillCircle}
                style={{ 
                  '--skill-level': animateSkills ? `${skill.level}%` : '0%',
                  '--skill-color': skill.color 
                } as React.CSSProperties}
              >
                <div className={styles.skillIconContainer}>
                  <div className={styles.skillIcon} style={{ color: skill.color }}>
                    {renderIcon(skill.icon, skill.color)}
                  </div>
                </div>
                <svg viewBox="0 0 36 36" className={styles.skillCircleProgress}>
                  <path
                    className={styles.skillCircleBackground}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={styles.skillCircleFill}
                    strokeDasharray={`${skill.level}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className={styles.skillPercentage}>{skill.level}%</div>
              </div>
              <div className={styles.skillName}>{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProfileCircular;