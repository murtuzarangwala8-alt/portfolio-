import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import FloatingAIChat from './components/FloatingAIChat';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import IntroAnimation from './components/IntroAnimation';
import { useState } from 'react';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
        <div style={{ visibility: introComplete ? 'visible' : 'hidden' }} className="relative">
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <FloatingAIChat />
          <footer className="bg-gray-900 dark:bg-black py-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Murtuza Rangwala. All rights reserved.</p>
          </footer>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
