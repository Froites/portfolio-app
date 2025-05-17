// src/components/AIChat/index.tsx
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

interface ProfileData {
  name: string;
  role: string;
  skills: { name: string; level: number }[];
  experience: { 
    company: string; 
    role: string; 
    period: string;
    description: string[];
  }[];
  education: {
    course: string;
    institution: string;
    period: string;
  }[];
}

const profileData: ProfileData = {
  name: "Natan Gonçalves Reis",
  role: "Desenvolvedor Fullstack e Mobile",
  skills: [
    { name: "ReactJS", level: 90 },
    { name: "Angular", level: 85 },
    { name: "NextJS", level: 80 },
    { name: "NodeJS", level: 85 },
    { name: "Python", level: 75 },
    { name: "TypeScript", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "Ionic", level: 75 },
    { name: "React Native", level: 80 },
  ],
  experience: [
    {
      company: "Ambra, São Paulo - SP",
      role: "Engenheiro de Software Fullstack",
      period: "Out/2023 - Atual",
      description: [
        "Desenvolvimento de software de gestão contábil americano com integração ao QuickBooks e Stripe",
        "Implementação de microsserviços com Python, FastAPI e Laravel",
        "Implementação de soluções de IA para automatização de classificações contábeis",
        "Desenvolvimento de interfaces modernas com Angular 16 e Tailwind CSS"
      ]
    },
    {
      company: "Clickbus, São Paulo - SP",
      role: "Engenheiro de Software Fullstack",
      period: "Jun/2022 - Fev/2023",
      description: [
        "Liderou a modernização do site clickbus.com.br, migrando aplicações legadas em PHP 7 para NextJS",
        "Desenvolveu 80% das novas páginas com integrações BFF e APIs REST",
        "Implementou testes unitários e E2E com React Testing Library e Cypress",
        "Automatizou o pipeline de deploy com GitHub Actions CI/CD"
      ]
    },
    {
      company: "MJV, Curitiba - PR",
      role: "Engenheiro de Software",
      period: "Abr/2021 - Jun/2022",
      description: [
        "Desenvolvimento de aplicações bancárias com Ionic 5 e Angular 11",
        "Criação e manutenção de design system para padronização de interface",
        "Desenvolvimento e manutenção de microsserviços em Node.js e .NET"
      ]
    }
  ],
  education: [
    {
      course: "Análise e Desenvolvimento de Sistemas Web",
      institution: "Unopar, Palmas",
      period: "Em andamento"
    }
  ]
};

// Base de conhecimento com perguntas e respostas
const knowledgeBase = [
  {
    keywords: ["nome", "quem é", "quem é você", "chama"],
    response: `Olá! Sou um assistente virtual baseado no perfil de ${profileData.name}, que é ${profileData.role}.`
  },
  {
    keywords: ["experiência", "trabalho", "trabalhou", "empresas"],
    response: `${profileData.name} tem experiência em empresas como ${profileData.experience.map(e => e.company.split(',')[0]).join(', ')}.`
  },
  {
    keywords: ["habilidades", "tecnologias", "tech stack", "ferramentas", "linguagens"],
    response: `As principais habilidades de ${profileData.name} incluem ${profileData.skills.slice(0, 5).map(s => s.name).join(', ')} e outras tecnologias.`
  },
  {
    keywords: ["react", "reactjs"],
    response: `${profileData.name} tem forte experiência com React, tendo trabalhado com ReactJS na Clickbus onde liderou a modernização do site, migrando de PHP para NextJS.`
  },
  {
    keywords: ["angular"],
    response: `${profileData.name} trabalha atualmente com Angular 16 na Ambra, desenvolvendo interfaces modernas com Tailwind CSS. Também tem experiência com Angular 11 na MJV.`
  },
  {
    keywords: ["python", "ia", "inteligência artificial"],
    response: `${profileData.name} implementa soluções de IA para automatização de classificações contábeis utilizando Python. Também trabalha com FastAPI para desenvolvimento de microsserviços.`
  },
  {
    keywords: ["formação", "educação", "estudos", "faculdade"],
    response: `${profileData.name} está cursando ${profileData.education[0].course} na ${profileData.education[0].institution}.`
  },
  {
    keywords: ["contato", "email", "telefone"],
    response: `Você pode entrar em contato com ${profileData.name} através do email natangon10@gmail.com ou telefone +55 63 98117-7856.`
  }
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      content: `Olá! Sou um assistente virtual. Como posso ajudar com informações sobre ${profileData.name}?`, 
      isUser: false 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Função para processar a entrada do usuário e gerar uma resposta
  const processUserInput = (input: string): string => {
    // Converter para minúsculas para facilitar a correspondência
    const lowerInput = input.toLowerCase();
    
    // Verificar se alguma palavra-chave corresponde
    for (const item of knowledgeBase) {
      if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
        return item.response;
      }
    }
    
    // Resposta padrão se nenhuma correspondência for encontrada
    return `Desculpe, não tenho informações específicas sobre isso. Você pode perguntar sobre experiência profissional, habilidades técnicas, formação acadêmica ou informações de contato de ${profileData.name}.`;
  };

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      content: newMessage,
      isUser: true
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    
    // Processa a resposta e adiciona após um pequeno delay para simular processamento
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: processUserInput(newMessage),
        isUser: false
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 500);
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Rolar para a mensagem mais recente quando as mensagens forem atualizadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      {/* Botão flutuante para abrir/fechar o chat */}
      <button 
        className={styles.chatButton} 
        onClick={toggleChat}
      >
        {isChatOpen ? '✕' : '💬'}
      </button>
      
      {/* Janela do chat */}
      {isChatOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Assistente Virtual de {profileData.name}</h3>
          </div>
          
          <div className={styles.messageList}>
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`${styles.message} ${message.isUser ? styles.userMessage : styles.aiMessage}`}
              >
                {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className={styles.chatForm}>
            <input
              type="text"
              value={newMessage}
              onChange={handleMessageChange}
              placeholder="Digite sua pergunta..."
              className={styles.chatInput}
            />
            <button 
              type="submit" 
              className={styles.sendButton}
              disabled={newMessage.trim() === ''}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat;