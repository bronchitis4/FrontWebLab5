import './test.css';
import { useParams, useNavigate } from "react-router-dom";
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Test = ({ testsData, onCharngeTestsState }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe(); // прибираємо слухача при демонтажі
    }, []);

    if (!testsData) {
        return <p style={{ marginTop: "100px", textAlign: "center" }}>Завантаження...</p>;
    }

    const currentTest = testsData[id];

    if (!currentTest) {
        return <p style={{ marginTop: "100px", textAlign: "center" }}>Тест не знайдено!</p>;
    }

    const handleAnswerChange = (questionIndex, answerIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const totalQuestions = currentTest.questions.length;
        let correctCount = 0;

        for (let i = 0; i < totalQuestions; i++) {
            if (selectedAnswers[i] === currentTest.correctAnswer[i]) {
                correctCount++;
            }
        }

        if (userEmail) {
            try {
                await fetch('https://serverweblab5.onrender.com/historical-platform/test-results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userEmail,
                        testName: currentTest.testName,
                        score: correctCount,
                        total: totalQuestions
                    })
                });

                onCharngeTestsState(id); // оновлення стану пройденого тесту
                navigate("/test");
            } catch (err) {
                console.error("Помилка при надсиланні результату:", err);
            }
        }
    };

    return (
        <section className="test__section">
            <div className="top__content__block">
                <h1>{currentTest.testName || "Тест"}</h1>
            </div>
            <div className="general__content__block">
                <form className="test__form" onSubmit={handleSubmit}>
                   {currentTest.questions.map((question, i) => (
  <div key={i} className="question__block">
    <p>Питання #{i + 1}</p>
    <p className="question__text">{question}</p>

    {(currentTest.answers[i]?.options || []).map((answerText, j) => (
      <div key={j}>
        <input
          type="radio"
          id={`q${i}-${j}`}
          name={`q${i}`}
          checked={selectedAnswers[i] === j}
          onChange={() => handleAnswerChange(i, j)}
        />
        <label htmlFor={`q${i}-${j}`}>
          {String.fromCharCode(65 + j)}. {answerText}
        </label>
      </div>
    ))}
  </div>
))}


                    <input type="submit" value="Завершити" className="submit__button" />
                </form>
            </div>
        </section>
    );
};

export default Test;
