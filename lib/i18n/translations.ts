export type Language = 'pt' | 'en' | 'es'

export const translations = {
  pt: {
    // Header
    header: {
      title: 'Alice Stamato',
    },
    
    // Hero
    hero: {
      badge: 'Diretora de Cinema & Roteirista',
      title: 'Alice Stamato',
      subtitle: 'Criando narrativas visuais que transformam histórias em experiências cinematográficas inesquecíveis',
      ctaPortfolio: 'Explorar Trabalhos',
      ctaContact: 'Iniciar Conversa',
      scroll: 'Scroll',
    },
    
    // About
    about: {
      title: 'Sobre',
      pronouns: 'she/her',
      location: 'São Paulo, SP, Brasil',
      bio1: 'Diretora e Roteirista. Sócia fundadora da',
      bio2: 'Lombada Filmes',
      bio3: '(2019) acredita na produtora audiovisual como espaço para filmes autorais e na pluralidade de narrativas para a comunidade LGBTQIA+. Tem bastante experiência na área, com curtas-metragens e videoclipes premiados em festivais nacionais e internacionais.',
      bio4: 'Atualmente, assina o roteiro e direção do seu primeiro longa-metragem ficcional "NINHO TINTO", produção Platô Filmes e Olhar distribuição, em fase de pós-produção, contemplado pelo FSA - Novos Realizadores 2022 e selecionado para o Fórum de Coprodução da Europa-América Latina do 71° Festival de San Sebastián (SSIFF) e para o Marché Du Film - Festival de Cannes de 2025. O filme ganhou o prêmio de finalização no WIP da Mostra Internacional de Cinema de São Paulo 2025.',
      bio5: 'Também assina a direção dos longas-metragens "DEUS NOS GUIE" roteiro de Thaís Olivier e produção Lombada Filmes (3º lugar no Prêmio Cabíria 2022 de longa-metragem, 2º lugar no prêmio LATINX 2022 e Semifinalista do FRAPA 2023) e "HAMSTER" roteiro de Georgina Castro e produção Lombada Filmes (Prêmio Cabíria de Incentivo a Roteiristas Mulheres, contemplado pelo PROAC desenvolvimento de Longas e Prêmio de Roteiro Antônio Bivar), ambos os dois longas estão em fase de desenvolvimento e captação.',
      specialties: {
        title: 'Especialidades',
        direction: 'Direção Cinematográfica',
        script: 'Roteiro Original',
        documentary: 'Documentário',
        production: 'Produção Executiva',
      },
      recognition: {
        title: 'Reconhecimento',
        awards: '15+ Prêmios Nacionais',
        festivals: 'Festivais Internacionais',
        critics: 'Menções Crítica',
        selections: 'Seleções Oficiais',
      },
      lombada: {
        title: 'Lombada Filmes',
        description: 'Produtora audiovisual independente focada em desenvolver projetos autorais e comerciais com excelência técnica e narrativa. A Lombada Filmes é especializada em produção de filmes, documentários e conteúdo audiovisual de alta qualidade.',
      },
    },
    
    // Portfolio
    portfolio: {
      title: 'Portfólio',
      badge: 'Trabalhos Selecionados',
      description: 'Uma seleção de trabalhos que demonstram minha visão cinematográfica e paixão por contar histórias',
      videosAvailable: 'vídeos disponíveis',
      viewFullPortfolio: 'Ver portfólio completo no Vimeo',
      categories: {
        fiction: 'Ficção',
        drama: 'Drama',
        documentary: 'Documentário',
        commercial: 'Comercial',
      },
    },
    
    // Contact
    contact: {
      title: 'Vamos Conversar',
      description: 'Interessado em colaborações, projetos ou apenas quer trocar ideias sobre cinema? Adoraria ouvir de você.',
      form: {
        name: 'Nome *',
        namePlaceholder: 'Seu nome completo',
        email: 'Email *',
        emailPlaceholder: 'seu@email.com',
        subject: 'Assunto *',
        subjectPlaceholder: 'Sobre o que você gostaria de falar?',
        message: 'Mensagem *',
        messagePlaceholder: 'Conte-me mais sobre seu projeto ou ideia...',
        submit: 'Enviar Mensagem',
        sending: 'Enviando...',
        success: {
          title: 'Mensagem Enviada!',
          description: 'Obrigado pelo contato. Entraremos em contato em breve.',
          sendAnother: 'Enviar outra mensagem',
        },
        errors: {
          validation: 'Por favor, corrija os erros no formulário',
          name: 'Nome deve ter pelo menos 2 caracteres',
          email: 'Email é obrigatório',
          emailInvalid: 'Email inválido',
          subject: 'Assunto deve ter pelo menos 3 caracteres',
          message: 'Mensagem deve ter pelo menos 10 caracteres',
          connection: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
        },
      },
      info: {
        email: 'Email',
        location: 'Localização',
        locationValue: 'São Paulo, SP\nBrasil',
        social: 'Redes Sociais',
        responseTime: 'Normalmente respondo em até',
        hours: '24 horas',
      },
    },
    
    // Footer
    footer: {
      title: 'Alice Stamato',
      subtitle: 'Diretora de Cinema & Roteirista',
      copyright: `© ${new Date().getFullYear()} Alice Stamato. Todos os direitos reservados.`,
    },
    
    // Vimeo Profile
    vimeoProfile: {
      portfolio: 'Portfólio',
      viewMore: 'Ver Mais Filmes',
      follow: 'Seguir',
      message: 'Mensagem',
      activity: 'Atividade',
      showcases: 'Mostras',
      followers: 'Seguidores',
      following: 'Seguindo',
      collections: 'Coleções',
      memberSince: 'Membro desde',
      readMore: 'Ler mais',
      categories: {
        'Ficção': 'Ficção',
        'Drama': 'Drama',
        'Documentário': 'Documentário',
        'Comercial': 'Comercial',
      },
      types: {
        'Vídeo Clipe': 'Vídeo Clipe',
        'Curta Metragem': 'Curta Metragem',
        'Longa Metragem': 'Longa Metragem',
        'Propaganda': 'Propaganda',
        'Institucional': 'Institucional',
        'Trailler': 'Trailler',
        'Em Desenvolvimento': 'Em Desenvolvimento',
      },
    },
  },
  
  en: {
    // Header
    header: {
      title: 'Alice Stamato',
    },
    
    // Hero
    hero: {
      badge: 'Film Director & Screenwriter',
      title: 'Alice Stamato',
      subtitle: 'Creating visual narratives that transform stories into unforgettable cinematic experiences',
      ctaPortfolio: 'Explore Works',
      ctaContact: 'Start Conversation',
      scroll: 'Scroll',
    },
    
    // About
    about: {
      title: 'About',
      pronouns: 'she/her',
      location: 'São Paulo, SP, Brazil',
      bio1: 'Director and Screenwriter. Founding partner of',
      bio2: 'Lombada Filmes',
      bio3: '(2019), she believes in the audiovisual production company as a space for authorial films and in the plurality of narratives for the LGBTQIA+ community. She has extensive experience in the field, with award-winning short films and music videos at national and international festivals.',
      bio4: 'Currently, she is writing and directing her first fictional feature film "NINHO TINTO", produced by Platô Filmes and distributed by Olhar, in post-production, awarded by FSA - Novos Realizadores 2022 and selected for the Europe-Latin America Co-production Forum of the 71st San Sebastián International Film Festival (SSIFF) and for the Marché Du Film - Cannes Film Festival 2025. The film won the completion award at the WIP of the São Paulo International Film Festival 2025.',
      bio5: 'She also directs the feature films "DEUS NOS GUIE" written by Thaís Olivier and produced by Lombada Filmes (3rd place in the Prêmio Cabíria 2022 for feature film, 2nd place in the LATINX 2022 award and Semifinalist at FRAPA 2023) and "HAMSTER" written by Georgina Castro and produced by Lombada Filmes (Prêmio Cabíria de Incentivo a Roteiristas Mulheres, awarded PROAC desenvolvimento de Longas and Prêmio de Roteiro Antônio Bivar), both films are in development and fundraising phase.',
      specialties: {
        title: 'Specialties',
        direction: 'Cinematic Direction',
        script: 'Original Screenplay',
        documentary: 'Documentary',
        production: 'Executive Production',
      },
      recognition: {
        title: 'Recognition',
        awards: '15+ National Awards',
        festivals: 'International Festivals',
        critics: 'Critical Mentions',
        selections: 'Official Selections',
      },
      lombada: {
        title: 'Lombada Filmes',
        description: 'Independent audiovisual production company focused on developing authorial and commercial projects with technical and narrative excellence. Lombada Filmes specializes in producing films, documentaries and high-quality audiovisual content.',
      },
    },
    
    // Portfolio
    portfolio: {
      title: 'Portfolio',
      badge: 'Selected Works',
      description: 'A selection of works that demonstrate my cinematic vision and passion for storytelling',
      videosAvailable: 'videos available',
      viewFullPortfolio: 'View full portfolio on Vimeo',
      categories: {
        fiction: 'Fiction',
        drama: 'Drama',
        documentary: 'Documentary',
        commercial: 'Commercial',
      },
    },
    
    // Contact
    contact: {
      title: "Let's Talk",
      description: 'Interested in collaborations, projects or just want to exchange ideas about cinema? I would love to hear from you.',
      form: {
        name: 'Name *',
        namePlaceholder: 'Your full name',
        email: 'Email *',
        emailPlaceholder: 'your@email.com',
        subject: 'Subject *',
        subjectPlaceholder: 'What would you like to talk about?',
        message: 'Message *',
        messagePlaceholder: 'Tell me more about your project or idea...',
        submit: 'Send Message',
        sending: 'Sending...',
        success: {
          title: 'Message Sent!',
          description: 'Thank you for contacting us. We will get back to you soon.',
          sendAnother: 'Send another message',
        },
        errors: {
          validation: 'Please correct the errors in the form',
          name: 'Name must be at least 2 characters',
          email: 'Email is required',
          emailInvalid: 'Invalid email',
          subject: 'Subject must be at least 3 characters',
          message: 'Message must be at least 10 characters',
          connection: 'Could not send message. Please try again later.',
        },
      },
      info: {
        email: 'Email',
        location: 'Location',
        locationValue: 'São Paulo, SP\nBrazil',
        social: 'Social Media',
        responseTime: 'I usually respond within',
        hours: '24 hours',
      },
    },
    
    // Footer
    footer: {
      title: 'Alice Stamato',
      subtitle: 'Film Director & Screenwriter',
      copyright: `© ${new Date().getFullYear()} Alice Stamato. All rights reserved.`,
    },
    
    // Vimeo Profile
    vimeoProfile: {
      portfolio: 'Portfolio',
      viewMore: 'View More Films',
      follow: 'Follow',
      message: 'Message',
      activity: 'Activity',
      showcases: 'Showcases',
      followers: 'Followers',
      following: 'Following',
      collections: 'Collections',
      memberSince: 'Member since',
      readMore: 'Read more',
      categories: {
        'Ficção': 'Fiction',
        'Drama': 'Drama',
        'Documentário': 'Documentary',
        'Comercial': 'Commercial',
      },
      types: {
        'Vídeo Clipe': 'Music Video',
        'Curta Metragem': 'Short Film',
        'Longa Metragem': 'Feature Film',
        'Propaganda': 'Commercial',
        'Institucional': 'Institutional',
        'Trailler': 'Trailer',
        'Em Desenvolvimento': 'In Development',
      },
    },
  },
  
  es: {
    // Header
    header: {
      title: 'Alice Stamato',
    },
    
    // Hero
    hero: {
      badge: 'Directora de Cine & Guionista',
      title: 'Alice Stamato',
      subtitle: 'Creando narrativas visuales que transforman historias en experiencias cinematográficas inolvidables',
      ctaPortfolio: 'Explorar Trabajos',
      ctaContact: 'Iniciar Conversación',
      scroll: 'Desplazar',
    },
    
    // About
    about: {
      title: 'Sobre',
      pronouns: 'she/her',
      location: 'São Paulo, SP, Brasil',
      bio1: 'Directora y Guionista. Socia fundadora de',
      bio2: 'Lombada Filmes',
      bio3: '(2019), cree en la productora audiovisual como espacio para películas de autor y en la pluralidad de narrativas para la comunidad LGBTQIA+. Tiene amplia experiencia en el área, con cortometrajes y videoclips premiados en festivales nacionales e internacionales.',
      bio4: 'Actualmente, firma el guion y dirección de su primer largometraje de ficción "NINHO TINTO", producción Platô Filmes y distribución Olhar, en fase de posproducción, contemplado por el FSA - Novos Realizadores 2022 y seleccionado para el Foro de Coproducción Europa-América Latina del 71° Festival de San Sebastián (SSIFF) y para el Marché Du Film - Festival de Cannes 2025. La película ganó el premio de finalización en el WIP de la Mostra Internacional de Cinema de São Paulo 2025.',
      bio5: 'También firma la dirección de los largometrajes "DEUS NOS GUIE" guion de Thaís Olivier y producción Lombada Filmes (3º lugar en el Prêmio Cabíria 2022 de largometraje, 2º lugar en el premio LATINX 2022 y Semifinalista del FRAPA 2023) y "HAMSTER" guion de Georgina Castro y producción Lombada Filmes (Prêmio Cabíria de Incentivo a Roteiristas Mulheres, contemplado por el PROAC desenvolvimento de Longas y Prêmio de Roteiro Antônio Bivar), ambos largometrajes están en fase de desarrollo y captación.',
      specialties: {
        title: 'Especialidades',
        direction: 'Dirección Cinematográfica',
        script: 'Guion Original',
        documentary: 'Documental',
        production: 'Producción Ejecutiva',
      },
      recognition: {
        title: 'Reconocimiento',
        awards: '15+ Premios Nacionales',
        festivals: 'Festivales Internacionales',
        critics: 'Menciones Críticas',
        selections: 'Selecciones Oficiales',
      },
      lombada: {
        title: 'Lombada Filmes',
        description: 'Productora audiovisual independiente enfocada en desarrollar proyectos autorales y comerciales con excelencia técnica y narrativa. Lombada Filmes se especializa en la producción de películas, documentales y contenido audiovisual de alta calidad.',
      },
    },
    
    // Portfolio
    portfolio: {
      title: 'Portafolio',
      badge: 'Trabajos Seleccionados',
      description: 'Una selección de trabajos que demuestran mi visión cinematográfica y pasión por contar historias',
      videosAvailable: 'videos disponibles',
      viewFullPortfolio: 'Ver portafolio completo en Vimeo',
      categories: {
        fiction: 'Ficción',
        drama: 'Drama',
        documentary: 'Documental',
        commercial: 'Comercial',
      },
    },
    
    // Contact
    contact: {
      title: 'Hablemos',
      description: '¿Interesado en colaboraciones, proyectos o simplemente quieres intercambiar ideas sobre cine? Me encantaría saber de ti.',
      form: {
        name: 'Nombre *',
        namePlaceholder: 'Tu nombre completo',
        email: 'Correo *',
        emailPlaceholder: 'tu@correo.com',
        subject: 'Asunto *',
        subjectPlaceholder: '¿Sobre qué te gustaría hablar?',
        message: 'Mensaje *',
        messagePlaceholder: 'Cuéntame más sobre tu proyecto o idea...',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: {
          title: '¡Mensaje Enviado!',
          description: 'Gracias por contactarnos. Nos pondremos en contacto pronto.',
          sendAnother: 'Enviar otro mensaje',
        },
        errors: {
          validation: 'Por favor, corrige los errores en el formulario',
          name: 'El nombre debe tener al menos 2 caracteres',
          email: 'El correo es obligatorio',
          emailInvalid: 'Correo inválido',
          subject: 'El asunto debe tener al menos 3 caracteres',
          message: 'El mensaje debe tener al menos 10 caracteres',
          connection: 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
        },
      },
      info: {
        email: 'Correo',
        location: 'Ubicación',
        locationValue: 'São Paulo, SP\nBrasil',
        social: 'Redes Sociales',
        responseTime: 'Normalmente respondo en',
        hours: '24 horas',
      },
    },
    
    // Footer
    footer: {
      title: 'Alice Stamato',
      subtitle: 'Directora de Cine & Guionista',
      copyright: `© ${new Date().getFullYear()} Alice Stamato. Todos los derechos reservados.`,
    },
    
    // Vimeo Profile
    vimeoProfile: {
      portfolio: 'Portafolio',
      viewMore: 'Ver Más Películas',
      follow: 'Seguir',
      message: 'Mensaje',
      activity: 'Actividad',
      showcases: 'Muestras',
      followers: 'Seguidores',
      following: 'Siguiendo',
      collections: 'Colecciones',
      memberSince: 'Miembro desde',
      readMore: 'Leer más',
      categories: {
        'Ficção': 'Ficción',
        'Drama': 'Drama',
        'Documentário': 'Documental',
        'Comercial': 'Comercial',
      },
      types: {
        'Vídeo Clipe': 'Videoclip',
        'Curta Metragem': 'Cortometraje',
        'Longa Metragem': 'Largometraje',
        'Propaganda': 'Publicidad',
        'Institucional': 'Institucional',
        'Trailler': 'Tráiler',
        'Em Desenvolvimento': 'En Desarrollo',
      },
    },
  },
} as const

