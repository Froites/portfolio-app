import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { FaGithub, FaHtml5, FaCss3Alt, FaJs, FaAngular, FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import Avatar from '../Avatar';
import { profileService, ProfileData } from '../../services/profileService';
import { skillsService, SkillData } from '../../services/skillsService';

// Mapeamento de nomes de ícones para componentes de ícones
const iconMap = {
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaAngular,
  FaReact,
  FaNodeJs,
  FaPython,
  FaLaravel,
};

const Sidebar: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [skills, setSkills] = useState<SkillData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await profileService.getProfile();
                const skillsData = await skillsService.getAllSkills();
                
                setProfile(profileData);
                setSkills(skillsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Carregando...</div>;
    }

    if (!profile) {
        return <div className={styles.error}>Erro ao carregar o perfil</div>;
    }

    // Função para renderizar o ícone baseado no nome
    const renderIcon = (iconName: string, color: string) => {
        const IconComponent = iconMap[iconName as keyof typeof iconMap];
        return IconComponent ? <IconComponent color={color} size={20} /> : null;
    };

    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover} 
                src={profile.coverUrl || "https://images.unsplash.com/photo-1678303801276-66e244cdd70e"} 
                alt="Capa do perfil"
            />

            <div className={styles.profile}>
                <Avatar src={profile.avatarUrl} />
                <strong>{profile.name}</strong>
                <span>{profile.role}</span>
            </div>

            <footer>
                {skills.map((skill, index) => (
                    <div key={index} className={styles.skillItem}>
                        <div className={styles.skillHeader}>
                            {renderIcon(skill.icon, skill.color)}
                            <span>{skill.name}</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </footer>
        </aside>
    );
}

export default Sidebar;