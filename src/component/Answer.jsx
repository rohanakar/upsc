import React from 'react';
import "./Answer.css"
const Answer = ({htmlResult }) => {
  return (
    <div className="answer-section">
       <div dangerouslySetInnerHTML={{ __html: htmlResult}} />  
    </div>
  );
};

export default Answer;
