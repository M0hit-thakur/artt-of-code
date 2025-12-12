import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I'm billu. What can I help you with?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Demo responses for when AI service is not available
  const getDemoResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    const botName = 'Billu';
    
    // Greetings and basic responses
    if ((message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('namaste')) && !message.includes('what is this website') && !message.includes('features')) {
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
    
    // Time-based greetings
    else if (
      message.includes('good morning') ||
      message.includes('good afternoon') ||
      message.includes('good evening') ||
      message.includes('good night')
    ) {
      const timeGreetings = [
        'good day! how can i help you?',
        'hope you are having a wonderful day! how can billu assist?',
        'wishing you a great time! what can i do for you?'
      ];
      return timeGreetings[Math.floor(Math.random() * timeGreetings.length)];
    }

    // How are you / small talk
    else if (
      message.includes('how are you') ||
      message.includes("how're you") ||
      message.includes("how's it going") ||
      message.includes('how r u') ||
      message.includes('kaise ho') ||
      message.includes('kya haal') ||
      message.includes("what's up") ||
      message.includes('whats up') ||
      message.includes('sup')
    ) {
      const howAreYou = [
        "i'm doing great! thanks for asking. how are you?",
        'billu is feeling awesome today! what about you? 😊',
        'all good here! how can i help you today?'
      ];
      return howAreYou[Math.floor(Math.random() * howAreYou.length)];
    }
    
    // Name and personal questions
    else if (
      message.includes('name') ||
      message.includes('who are you') ||
      message.includes("what's your name") ||
      message.includes('whats your name') ||
      message.includes('ur name')
    ) {
      const nameResponses = [
        'my name is billu.',
        "i'm billu.",
        'you can call me billu.',
        `people call me billu.`,
        `hey, i am billu.`
      ];
      return nameResponses[Math.floor(Math.random() * nameResponses.length)];
    }
    
    else if (message.includes('age') || message.includes('old')) {
      const ageResponses = [
        "I'm a digital assistant, so I don't have an age in the traditional sense! I was created to help users like you. Think of me as forever young! 🌟",
        "I'm timeless! As a digital being, I don't age like humans do. I'm always fresh and ready to help!",
        "I'm eternally young! Being digital means I never get old - just like my enthusiasm to help you! 😊",
        "Age is just a number for me! I'm always at my best to assist you, no matter what!",
        "I'm ageless! Think of me as your forever-young digital companion! 🌟"
      ];
      return ageResponses[Math.floor(Math.random() * ageResponses.length)];
    }

    // Are you a bot
    else if (
      message.includes('are you a bot') ||
      message.includes('bot or human') ||
      message.includes('human or ai')
    ) {
      return 'i am an ai assistant, billu 🤖 here to help you!';
    }

    // What can you do
    else if (
      message.includes('what can you do') ||
      message.includes('abilities') ||
      message.includes('features of you')
    ) {
      return 'i can chat, answer basic questions, tell jokes, and guide you around this website.';
    }

    // Where are you from / live
    else if (
      message.includes('where are you from') ||
      message.includes('where do you live') ||
      message.includes('kahan se ho')
    ) {
      if (message.includes('kahan se ho')) {
        return 'apke dil se ❤️';
      }
      return 'i live in the cloud ☁️ but i am always here for you!';
    }

    // Do you speak hindi
    else if (
      message.includes('speak hindi') ||
      message.includes('do you know hindi') ||
      message.includes('hindi aati hai')
    ) {
      return 'haan, thodi bahut hindi samajhta hoon. aap pooch sakte hain! 😊';
    }
    
    // Jokes and entertainment
    else if (message.includes('joke') || message.includes('funny') || message.includes('laugh')) {
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
    else if (message.includes('website') || message.includes('site') || message.includes('portfolio')) {
      const websiteResponses = [
        "This is a modern portfolio website built with React, Three.js, and Tailwind CSS! It features 3D animations, interactive elements, and a responsive design. Feel free to explore all the sections!",
        "Welcome to our amazing portfolio! It's built with cutting-edge technologies like React, Three.js for 3D graphics, and Tailwind CSS. Every section showcases different skills!",
        "This website is a masterpiece of modern web development! It combines React's power with Three.js 3D magic and beautiful Tailwind styling. Take a look around!",
        "Our portfolio website is a perfect blend of technology and creativity! Built with React, Three.js, and Tailwind CSS - it's both functional and stunning!",
        "This is a showcase of modern web development skills! React + Three.js + Tailwind CSS = Amazing user experience! Explore and enjoy! 🚀"
      ];
      return websiteResponses[Math.floor(Math.random() * websiteResponses.length)];
    }
    
    else if (message.includes('what is this website') || message.includes('features') || message.includes('what does this website') || message.includes('website features')) {
      return "Welcome to our tech showcase! This website demonstrates React expertise, Three.js 3D capabilities, Tailwind CSS mastery, and modern web development practices!";
    }
    
    else if (message.includes('about')) {
      const aboutResponses = [
        "This website showcases modern web development skills including React, Three.js for 3D graphics, Tailwind CSS for styling, and interactive animations. It's designed to be both functional and visually stunning!",
        "This portfolio demonstrates expertise in React, JavaScript, Three.js for amazing 3D effects, Tailwind CSS for beautiful styling, and Framer Motion for smooth animations!",
        "Our website is a perfect example of modern frontend development! It features React components, Three.js 3D elements, Tailwind CSS styling, and interactive animations!",
        "This site showcases advanced web development skills! Built with React, Three.js for 3D graphics, Tailwind CSS, and modern animation libraries!",
        "Welcome to our tech showcase! This website demonstrates React expertise, Three.js 3D capabilities, Tailwind CSS mastery, and modern web development practices!"
      ];
      return aboutResponses[Math.floor(Math.random() * aboutResponses.length)];
    }
    
    else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      const contactResponses = [
        "You can reach out through the contact section of this website! It includes a contact form and social media links. I'm here in demo mode, but the real contact information is available in the main navigation.",
        "Feel free to connect through our contact section! There's a contact form and social media links available. I'm just the demo assistant, but the real contact info is in the navigation!",
        "Check out our contact section for ways to get in touch! There's a contact form and social links. I'm here for demo purposes, but you'll find the real contact details in the main menu!",
        "You can contact us through the contact section! It has a form and social media links. I'm the demo assistant, but the actual contact information is in the navigation bar!",
        "Reach out to us via the contact section! There's a contact form and social media links. I'm just the demo helper, but the real contact details are in the main navigation!"
      ];
      return contactResponses[Math.floor(Math.random() * contactResponses.length)];
    }
    
    else if (message.includes('skills') || message.includes('technologies') || message.includes('tech')) {
      const skillsResponses = [
        "This website demonstrates skills in React, JavaScript, Three.js, Tailwind CSS, Framer Motion for animations, and modern web development practices. The 3D elements showcase advanced frontend capabilities!",
        "Our tech stack includes React for UI, Three.js for 3D graphics, Tailwind CSS for styling, Framer Motion for animations, and modern JavaScript! Each section showcases different skills!",
        "We use React for components, Three.js for amazing 3D effects, Tailwind CSS for beautiful styling, and Framer Motion for smooth animations! It's a modern tech showcase!",
        "The technologies used here are React, Three.js for 3D magic, Tailwind CSS for styling, Framer Motion for animations, and modern JavaScript! Every element demonstrates expertise!",
        "Our skills include React development, Three.js 3D graphics, Tailwind CSS styling, Framer Motion animations, and modern web development! This website is a perfect example!"
      ];
      return skillsResponses[Math.floor(Math.random() * skillsResponses.length)];
    }
    
    else if (message.includes('projects') || message.includes('work') || message.includes('portfolio')) {
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
    else if (message.includes('time') || message.includes('date')) {
      return `The current time is ${new Date().toLocaleString()}. I'm running in demo mode - configure your AI service for more features!`;
    }
    
    // Help
    else if (message.includes('help')) {
      return "I can help with questions about this website, tell jokes, answer basic questions, and chat about web development! I'm in demo mode, so for advanced AI features, please configure your OpenAI API key.";
    }
    
    // Weather
    else if (message.includes('weather')) {
      return "I'd love to help with weather information, but I'm in demo mode. Please configure your AI service for real-time data. For now, I can tell you it's a great day to explore this website! ☀️";
    }
    
    // Thank you
    else if (message.includes('thank')) {
      return "You're welcome! I'm happy to help, even in demo mode. Set up your AI service for enhanced capabilities. Have a great day exploring the website! 😊";
    }
    
    // Sorry / Apology
    else if (
      message.includes('sorry') ||
      message.includes('my bad') ||
      message.includes('apologies')
    ) {
      return "it's okay! no worries at all. how can i assist you now?";
    }

    // Compliments
    else if (
      message.includes('you are awesome') ||
      message.includes('you are great') ||
      message.includes('you are good') ||
      message.includes('awesome') ||
      message.includes('great') ||
      message.includes('amazing') ||
      message.includes('nice') ||
      message.includes('cool') ||
      message.includes('smart') ||
      message.includes('love you') ||
      message.includes('best') ||
      message.includes('wow')
    ) {
      const complimentResponses = [
        `thank you! ${botName} appreciates it. 😊`,
        'thanks a lot! that made my day. ✨',
        'you are so kind! thank you. 🙏',
        'glad you liked it! 😊',
        'appreciate the love! ❤️'
      ];
      return complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
    }

    // Goodbye
    else if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
      return "Goodbye! Thanks for visiting our website. Feel free to come back anytime! 👋";
    }
    
    // Developer/Creator questions
    else if (message.includes('who develop') || message.includes('who created') || message.includes('who made') || message.includes('who built') || message.includes('who develop this website') || message.includes('who develop you')) {
      return "The great Mohit Sir! 👨‍💻 He's the amazing developer who created me and this wonderful website!";
    }
    
    // Singing responses
    else if (message.includes('sing') || message.includes('song') || message.includes('music') || message.includes('melody')) {
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
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationId: 'default'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const botResponse = { 
          id: Date.now() + 1, 
          text: data.response, 
          isBot: true 
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Handle API errors with demo response
        const demoResponse = getDemoResponse(currentInput);
        const errorMessage = { 
          id: Date.now() + 1, 
          text: demoResponse, 
          isBot: true 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      // Provide demo response instead of error message
      const demoResponse = getDemoResponse(currentInput);
      const fallbackMessage = { 
        id: Date.now() + 1, 
        text: demoResponse, 
        isBot: true 
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">Billu</h3>
              <p className="text-sm opacity-90">Ask me anything!</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
