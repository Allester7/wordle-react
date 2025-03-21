import {languages} from "../utils/languages.js"
import { getFarewell } from "../utils/getFarewell.js";
import { words } from "../utils/words.js";
import { clsx } from 'clsx';
import { useState } from "react";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
export default function Main(){
    const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * 500)]);
    const [valueEntered, setValueEntered] = useState([]);
    const wrongGuessCount = valueEntered.filter(letter => !currentWord.includes(letter)).length
    const alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");
    const isGameLost = wrongGuessCount === languages.length-1;
    const isGameWon = currentWord.split("").every(letter => valueEntered.includes(letter))
    const isGameOver = isGameLost || isGameWon;
    const isFarewell = valueEntered.length !== 0 && !currentWord.includes(valueEntered[valueEntered.length - 1]) && !isGameOver;
    const { width, height } = useWindowSize()
    const value = currentWord.split("").map((letter,index) =>{ 
        const revealletter = clsx(
            "letter",
            {
                redColor: isGameOver,
                greenColor: valueEntered.includes(letter),
            }
        )
         return <span key={index} className={revealletter}>{isGameOver ? letter : valueEntered.includes(letter) ? letter.toUpperCase(): ""}</span>
    })
    
    const languagesArray = languages.map((language,index) => {
        return <span style={{
            backgroundColor: language.backgroundColor,
            color : language.color}
        }
            className={ `language-style ${index < wrongGuessCount ? "lost" : ""} ` } 
            key={language.name}>
                {language.name}
                </span>
        // return <Language key={language.name} language={language}/>
    })
    function handkeKeyboardevent(letter){
        setValueEntered(prevValue => {
            return prevValue.includes(letter) ? prevValue :
            [...prevValue, letter];
        })
    }
    function handleNewGame(){
        setCurrentWord(words[Math.floor(Math.random() * 500) +1])
        setValueEntered([]);
    }
    const keyboardElements = alphabet.map((letter =>{
        const isGuessed = valueEntered.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return(<button 
            key={letter} 
            className={className}
            onClick={() =>handkeKeyboardevent(letter)}
            disabled={isGameOver}
            >{letter.toUpperCase()}</button>
        )}))

    const gameStatusclass = clsx(
        "status", 
        {
            won: isGameWon,
            lost: isGameLost,
            farewell : isFarewell
        }
    )
    return(
        <>
            {isGameWon && <Confetti
            width={width}
            height={height}
            />}
            <section className={gameStatusclass}>
                { isGameOver ?  (
                        isGameWon ?( 
                        <>
                            <h1 className="status-description">You Won</h1>
                            <p>Well done</p>
                        </>
                        ):
                        ( 
                            <>
                                <h1 className="status-description">You loose</h1>
                                <p>Better start learning react</p>
                            </>
                        )
                    ) : 
                    isFarewell ?
                    ( 
                        <h1 className="status-description">{getFarewell(languages[wrongGuessCount-1].name)}</h1>
                    ):
                    null
                }
            </section> :
           
            <section className="languages-section">
                {languagesArray}
            </section>
            <section className="word-section">
                {value}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver &&<button className="new-game-button" onClick={handleNewGame}>New Game</button>}
        </>
    )
}