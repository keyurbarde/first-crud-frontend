import { useEffect, useState } from "react";
import Topic from "./Topic";
import NewObjectModal from "./NewObjectModal";
import Button from "./Button";

export default TopicList;

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [showAddTopic, setShowAddTopic] = useState(false);

  useEffect(function () {
    async function getAllTopics() {
      const res = await fetch("http://127.0.0.1:8080/topics");
      const data = await res.json();
      console.log(data);
      setTopics(data);
    }
    getAllTopics();
  }, []);

  function handleDelete(id) {
    async function postJSON(id) {
      try {
        const response = await fetch(`http://127.0.0.1:8080/topics/${id}`, {
          method: "DELETE", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        });

        console.log("Success:", response.ok);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    postJSON(id);

    setTopics(topics.filter((topic) => topic.id !== id));
  }

  function handleAdd(topic) {
    async function postJSON(topic) {
      try {
        const response = await fetch(`http://127.0.0.1:8080/topics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(topic),
        });

        console.log("Success:", response.ok);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    postJSON(topic);

    setTopics((topics) => [...topics, topic]);
  }

  function handleUpdate(topic) {
    async function postJSON(topic) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/topics/${topic.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(topic),
          }
        );

        console.log("Success:", response.ok);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    postJSON(topic);

    setTopics((prevTopics) => {
      // Find the index of the topic to be updated
      const index = prevTopics.findIndex((t) => t.id === topic.id);
      if (index === -1) {
        // Topic not found, return previous state
        return prevTopics;
      }

      // Create a new array with the updated topic at the same index
      const updatedTopics = [...prevTopics];
      updatedTopics[index] = topic;
      return updatedTopics;
    });
  }

  function handleCloseAddTopic() {
    setShowAddTopic((showAddTopic) => !setShowAddTopic);
  }

  return (
    <>
      <div className="topic-list-main">
        <h1>Topics</h1>
        <Button onClickHandler={() => setShowAddTopic((s) => !s)}>
          Add Topic
        </Button>
        {showAddTopic ? (
          <NewObjectModal
            handleAdd={handleAdd}
            btnText="Add"
            handleCloseModal={handleCloseAddTopic}>
            Add a Topic
          </NewObjectModal>
        ) : null}
        <ul className="topic-list">
          {topics.map((topic) => (
            <Topic
              topic={topic}
              key={topic.id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
