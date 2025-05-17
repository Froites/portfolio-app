import { useState, useEffect } from 'react';
import { FaLaptopCode, FaDatabase, FaInfinity, FaChartLine, FaCloud, FaRobot, FaMobileAlt, FaStripeS } from 'react-icons/fa';
import styles from './styles.module.css';
import { servicesService, ServiceData } from '../../services/servicesService';

// Mapeamento de nomes de ícones para componentes de ícones
const iconMap: Record<string, React.ElementType> = {
  FaLaptopCode,
  FaDatabase,
  FaInfinity,
  FaStripeS,
  FaMobileAlt,
  FaRobot,
  FaCloud,
  FaChartLine,
  // Adicione mais ícones conforme necessário
};

const MyServices: React.FC = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesService.getAllServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Função para renderizar o ícone baseado no nome
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={32} /> : null;
  };

  // Alterna detalhes do serviço
  const toggleServiceDetails = (serviceId: string) => {
    if (selectedService === serviceId) {
      setSelectedService(null);
    } else {
      setSelectedService(serviceId);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando serviços...</div>;
  }

  return (
    <section className={styles.servicesSection}>
      <div className={styles.sectionHeader}>
        <h3>Meus serviços</h3>
        <h1>Como posso ajudar o seu negócio</h1>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <div 
            key={service._id} 
            className={`${styles.serviceCard} ${selectedService === service._id ? styles.selectedCard : ''}`}
            onClick={() => toggleServiceDetails(service._id)}
            // Importante: O elemento ocupará mais linhas quando expandido
            style={{ 
              gridRow: selectedService === service._id ? 'span 2' : 'span 1' 
            }}
          >
            <div 
              className={styles.serviceIcon} 
              style={{ color: service.color, borderColor: service.color }}
            >
              {renderIcon(service.icon)}
            </div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            
            <div className={styles.expandIndicator}>
              {selectedService === service._id ? '−' : '+'}
            </div>
            
            {selectedService === service._id && (
              <div className={styles.serviceDetails}>
                <ul>
                  {service.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
                
                {service.technologies.length > 0 && (
                  <div className={styles.technologiesList}>
                    <h3>Tecnologias:</h3>
                    <div className={styles.techTags}>
                      {service.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className={styles.techTag}
                          style={{ backgroundColor: `${service.color}33` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyServices;