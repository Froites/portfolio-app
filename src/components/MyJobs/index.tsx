import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { projectsService, ProjectData } from '../../services/projectsService';

const MyJobs: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null); // Estado para o projeto selecionado/modal
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsService.getAllProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedTechnology) {
      const filtered = projects.filter(project => 
        project.technologies.includes(selectedTechnology)
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [selectedTechnology, projects]);

  // Extrair tecnologias únicas para o filtro
  const technologies = [...new Set(projects.flatMap(project => project.technologies))];

  // Função para abrir o modal com detalhes do projeto
  const openProjectDetails = (project: ProjectData) => {
    setSelectedProject(project);
  };

  // Função para fechar o modal
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando projetos...</div>;
  }

  return (
    <section className={styles.myJobsSection}>
      <div className={styles.sectionHeader}>
        <h3>Meu trabalho</h3>
        <h1>Veja os projetos em destaque</h1>
      </div>

      <div className={styles.techFilter}>
        <button 
          className={selectedTechnology === null ? styles.activeFilter : ''}
          onClick={() => setSelectedTechnology(null)}
        >
          Todos
        </button>
        
        {technologies.map(tech => (
          <button 
            key={tech}
            className={selectedTechnology === tech ? styles.activeFilter : ''}
            onClick={() => setSelectedTechnology(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <div 
            key={project._id} 
            className={styles.projectCard}
            style={{ backgroundColor: project.bgColor }}
            onClick={() => openProjectDetails(project)} // Adiciona o evento de clique para abrir o modal
          >
            <div className={styles.projectImage}>
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>Imagem do projeto</span>
                </div>
              )}
            </div>
            <div className={styles.projectInfo}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              
              <div className={styles.techTags}>
                {project.technologies.map(tech => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalhes do projeto */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeProjectDetails}>
          <div 
            className={styles.modalContent} 
            style={{ borderColor: selectedProject.bgColor }}
            onClick={e => e.stopPropagation()} // Evita que o clique se propague para o overlay
          >
            <button className={styles.closeButton} onClick={closeProjectDetails}>✕</button>
            
            <div className={styles.modalImage}>
              {selectedProject.imageUrl ? (
                <img src={selectedProject.imageUrl} alt={selectedProject.title} />
              ) : (
                <div 
                  className={styles.modalImagePlaceholder}
                  style={{ backgroundColor: selectedProject.bgColor }}
                >
                  <span>{selectedProject.title}</span>
                </div>
              )}
            </div>
            
            <div className={styles.modalInfo}>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              
              <div className={styles.modalTechList}>
                <h3>Tecnologias utilizadas:</h3>
                <div className={styles.techTags}>
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              
              {selectedProject.url && (
                <a 
                  href={selectedProject.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.viewProjectButton}
                  style={{ backgroundColor: selectedProject.bgColor }}
                >
                  Ver projeto
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyJobs;