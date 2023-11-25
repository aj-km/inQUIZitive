import {  useNavigate } from 'react-router-dom';
import './QuizSubmitted.css'

const QuizSubmitted = () => {
  const navigate = useNavigate();
  

  const handleReturn = () => {
    navigate('/home');
  };

  return (
    <div className="success-container">
      <h1>Quiz Submitted Successfully!</h1>
      <button className="return-btn" onClick={handleReturn}>
        Return to Home page
      </button>
    </div>
  );
}

export default QuizSubmitted;