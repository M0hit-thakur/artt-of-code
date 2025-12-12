import { BrowserRouter } from "react-router-dom";
import { memo } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";

import Contact from "./components/Contact";
import StarsCanvas from "./components/canvas/Stars";
import PerformanceMonitor from "./components/PerformanceMonitor";
import Chatbot from "./components/Chatbot";

const App = memo(() => {
    return (
        <BrowserRouter>
            <div className="relative z-0 bg-primary min-h-screen">
                <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
                    <Navbar />
                    <Hero />
                    <About />
                    <Experience />
                    <Tech />
                    <Works />
                </div>
                <div className="relative z-0">
                    <Contact />
                </div>
                <StarsCanvas />
                <PerformanceMonitor />
                <Chatbot />
            </div>
        </BrowserRouter>
    )
});

export default App