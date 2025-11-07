import styles from './EndScreen.module.css';
export function EndScreen({ score, reset }) {
  return (
    <footer className={styles.endScreen}>
      <h2 className='textGradient'>Quiz Craze</h2>
      <h3 className='textGradient'>Your score:</h3>
      <p className={styles.scoreInNumber}>{score}/5</p>
      <p className={styles.scoreInPercent}> {(score / 5) * 100}.00%</p>
      <button
        onClick={() => {
          reset();
        }}
        className={styles.playAgain}
      >
        Play again
      </button>
    </footer>
  );
}
