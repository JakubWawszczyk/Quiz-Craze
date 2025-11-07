import { useState } from 'react';
import styles from './App.module.css';
import { EndScreen } from './components/EndScreen/EndScreen';
import { GameScreen } from './components/GameScreen/GameScreen';
import { StartScreen } from './components/StartScreen/StartScreen';
import { culture } from './data/culture';
import { geography } from './data/geography';
import { science } from './data/science';
import { sports } from './data/sports';

function App() {
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showGameScreen, setShowGameScreen] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [score, setScore] = useState(0);

  const handleChooseCategoryClick = (category) => {
    let newQuestions = eval(category);
    let questionSet = [];

    for (let i = 0; i < 5; i++) {
      if (newQuestions.length === 0) break;
      const index = Math.floor(Math.random() * newQuestions.length);
      questionSet.push(newQuestions.splice(index, 1)[0]);
    }

    setQuestions(questionSet);
    setShowGameScreen(true);

    setTimeout(() => setShowStartScreen(false), 500);
  };

  const reset = () => {
    setShowStartScreen(true);
    setShowGameScreen(false);
    setShowEndScreen(false);
    setIterator(0);
    setScore(0);
  };

  return (
    <>
      {showStartScreen && (
        <StartScreen
          classProps={showGameScreen ? styles.slideAnimation : ''}
          chooseCategory={handleChooseCategoryClick}
        />
      )}

      {showGameScreen && (
        <GameScreen
          gameStates={{ questions, reset, iterator }}
          gameSetters={{
            setIterator,
            setShowGameScreen,
            setShowEndScreen,
            setScore,
          }}
        />
      )}

      {showEndScreen && <EndScreen reset={reset} score={score} />}
    </>
  );
}

export default App;
