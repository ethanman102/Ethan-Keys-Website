import "../styles/HomePage.css"
import "../animations/Wave.css"
import ImageDisplay from "../components/ImageDisplay";
import { URLS } from "../../constants";
import { useState,useEffect } from "react";
import instance from "../../api";
import Tool from "../components/Tool";
import github from '../assets/github-mark.png'
import resume from '../assets/resume.pdf'
import linkedIn from '../assets/linkedIn.png'
import resumeLogo from "../assets/resume.png"


const HomePage = () => {

    const delay = 250
    const images = [{ url: new URL('../assets/ethan1.jpg', import.meta.url).href }
]

    const [tools,setTools] = useState([])

    useEffect(
        () => {
           instance.get('api/tools/').then((response) => {
            setTools(response.data.tools)
           })},[])

    return(
                <div className="pageContainer homepageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Ethan Keys - Software Developer</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab"><u>W</u>elcome</p>
                <p className="dropdownTab"><u>T</u>o</p>
                <p className="dropdownTab"><u>M</u>y</p>
                <p className="dropdownTab">W<u>e</u>bsite</p>
            </div>
            <div className=" homepageFlex basicScrollbar">
                <div id="introContainer">
                    <h2>I am...</h2>
                    <h1>                
                        {"Ethan_Keys".split('').map((letter,i) =>
                            <span key={i} style={{animation:"wave 2s ease infinite", animationDelay:`${delay * i}ms`, display:"inline-block"}}>{letter}</span>    
                        )}
                    </h1>
                    <h2 id="homeJobTitle">Software Developer</h2>
                    <section id="links">
                        <a href={URLS.github}><img className="linkImage" src={github}/></a>
                        <a href={URLS.linkedIn}><img className="linkImage" src={linkedIn}/></a>
                        <a href={resume}><img className="linkImage" src={resumeLogo}/> <p id="resumeText">&lt; - - Resume</p></a>
                    </section>
                </div>
                <ImageDisplay images={images}/>
                <article id="about">
                    <h3><u>About Me</u></h3>
                    <p>Hey! Thanks for taking a peek around here and exploring my things.
                        <br/>
                        <br/> 
                        I am currently a 4th year University of Alberta Computer Science student Graduating in June of 2026. I find loads of fun in designing the Frontend of Webapps and other software solutions but also maintain a strong understaning in backend systems and am able to build them when needed.
                        <br/>
                        <br/>
                        Despite being a computer science student I have worked in instructing and tutoring fields designated towards children in the areas of mathematics, science, and coding! This insturctional experience has lead me to become the outgoing and eager learner that I am today and am always thrilled to share my knowledge to others while also *inheritting* other people's (See what I did there?)
                        <br/>
                        <br/>
                        Please don't hesitate to click around on this old school themed desktop webapp to learn about the projects I am both currently working on and have completed. Also, take a look at my Blog, I'm sure something will be of interest there... I hope :P
                        <br/>
                        <br/>
                        I'd love to discuss current and future employment oppurtunities and all contact with me can be reached by sending me an inquiry through my contact form labelled "contact me". Once again thanks for stopping by and I hope to chat soon! </p>
                </article>
                <section>
                    <h3><u>Development Tools</u></h3>
                    <p>These are the current tools I have used across projects</p>
                    <div className="homepageTools">
                            {tools.map((tool) => {
                                return <Tool name={tool.name} icon={tool.image.url} type={tool.type}/>
                        })
                        }
                        </div>
                </section>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    )
};

export default HomePage;