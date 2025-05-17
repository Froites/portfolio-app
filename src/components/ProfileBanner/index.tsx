// src/components/ProfileBanner/index.tsx
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaLaravel, FaAngular } from 'react-icons/fa';
import styles from './styles.module.css';
import { profileService, ProfileData } from '../../services/profileService';
import { skillsService, SkillData } from '../../services/skillsService';

const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaLaravel,
  FaLinkedin,
  FaAngular
};

const ProfileBanner: React.FC = () => {
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
        
        // Ordenar habilidades pelo nível (do maior para o menor)
        const sortedSkills = [...skillsData].sort((a, b) => b.level - a.level);
        
        setProfile(profileData);
        setSkills(sortedSkills);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Falha ao carregar os dados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para renderizar o ícone baseado no nome
  const renderIcon = (iconName: string, color: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} color={color} /> : null;
  };

  // Renderizar estado de carregamento
  if (loading) {
    return (
      <section className={styles.bannerSection}>
        <div className={styles.loading}>Carregando perfil...</div>
      </section>
    );
  }

  // Renderizar erro, se houver
  if (error || !profile) {
    return (
      <section className={styles.bannerSection}>
        <div className={styles.error}>
          {error || 'Não foi possível carregar o perfil.'}
        </div>
      </section>
    );
  }

  // Calcular anos de experiência com base na data mais antiga
  const calculateExperienceYears = () => {
    // Você pode implementar lógica para calcular com base na experiência profissional
    // Por simplicidade, estou retornando um número fixo baseado no seu CV
    return '4+';
  };

  return (
    <section className={styles.bannerSection}>
      <div className={styles.backgroundOverlay}></div>
      
      <div className={styles.bannerContent}>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{profile.name}</h1>
          <h2 className={styles.role}>{profile.role}</h2>
          
          <p className={styles.tagline}>
            {profile.summary.split('.')[0]}. {/* Pega a primeira frase do resumo como tagline */}
          </p>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{calculateExperienceYears()}</span>
              <span className={styles.statLabel}>Anos de Experiência</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>20+</span>
              <span className={styles.statLabel}>Projetos Completos</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{skills.length}+</span>
              <span className={styles.statLabel}>Tecnologias Dominadas</span>
            </div>
          </div>
          
          <div className={styles.contactButtons}>
            <a href={`mailto:${profile.email}`} className={styles.contactButton}>Entre em contato</a>
            <a 
              href="#experience" 
              className={styles.resumeButton}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Experiência
            </a>
          </div>
        </div>
        
        <div className={styles.profileImageContainer}>
          <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className={styles.profileImage} 
          />
        </div>
      </div>
      
      <div className={styles.keySkills}>
        {skills.slice(0, 6).map((skill) => (
          <div key={skill._id} className={styles.skillTag} style={{ color: skill.color }}>
            {renderIcon(skill.icon, skill.color)}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileBanner;