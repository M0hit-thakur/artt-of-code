const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.json());

// Initialize OpenAI client (only if API key is provided)
let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Store conversation history (in production, use a database)
const conversations = new Map();

// AI Service Functions
const getAIResponse = async (message, conversationId) => {
  try {
    // Check if OpenAI is configured
    if (!openai) {
      const userMessage = message.toLowerCase();
      
      // Greetings and basic responses
      if ((userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey') || userMessage.includes('namaste')) && !userMessage.includes('what is this website') && !userMessage.includes('features')) {
        const greetings = [
          "Hello there! 👋 I'm your AI assistant. Nice to meet you!",
          "Hi! Great to see you here! I'm here and happy to chat!",
          "Hey! Welcome to our website! I'm here to help you!",
          "Hello! I'm your friendly AI assistant. How can I make your day better?",
          "Namaste ji! 🙏 Welcome to our website! I'm here to assist you.",
          "Namaste! It's wonderful to meet you! I'm your AI assistant.",
          "Hello! Good to see you here! How can I help you today?",
          "Hi there! Welcome! I'm excited to chat with you!",
          "Hey! Nice to meet you! What brings you here today?",
          "Hello! I'm your digital assistant. Ready to help! 😊",
          "Namaste ji! Hope you're having a great day! 🌟",
          "Hi! Welcome to our amazing website! Let's chat!",
          "Hello! I'm here to make your visit more enjoyable!",
          "Namaste! Ready to explore and chat together?",
          "Hey there! Great to have you here! What's on your mind?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      } 
      
      // Name and personal questions
      else if (userMessage.includes('name') || userMessage.includes('who are you')) {
        const nameResponses = [
          "I'm your AI assistant! I don't have a specific name yet, but you can call me whatever you'd like! 😊 I'm here to help with questions about our website and more.",
          "I'm your friendly digital companion! You can call me Assistant, Helper, or give me any name you prefer! What would you like to call me?",
          "I'm your AI buddy! I don't have a name yet, but I'm here to chat and help you explore this amazing website!",
          "I'm your virtual assistant! Feel free to give me a name - I'm here to make your visit more enjoyable!",
          "I'm your AI friend! I'm nameless but not helpless - ready to assist you with anything! 😄"
        ];
        return nameResponses[Math.floor(Math.random() * nameResponses.length)];
      }
      
      else if (userMessage.includes('age') || userMessage.includes('old')) {
        const ageResponses = [
          "I'm a digital assistant, so I don't have an age in the traditional sense! I was created to help users like you. Think of me as forever young! 🌟",
          "I'm timeless! As a digital being, I don't age like humans do. I'm always fresh and ready to help!",
          "I'm eternally young! Being digital means I never get old - just like my enthusiasm to help you! 😊",
          "Age is just a number for me! I'm always at my best to assist you, no matter what!",
          "I'm ageless! Think of me as your forever-young digital companion! 🌟"
        ];
        return ageResponses[Math.floor(Math.random() * ageResponses.length)];
      }
      
      // Jokes and entertainment
      else if (userMessage.includes('joke') || userMessage.includes('funny') || userMessage.includes('laugh')) {
        const jokes = [
          "Why don't programmers like nature? It has too many bugs! 🐛",
          "What do you call a programmer from Finland? Nerdic! 😄",
          "Why did the website go to therapy? It had too many issues! 😂",
          "What's a programmer's favorite hangout place? The Foo Bar! 🍺",
          "Why don't AI assistants ever get tired? Because they're always recharged! ⚡",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "What's a programmer's favorite type of music? Algo-rhythms! 🎵",
          "Why did the developer go broke? Because he used up all his cache! 💰",
          "What do you call a programmer who doesn't comment their code? A silent partner! 🤐",
          "Why do programmers hate nature? It has too many bugs! 🌿",
          "What's a programmer's favorite snack? Cookies! 🍪",
          "Why did the JavaScript developer go to therapy? He had too many issues! 😅",
          "What do you call a programmer from India? Namaste-ic! 🙏",
          "Why don't programmers ever get cold? They always have their Java! ☕"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      }
      
      // Website-related commands
      else if (userMessage.includes('website') || userMessage.includes('site') || userMessage.includes('portfolio')) {
        const websiteResponses = [
          "This is a modern portfolio website built with React, Three.js, and Tailwind CSS! It features 3D animations, interactive elements, and a responsive design. Feel free to explore all the sections!",
          "Welcome to our amazing portfolio! It's built with cutting-edge technologies like React, Three.js for 3D graphics, and Tailwind CSS. Every section showcases different skills!",
          "This website is a masterpiece of modern web development! It combines React's power with Three.js 3D magic and beautiful Tailwind styling. Take a look around!",
          "Our portfolio website is a perfect blend of technology and creativity! Built with React, Three.js, and Tailwind CSS - it's both functional and stunning!",
          "This is a showcase of modern web development skills! React + Three.js + Tailwind CSS = Amazing user experience! Explore and enjoy! 🚀"
        ];
        return websiteResponses[Math.floor(Math.random() * websiteResponses.length)];
      }
      
      else if (userMessage.includes('what is this website') || userMessage.includes('features') || userMessage.includes('what does this website') || userMessage.includes('website features')) {
        return "Welcome to our tech showcase! This website demonstrates React expertise, Three.js 3D capabilities, Tailwind CSS mastery, and modern web development practices!";
      }
      
      else if (userMessage.includes('about')) {
        const aboutResponses = [
          "This website showcases modern web development skills including React, Three.js for 3D graphics, Tailwind CSS for styling, and interactive animations. It's designed to be both functional and visually stunning!",
          "This portfolio demonstrates expertise in React, JavaScript, Three.js for amazing 3D effects, Tailwind CSS for beautiful styling, and Framer Motion for smooth animations!",
          "Our website is a perfect example of modern frontend development! It features React components, Three.js 3D elements, Tailwind CSS styling, and interactive animations!",
          "This site showcases advanced web development skills! Built with React, Three.js for 3D graphics, Tailwind CSS, and modern animation libraries!",
          "Welcome to our tech showcase! This website demonstrates React expertise, Three.js 3D capabilities, Tailwind CSS mastery, and modern web development practices!"
        ];
        return aboutResponses[Math.floor(Math.random() * aboutResponses.length)];
      }
      
      else if (userMessage.includes('contact') || userMessage.includes('reach') || userMessage.includes('email')) {
        const contactResponses = [
          "You can reach out through the contact section of this website! It includes a contact form and social media links. I'm here in demo mode, but the real contact information is available in the main navigation.",
          "Feel free to connect through our contact section! There's a contact form and social media links available. I'm just the demo assistant, but the real contact info is in the navigation!",
          "Check out our contact section for ways to get in touch! There's a contact form and social links. I'm here for demo purposes, but you'll find the real contact details in the main menu!",
          "You can contact us through the contact section! It has a form and social media links. I'm the demo assistant, but the actual contact information is in the navigation bar!",
          "Reach out to us via the contact section! There's a contact form and social media links. I'm just the demo helper, but the real contact details are in the main navigation!"
        ];
        return contactResponses[Math.floor(Math.random() * contactResponses.length)];
      }
      
      else if (userMessage.includes('skills') || userMessage.includes('technologies') || userMessage.includes('tech')) {
        const skillsResponses = [
          "This website demonstrates skills in React, JavaScript, Three.js, Tailwind CSS, Framer Motion for animations, and modern web development practices. The 3D elements showcase advanced frontend capabilities!",
          "Our tech stack includes React for UI, Three.js for 3D graphics, Tailwind CSS for styling, Framer Motion for animations, and modern JavaScript! Each section showcases different skills!",
          "We use React for components, Three.js for amazing 3D effects, Tailwind CSS for beautiful styling, and Framer Motion for smooth animations! It's a modern tech showcase!",
          "The technologies used here are React, Three.js for 3D magic, Tailwind CSS for styling, Framer Motion for animations, and modern JavaScript! Every element demonstrates expertise!",
          "Our skills include React development, Three.js 3D graphics, Tailwind CSS styling, Framer Motion animations, and modern web development! This website is a perfect example!"
        ];
        return skillsResponses[Math.floor(Math.random() * skillsResponses.length)];
      }
      
      else if (userMessage.includes('projects') || userMessage.includes('work') || userMessage.includes('portfolio')) {
        const projectsResponses = [
          "Check out the projects section! This website itself is a project showcasing modern web development with 3D animations, responsive design, and interactive elements. Each section demonstrates different technical skills.",
          "Explore our projects section! This entire website is a masterpiece project featuring 3D animations, responsive design, and interactive elements. Every section shows different capabilities!",
          "Visit the projects section to see our work! This website is itself a project demonstrating 3D animations, responsive design, and modern web development skills!",
          "Take a look at our projects section! This website serves as a perfect example project with 3D animations, responsive design, and interactive features showcasing our skills!",
          "Browse through our projects section! This website is a living project that demonstrates 3D animations, responsive design, and modern web development techniques!"
        ];
        return projectsResponses[Math.floor(Math.random() * projectsResponses.length)];
      }
      
      // Time and date
      else if (userMessage.includes('time') || userMessage.includes('date')) {
        return `The current time is ${new Date().toLocaleString()}. I'm running in demo mode - configure your AI service for more features!`;
      }
      
      // Help
      else if (userMessage.includes('help')) {
        return "I can help with questions about this website, tell jokes, answer basic questions, and chat about web development! I'm in demo mode, so for advanced AI features, please configure your OpenAI API key.";
      }
      
      // Weather
      else if (userMessage.includes('weather')) {
        return "I'd love to help with weather information, but I'm in demo mode. Please configure your AI service for real-time data. For now, I can tell you it's a great day to explore this website! ☀️";
      }
      
      // Thank you
      else if (userMessage.includes('thank')) {
        return "You're welcome! I'm happy to help, even in demo mode. Set up your AI service for enhanced capabilities. Have a great day exploring the website! 😊";
      }
      
      // Goodbye
      else if (userMessage.includes('bye') || userMessage.includes('goodbye') || userMessage.includes('see you')) {
        return "Goodbye! Thanks for visiting our website. Feel free to come back anytime! 👋";
      }
      
      // Developer/Creator questions
      else if (userMessage.includes('who develop') || userMessage.includes('who created') || userMessage.includes('who made') || userMessage.includes('who built') || userMessage.includes('who develop this website') || userMessage.includes('who develop you')) {
        return "The great Mohit Sir! 👨‍💻 He's the amazing developer who created me and this wonderful website!";
      }
      
      // Singing responses
      else if (userMessage.includes('sing') || userMessage.includes('song') || userMessage.includes('music') || userMessage.includes('melody')) {
        const singingResponses = [
          "🎵 La la la la la! I'm singing a happy tune! 🎶 Music makes everything better!",
          "🎤 Do re mi fa so la ti do! I love to sing! What's your favorite song?",
          "🎵 Singing is wonderful! It brings joy to everyone! La la la! 🎶",
          "🎤 Music is the language of the soul! Let me sing: Do re mi fa so la ti do! 🎵",
          "🎵 I'm not able to answer this question. I am designed for basic or related questions. But I can sing! La la la! 🎶",
          "🎤 Singing makes me happy! Do re mi fa so la ti do! What would you like to know about our website? 🎵",
          "🎵 'Twinkle twinkle little star, how I wonder what you are!' 🌟 Classic English nursery rhyme!",
          "🎤 'Happy birthday to you, happy birthday to you!' 🎂 Everyone's favorite song!",
          "🎵 'Row row row your boat, gently down the stream!' 🚣‍♂️ Such a peaceful melody!",
          "🎤 'A B C D E F G, H I J K L M N O P!' 🎓 Learning the alphabet through song!",
          "🎵 'Old MacDonald had a farm, E-I-E-I-O!' 🐄🐷🐑 Farm animals everywhere!",
          "🎤 'Mary had a little lamb, little lamb, little lamb!' 🐑 So sweet and simple!",
          "🎵 'Humpty Dumpty sat on a wall, Humpty Dumpty had a great fall!' 🥚 Classic English rhyme!",
          "🎤 'London Bridge is falling down, falling down, falling down!' 🌉 Traditional English song!",
          "🎵 'Baa baa black sheep, have you any wool?' 🐑 Yes sir, yes sir, three bags full!",
          "🎤 'The wheels on the bus go round and round, round and round!' 🚌 All through the town!",
          "🎵 'If you're happy and you know it, clap your hands!' 👏👏 Classic action song!",
          "🎤 'Head, shoulders, knees and toes, knees and toes!' 👤 Body parts song!",
          "🎵 'Ring around the rosie, pocket full of posies!' 🌹 Traditional circle game song!",
          "🎤 'Itsy bitsy spider went up the water spout!' 🕷️ Down came the rain!",
          "🎵 'Jingle bells, jingle bells, jingle all the way!' 🔔 Christmas classic!",
          "🎤 'Silent night, holy night, all is calm, all is bright!' 🌙 Peaceful Christmas carol!",
          "🎵 'We wish you a Merry Christmas and a Happy New Year!' 🎄🎊 Holiday cheer!",
          "🎤 'Deck the halls with boughs of holly, fa la la la la!' 🎄 Festive decoration song!",
          "🎵 'Rudolph the red-nosed reindeer had a very shiny nose!' 🦌 Christmas favorite!",
          "🎤 'Frosty the snowman was a jolly happy soul!' ⛄ Winter wonderland song!",
          "🎵 'Let it snow, let it snow, let it snow!' ❄️ Winter weather song!",
          "🎤 'Winter wonderland, sleigh bells ring!' 🔔❄️ Magical winter song!",
          "🎵 'I'm dreaming of a white Christmas, just like the ones I used to know!' ❄️ Classic holiday song!",
          "🎤 'Santa Claus is coming to town!' 🎅 Christmas anticipation song!",
          "🎵 'The twelve days of Christmas, my true love gave to me!' 🎁 Long Christmas song!",
          "🎤 'O Christmas tree, O Christmas tree, how lovely are your branches!' 🌲 Tree decoration song!",
          "🎵 'Away in a manger, no crib for a bed!' 👶 Baby Jesus lullaby!",
          "🎤 'Joy to the world, the Lord is come!' 🌍 Celebratory Christmas song!",
          "🎵 'Hark! The herald angels sing, glory to the newborn King!' 👼 Angelic Christmas song!",
          "🎤 'O come all ye faithful, joyful and triumphant!' 🙏 Religious Christmas carol!",
          "🎵 'The first Noel, the angel did say!' 👼 Traditional Christmas carol!",
          "🎤 'God rest ye merry gentlemen, let nothing you dismay!' 🎄 Comforting Christmas song!",
          "🎵 'We three kings of Orient are, bearing gifts we traverse afar!' 👑 Magi journey song!",
          "🎤 'What child is this who laid to rest on Mary's lap is sleeping?' 👶 Baby Jesus song!",
          "🎵 'Go tell it on the mountain, over the hills and everywhere!' 🏔️ Spreading Christmas news!",
          "🎤 'Angels we have heard on high, sweetly singing o'er the plains!' 👼 Heavenly Christmas song!",
          "🎵 'O little town of Bethlehem, how still we see thee lie!' 🏘️ Peaceful Christmas town song!",
          "🎤 'It came upon the midnight clear, that glorious song of old!' 🌙 Midnight Christmas song!",
          "🎵 'Good King Wenceslas looked out on the feast of Stephen!' 👑 Saint Stephen's Day song!",
          "🎤 'I saw three ships come sailing in on Christmas Day in the morning!' ⛵ Christmas ships song!",
          "🎵 'The holly and the ivy, when they are both full grown!' 🌿 Traditional Christmas plants song!",
          "🎤 'I heard the bells on Christmas Day, their old familiar carols play!' 🔔 Christmas bells song!",
          "🎵 'Bring a torch, Jeanette Isabella, bring a torch to the cradle run!' 🔦 French Christmas song!",
          "🎤 'Lo, how a rose e'er blooming from tender stem hath sprung!' 🌹 Christmas rose song!",
          "🎵 'Of the Father's love begotten, ere the worlds began to be!' 👨‍👦 Divine love Christmas song!",
          "🎤 'Once in royal David's city stood a lowly cattle shed!' 🏘️ Humble Christmas story song!",
          "🎵 'See amid the winter's snow, born for us on earth below!' ❄️ Winter birth song!",
          "🎤 'The friendly beasts all gave a gift to the little Lord Jesus!' 🐄🐑🐐 Animal gifts song!",
          "🎵 'There's a song in the air, there's a star in the sky!' ⭐ Christmas atmosphere song!",
          "🎤 'Thou didst leave Thy throne and Thy kingly crown!' 👑 Divine sacrifice song!",
          "🎵 'While shepherds watched their flocks by night, all seated on the ground!' 🐑 Shepherd's Christmas song!",
          "🎤 'Ye faithful, approach ye, come to the cradle!' 👶 Invitation to Christmas song!",
          "🎵 'Zion hears the watchmen singing, and all her heart with joy is springing!' 🏰 Watchful Christmas song!",
          "🎤 'Sa re ga ma pa dha ni sa!' 🎵 Classic Hindi musical scale!",
          "🎵 'Ae mere watan ke logon, zara aankh mein bhar lo paani!' 🇮🇳 Patriotic Hindi song!",
          "🎤 'Chanda hai tu, mera suraj hai tu!' 🌙🌞 Beautiful Hindi lullaby!",
          "🎵 'Nanha munna rahi hoon, desh ka sipahi hoon!' 👶 Patriotic children's Hindi song!",
          "🎤 'Lakdi ki kaathi, kaathi pe ghoda!' 🐴 Traditional Hindi children's rhyme!",
          "🎵 'Machli jal ki rani hai, jeewan uska paani hai!' 🐠 Hindi fish song!",
          "🎤 'Ek chidiya, anek chidiya!' 🐦 Hindi unity song!",
          "🎵 'Aaloo kachaloo beta, kahan gaye the?' 🥔 Hindi potato song!",
          "🎤 'Bandar mama pahan pajama!' 🐒 Hindi monkey song!",
          "🎵 'Chanda mama door ke, puye pakaye boor ke!' 🌙 Hindi moon song!",
          "🎤 'Dadi amma dadi amma, maan jao!' 👵 Hindi grandmother song!",
          "🎵 'Lakdi ki kaathi, kaathi pe ghoda!' 🐴 Traditional Hindi children's song!",
          "🎤 'Machli jal ki rani hai!' 🐠 Hindi fish queen song!",
          "🎵 'Ek chidiya, anek chidiya!' 🐦 Hindi bird unity song!",
          "🎤 'Aaloo kachaloo beta!' 🥔 Hindi potato song!",
          "🎵 'Bandar mama pahan pajama!' 🐒 Hindi monkey pajama song!",
          "🎤 'Chanda mama door ke!' 🌙 Hindi moon song!",
          "🎵 'Dadi amma dadi amma!' 👵 Hindi grandmother song!",
          "🎤 'Sa re ga ma pa dha ni sa!' 🎵 Hindi musical notes!",
          "🎵 'Ae mere watan ke logon!' 🇮🇳 Patriotic Hindi song!",
          "🎤 'Chanda hai tu, mera suraj hai tu!' 🌙🌞 Hindi celestial song!",
          "🎵 'Nanha munna rahi hoon!' 👶 Hindi children's patriotic song!",
          "🎤 'Lakdi ki kaathi!' 🐴 Hindi wooden horse song!",
          "🎵 'Machli jal ki rani hai!' 🐠 Hindi fish queen song!",
          "🎤 'Ek chidiya, anek chidiya!' 🐦 Hindi bird unity song!",
          "🎵 'Aaloo kachaloo beta!' 🥔 Hindi potato song!",
          "🎤 'Bandar mama pahan pajama!' 🐒 Hindi monkey pajama song!",
          "🎵 'Chanda mama door ke!' 🌙 Hindi moon song!",
          "🎤 'Dadi amma dadi amma!' 👵 Hindi grandmother song!",
          "🎵 'Sa re ga ma pa dha ni sa!' 🎵 Hindi musical scale!",
          "🎤 'Ae mere watan ke logon!' 🇮🇳 Patriotic Hindi song!",
          "🎵 'Chanda hai tu, mera suraj hai tu!' 🌙🌞 Hindi celestial song!",
          "🎤 'Nanha munna rahi hoon!' 👶 Hindi children's patriotic song!",
          "🎵 'Lakdi ki kaathi!' 🐴 Hindi wooden horse song!",
          "🎤 'Machli jal ki rani hai!' 🐠 Hindi fish queen song!",
          "🎵 'Ek chidiya, anek chidiya!' 🐦 Hindi bird unity song!",
          "🎤 'Aaloo kachaloo beta!' 🥔 Hindi potato song!",
          "🎵 'Bandar mama pahan pajama!' 🐒 Hindi monkey pajama song!",
          "🎤 'Chanda mama door ke!' 🌙 Hindi moon song!",
          "🎵 'Dadi amma dadi amma!' 👵 Hindi grandmother song!"
        ];
        return singingResponses[Math.floor(Math.random() * singingResponses.length)];
      }
      
      // Default response for unanswerable questions
      else {
        return "I am not able to answer this question. I am designed for basic or related questions.";
      }
    }

    // Get conversation history
    const conversation = conversations.get(conversationId) || [];
    
    // Prepare messages for OpenAI
    const messages = [
      {
        role: "system",
        content: "You are a helpful AI assistant. Be concise, friendly, and professional. Keep responses under 200 words unless detailed explanation is requested."
      },
      ...conversation.map(msg => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text
      })),
      {
        role: "user",
        content: message
      }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Update conversation history
    const newMessage = { text: message, isBot: false, timestamp: Date.now() };
    const botMessage = { text: aiResponse, isBot: true, timestamp: Date.now() };
    
    conversations.set(conversationId, [...conversation, newMessage, botMessage]);

    return aiResponse;
  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Fallback responses based on error type
    if (error.code === 'insufficient_quota') {
      return "I'm currently experiencing high demand. Please try again later or check your API quota.";
    } else if (error.code === 'invalid_api_key') {
      return "I'm having trouble connecting to my AI service. Please check the API configuration.";
    } else {
      return "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.";
    }
  }
};

// Alternative AI Service (Anthropic Claude)
const getClaudeResponse = async (message, conversationId) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error);
    return "I'm sorry, I'm having trouble connecting to my AI service right now.";
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'AI Chatbot Backend is running!' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId = 'default' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const aiResponse = await getAIResponse(message, conversationId);

    res.json({
      response: aiResponse,
      conversationId: conversationId
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong while processing your request'
    });
  }
});

// Alternative endpoint for Claude
app.post('/api/chat/claude', async (req, res) => {
  try {
    const { message, conversationId = 'default' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ 
        error: 'Claude API not configured',
        message: 'Please configure your Anthropic API key in the .env file'
      });
    }

    const aiResponse = await getClaudeResponse(message, conversationId);

    res.json({
      response: aiResponse,
      conversationId: conversationId
    });

  } catch (error) {
    console.error('Claude endpoint error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong while processing your request'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiConfigured: !!openai
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Chatbot Backend running on port ${PORT}`);
  console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🤖 AI Service: ${process.env.OPENAI_API_KEY ? 'OpenAI Configured' : 'Not Configured'}`);
});
