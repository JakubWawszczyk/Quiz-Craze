import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './GameScreen.module.css';

export function GameScreen({ gameStates, gameSetters }) {
  const { questions, reset, iterator } = gameStates;
  const { setShowEndScreen, setShowGameScreen, setScore, setIterator } =
    gameSetters;

  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [correctAnswerAnimation, setCorrectAnswerAnimation] = useState(false);
  const [incorrectAnswerAnimation, setIncorrectAnswerAnimation] =
    useState(false);

  // Progress calculation for the progress bar
  const progress = (iterator / 5) * 100;

  // Randomizes the position of the answers for each question
  const randomizeQuestionAnswers = () => {
    const options = [
      ...questions[iterator].incorrectAnswers,
      ...questions[iterator].correctAnswers,
    ];

    const randomized = [];

    for (let i = 0; i < 4; i++) {
      const newAnswer = options.splice(
        Math.floor(Math.random() * options.length),
        1
      )[0];

      if (newAnswer === questions[iterator].correctAnswers[0]) {
        setCorrectIndex(i); // Save index of the correct answer
      }

      randomized.push(newAnswer);
    }

    setAnswers(randomized);
    setCorrectAnswer(questions[iterator].correctAnswers[0]);
  };

  // Re-randomize answers and reset animations when question changes
  useEffect(() => {
    randomizeQuestionAnswers();
    setClickedIndex(null);
    setCorrectAnswerAnimation(false);
    setIncorrectAnswerAnimation(false);
  }, [iterator]);

  // Handles user answer click
  const checkAnswer = (index) => {
    setClickedIndex(index);

    if (answers[index] === correctAnswer) {
      // Increase score for correct answer
      setScore((prev) => prev + 1);
      setCorrectAnswerAnimation(true);
      setTimeout(() => setCorrectAnswerAnimation(false), 3000);
    } else {
      // Trigger wrong answer animation
      setIncorrectAnswerAnimation(true);
      setTimeout(() => setIncorrectAnswerAnimation(false), 3000);
    }

    // Move to next question or end screen after animation
    setTimeout(() => {
      if (iterator < 4) {
        setIterator((prev) => prev + 1);
      } else {
        setShowGameScreen(false);
        setShowEndScreen(true);
      }
    }, 3001);
  };

  return (
    <main className={styles.gameScreen}>
      <div className={styles.topSection}>
        <i
          onClick={() => {
            reset(); // Resets the game
          }}
          className='textGradient fa-solid fa-right-from-bracket'
        ></i>

        <div className={styles.progress}>
          <div>{progress}%</div>
          <div
            className={styles.progressBar}
            style={{ '--bar-width': `${progress}%` }}
          ></div>
        </div>
      </div>

      <section>
        <h2 className='textGradient'>Quiz Craze</h2>
        <p className={`${styles.questionNumber} textGradient`}>
          Question nr. {iterator + 1}
        </p>
        <h3>{questions[iterator].question}</h3>

        <ul className={styles.questions}>
          {answers.map((answer, index) => (
            <li
              key={index}
              onClick={() => {
                // Disable clicks during animation
                if (correctAnswerAnimation || incorrectAnswerAnimation) return;
                checkAnswer(index);
              }}
              className={clsx(styles.questionButton, {
                [styles.buttonCorrectAnimation]:
                  clickedIndex === index && correctAnswerAnimation,
                [styles.buttonIncorrectAnimation]:
                  clickedIndex === index && incorrectAnswerAnimation,
                [styles.green]:
                  clickedIndex !== index &&
                  correctIndex === index &&
                  incorrectAnswerAnimation,
              })}
            >
              {answer}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
