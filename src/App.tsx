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

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative">
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
