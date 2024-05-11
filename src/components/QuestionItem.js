import React, { useState, useCallback } from "react";

const QuestionItem = ({ question, onDelete }) => {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = useCallback(async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDelete(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }, [id, isDeleting, onDelete]);

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Question"}
      </button>
    </li>
  );
};

export default QuestionItem;
