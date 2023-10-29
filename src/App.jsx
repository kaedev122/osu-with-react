import { useState, useEffect, useRef } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [mouseOnCircle, setMouseOnCircle] = useState(false)
  const [position, setPosition] = useState({
    width: `${Math.floor(Math.random() * (windowWidth.current - 300))}px`,
    height: `${Math.floor(Math.random() * (windowHeight.current - 200))}px`
  })

  const handleClickCircle = () => {
    setScore((score) => score + 1)
    let width = `${Math.floor(Math.random() * (windowWidth.current - 300))}px`
    let height = `${Math.floor(Math.random() * (windowHeight.current - 200))}px`
    console.log(width, height)
    console.log(windowWidth, windowHeight)
    setPosition({
      width: width, 
      height: height
    })
  }

  const [counter, setCounter] = useState(15);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (counter === -1) {
      if (score > highScore) {
        setHighScore(score)
      }
      setScore(0)
      setStart(false)
      setCounter(15)
      alert(`Your score: ${score}`)
    }
    const timer = 
      start && counter > -1 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, start]);

  const handleKeyDown = event => {
    if (event.key === "z" || event.key === "x") {
      if (mouseOnCircle) {
        handleClickCircle()
      } else {
        if (score === 0)
          return
          setScore(score - 1)
      }
    }
  };

  return (
    <div
      className="main-screen"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      {start && <div 
        className="d-flex align-items-center justify-content-center"
        onClick={() => handleClickCircle()}
        onMouseEnter={() => setMouseOnCircle(true)}
        onMouseLeave={() => setMouseOnCircle(false)}
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          background: 'aqua',
          border: '10px solid blue',
          borderRadius: '50%',
          left: `${position.width}`,
          top: `${position.height}`
        }}
      >
        <span className="fs-25">{score}</span>
      </div> }
      <div 
        className='information-layout d-flex flex-column align-items-center justify-content-center'
      >
        <button onClick={() => setStart(true)}>Start</button>
        <span>Time: {counter}</span>
        <span>Score: {score} | High score: {highScore}</span>
      </div>
    </div>
  )
}

export default App
