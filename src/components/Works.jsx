import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Works = () => {
  return (
    <div id="work" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <span className='hash-span'>&nbsp;</span>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-col items-center justify-center'>
        <motion.div 
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          className='bg-tertiary p-8 rounded-2xl text-center max-w-md'
        >
          <div className='text-6xl mb-4'>🚀</div>
          <h3 className='text-white font-bold text-[28px] mb-4'>Uploading Soon</h3>
          <p className='text-secondary text-[16px] leading-[24px]'>
            Exciting projects are in development. Stay tuned for amazing work coming your way!
          </p>
          <div className='mt-6 flex justify-center'>
            <div className='w-16 h-1 bg-[#915EFF] rounded-full'></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Works;
