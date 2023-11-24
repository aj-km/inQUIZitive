
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes } from '../../Actions/quizActions';
import QuizComponent from '../QuizComponent/QuizComponent';
import './QuizzesList.css';

const QuizzesList = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { quizzes, error } = useSelector((state) => state.fetchQuiz);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [ setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date()); 
    }, 1000);

    return () => clearInterval(timerId); 
  },); 

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(fetchQuizzes(user._id));
    }
  }, [dispatch, isAuthenticated, user?._id]);

  useEffect(() => {
    if (isFullScreen) {
      document.addEventListener('fullscreenchange', handleFullScreenChange);
      return () => {
        document.removeEventListener('fullscreenchange', handleFullScreenChange);
      };
    }
  }, [isFullScreen]);

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const isQuizActive = (quiz) => {
    const currentTime = new Date(); 
    const quizStartTime = new Date(quiz.startTime);
    const quizEndTime = new Date(quiz.endTime);
    return (currentTime >= quizStartTime) && (currentTime < quizEndTime);
  };

  const handleQuizSelection = (quizId) => {
    const selectedQuiz = quizzes.find((q) => q.quizId._id === quizId);
    if (isQuizActive(selectedQuiz)) {
      enterFullScreen();
      setSelectedQuiz(selectedQuiz);
      
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      console.log("This quiz is not currently active.");
    }
  };

  const handleBeforeUnload = (event) => {
    const message = 'You are about to leave the quiz. Are you sure you want to do this?';
    event.returnValue = message; 
    return message; 
  };

  return (
    <div className="quizzes-list">
      {error && <p>Error loading quizzes: {error}</p>}
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li
            key={quiz.quizId._id}
            onClick={() => handleQuizSelection(quiz.quizId._id)}
            className={isQuizActive(quiz) ? 'active-quiz' : ''}
          >
            <div>
              <span>{quiz.quizId.title}</span>
              <span> - Start Time: {quiz.date} {quiz.startTime}</span>
              <span> - End Time: {quiz.date} {quiz.endTime}</span>

            </div>
          </li>
        ))}
      </ul>
      {selectedQuiz && <QuizComponent quiz={selectedQuiz} />}
    </div>
  );
};

export default QuizzesList;
