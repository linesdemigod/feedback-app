import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "this item is from context 1",
      rating: 10,
    },
    {
      id: 2,
      text: "this item is from context 2",
      rating: 1,
    },
    {
      id: 3,
      text: "this item is from context 3",
      rating: 6,
    },
  ]);

  //UPDATE FEEDBACK
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map(item => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  //SET ITEM TO BE UPDATED
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //ADD FEEDBACK
  const addFeedback = newFeedback => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //DELETE FEEDBACK
  const deleteFeedback = id => {
    if (window.confirm("Are you sure you want to delete?")) {
      //check if the feedback id equals the id pass beforedeletion
      setFeedback(feedback.filter(item => item.id !== id));
    }
  };

  //EDIT FEEDBACK
  const editFeedback = item => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
