import './App.css';
import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import Footer from './components/footer/Footer';
import ListFilter from './components/list-filter/ListFilter';
import ChronologyList from './components/chronology-list/ChronologyList';
import EventsList from './components/events-list/EventsList';
import PlatformDescription from './components/platform-description/PlatformDescription';
import TestBlock from './components/test-block/TestBlock';
import Test from './components/test/Test';
import CircularGraph from './components/circular-graph/CircularGraph';
import EventInfoBlock from './components/event-info-block/EventInfoBlock';
import RegisterForm from './components/register-form/register-form.js';
import LoginForm from './components/login-form/login-form.js';
import { db, auth } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [events, setEvents] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [testsData, setTestsData] = useState([]);
  const [eventsInfo, setEventsInfo] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("Усі");
  const [testsState, setTestsState] = useState([0, 0, 0, 0, 0]);
  const [closedTestPercent, setClosedTestPercent] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const calculatePercents = useCallback((newTestsState) => {
    const totalTests = testsData.length;
    const closedTests = newTestsState.filter(state => state === 1).length;
    const newClosedTestPercent = totalTests > 0 ? (closedTests / totalTests) * 100 : 0;

    setTestsState(newTestsState);
    setClosedTestPercent(newClosedTestPercent);
  }, [testsData]);

  const onChangeFilter = useCallback((filter) => {
    setCurrentFilter(filter);
  }, []);

  const onChangeTestsState = useCallback((id) => {
    const newTestsState = [...testsState];
    newTestsState[id] = 1;
    calculatePercents(newTestsState);
  }, [testsState, calculatePercents]);

  const onUpdateData = useCallback(() => {
    if (currentFilter === "Усі") {
      return events;
    }
    return events.filter(item => item.period === currentFilter);
  }, [currentFilter, events]);

  async function fetchEvents() {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("User not logged in");
        setIsAuthenticated(false);
        return;
      }

      const token = await user.getIdToken();
      console.log(token);
      const response = await fetch('https://serverweblab5.onrender.com/historical-platform/events', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const responseData = await response.json();
      console.log(responseData);
      setEvents(responseData.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

 async function fetchEventsInfo() {
  try {
    const response = await fetch('https://serverweblab5.onrender.com/historical-platform/events-info');
    if (!response.ok) {
      throw new Error('Помилка при отриманні інформації про події');
    }
    const result = await response.json();
    console.log(result.data);
    if (result.succesful) {
      setEventsInfo(result.data);
    } else {
      console.error('Помилка сервера:', result.message);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function fetchMainEventsList() {
  try {
    const response = await fetch('https://serverweblab5.onrender.com/historical-platform/main-events-list');
    if (!response.ok) {
      throw new Error('Помилка при отриманні головного списку подій');
    }
    const result = await response.json();
    if (result.succesful) {
      setEventsList(result.data);
    } else {
      console.error('Помилка сервера:', result.message);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

  async function fetchTests() {
    const testsCollection = collection(db, "tests");
    const snapshot = await getDocs(testsCollection);

    const testsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setTestsData(testsList);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchMainEventsList();
      await fetchEvents();
      await fetchTests();
      await fetchEventsInfo();
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

 
  return (
    <Router>
      <NavigationMenu />
      <main>
        <Routes>
          <Route path="/" element={<PlatformDescription />} />
          <Route path="/chronology" element={
            <>
              <ListFilter OnChangeFilter={onChangeFilter} filter={currentFilter} />
              <ChronologyList data={onUpdateData()} />
            </>
          } />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/events" element={<EventsList eventsList={eventsList} />} />
          <Route path="/test" element={<TestBlock numTests={testsState} graph={<CircularGraph percentClosedTests={closedTestPercent} />} />} />
          <Route path="/test/:id" element={<Test testsData={testsData} onCharngeTestsState={onChangeTestsState} />} />
          <Route path="/event/:id" element={<EventInfoBlock eventData={eventsInfo} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;