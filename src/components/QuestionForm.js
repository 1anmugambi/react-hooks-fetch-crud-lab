import React, { useState } from "react";

const QuestionForm = ({ onAddQuestion }) => {
  const initialFormData = {
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ],
      correctIndex: parseInt(formData.correctIndex, 10),
    };

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      const data = await response.json();
      onAddQuestion(data);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {["prompt", "answer1", "answer2", "answer3", "answer4"].map((name) => (
          <label key={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}:
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {["answer1", "answer2", "answer3", "answer4"].map((name, index) => (
              <option key={name} value={index}>
                {formData[name]}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
};

export default QuestionForm;
