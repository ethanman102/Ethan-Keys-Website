import "../styles/HomePage.css"
import "../animations/Wave.css"
import ImageDisplay from "../components/ImageDisplay";

const HomePage = () => {

    const delay = 250
    const images = [{url:'/ethan1.jpg'}]

    return(
                <div className="pageContainer">
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
            <div className="projectsShortcutContainerList homepageFlex">
                <div id="introContainer">
                    <h2>I am...</h2>
                    <h1>                
                        {"Ethan_Keys".split('').map((letter,i) =>
                            <span key={i} style={{animation:"wave 2s ease infinite", animationDelay:`${delay * i}ms`, display:"inline-block"}}>{letter}</span>    
                        )}
                    </h1>
                    <h2 id="homeJobTitle">Software Developer</h2>
                </div>
                <ImageDisplay images={images}/>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    )
};

export default HomePage;