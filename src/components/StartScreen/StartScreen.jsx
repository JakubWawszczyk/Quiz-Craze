import styles from './StartScreen.module.css';

export function StartScreen({ chooseCategory, classProps }) {
  return (
    <header className={`${styles.container} ${classProps}`}>
      <div className={styles.top}>
        <h1 className='textGradient'>Quiz Craze</h1>
      </div>
      <div className={styles.categories}>
        <p>Choose a category:</p>
        <ul>
          <li
            onClick={() => {
              chooseCategory('geography');
            }}
          >
            Geography
          </li>
          <li
            onClick={() => {
              chooseCategory('sports');
            }}
          >
            Sports
          </li>
          <li
            onClick={() => {
              chooseCategory('science');
            }}
          >
            Science & Technology
          </li>
          <li
            onClick={() => {
              chooseCategory('culture');
            }}
          >
            Culture & Entertainment
          </li>
        </ul>
      </div>
    </header>
  );
}
