// import './testBlock.css'
// import TestBtn from '../test-btn/TestBtn';
// import {auth} from '../../firebase.js'
// import { onAuthStateChanged } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const TestBlock = ({ numTests, graph }) => {
//     const arr = [];
//     const navigate = useNavigate();

//     for (let i = 0; i < numTests.length; i++) {
//         const backgroundValue = numTests[i] == 1 ? 'green' : 'transparent';
//         console.log(backgroundValue);
//         arr.push(<TestBtn key={i} id={i} style={{backgroundColor: backgroundValue }} />);
//     }

//     useEffect(() => {
//             onAuthStateChanged(auth, (user) => {
//                 if (user) {
//                     console.log(user.email);
//                 } else {
//                     console.log("User is signed out");
//                     navigate("/login");
//                 }
//             });
//     }, []);

//     return (
//         <section id="test__list">
//             {graph}
//             <div className="themes__tests">
//                 <h1>Тести по темах</h1>
//                 {arr}
//             </div>
//             {/* <div className="generals__test">
//                 <h1>Загальний тест</h1>
//                 <a href="test.html" className="test__button">Заг.</a>
//             </div> */}
//         </section>
//     );
// };

// export default TestBlock;


import './testBlock.css'
import TestBtn from '../test-btn/TestBtn';
import { auth } from '../../firebase.js'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TestBlock = ({ numTests, graph }) => {
    const [averageScore, setAverageScore] = useState(null);
    const navigate = useNavigate();
    const arr = [];

    // Створюємо кнопки тестів
    for (let i = 0; i < numTests.length; i++) {
        const backgroundValue = numTests[i] === 1 ? 'green' : 'transparent';
        arr.push(<TestBtn key={i} id={i} style={{ backgroundColor: backgroundValue }} />);
    }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const email = user.email;
            console.log("User email:", email);

            try {
                // ⬇️ Отримуємо Firebase ID токен
                const token = await user.getIdToken();
                console.log(token);
                // ⬇️ Додаємо токен до заголовків запиту
                const response = await fetch(`https://serverweblab5.onrender.com/historical-platform/test-results/average/${email}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // 🔐 Токен
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (data.succesful) {
                    setAverageScore(data.data.averagePercentage);
                } else {
                    setAverageScore(null);
                }
            } catch (error) {
                console.error('Помилка при отриманні середнього балу:', error);
                setAverageScore(null);
            }
        } else {
            console.log("User is signed out");
            navigate("/login");
        }
    });

    // Очистка слухача при демонтажі компонента
    return () => unsubscribe();
}, [navigate]);


    return (
        <section id="test__list">
             {averageScore !== null ? (
                        <p>Середній бал пройдених тестів: <strong>{averageScore}%</strong></p>
                    ) : (
                        <p>Інформація про середній бал недоступна</p>
                    )}
            {/*graph*/}
            <div className="themes__tests">
                <h1>Тести по темах</h1>
                {/* Виводимо середній бал */}
                   
               
                {arr}
            </div>
        </section>
    );
};

export default TestBlock;
