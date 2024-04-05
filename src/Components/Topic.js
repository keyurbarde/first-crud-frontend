import { useEffect, useState } from "react";
import Button from "./Button";
import NewObjectModal from "./NewObjectModal";
import CourseList from "./CourseList";

export default Topic;

function Topic({ topic, handleDelete, handleUpdate }) {
  const [courses, setCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [showUpdateTopicModal, setShowUpdateTopicModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  useEffect(
    function getAllCourses() {
      async function getAllCourses() {
        const res = await fetch(
          `http://127.0.0.1:8080/topics/${topic.id}/courses`
        );
        const data = await res.json();
        console.log(data);
        setCourses(data);
      }
      getAllCourses();
    },
    [topic.id]
  );

  function handleCourseUpdate(course) {
    async function postJSON(course) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/topics/${topic.id}/courses/${course.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
          }
        );

        console.log("Success:", response.ok);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    postJSON(course);

    setCourses((prevCourses) => {
      // Find the index of the topic to be updated
      const index = prevCourses.findIndex((c) => c.id === course.id);
      if (index === -1) {
        // Topic not found, return previous state
        return prevCourses;
      }

      // Create a new array with the updated topic at the same index
      const updatedCourses = [...prevCourses];
      updatedCourses[index] = course;
      return updatedCourses;
    });
  }

  function handleCourseDelete(id) {
    async function postJSON(id) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/topics/${topic.id}/courses/${id}`,
          {
            method: "DELETE",
          }
        );

        console.log("Success:", response.ok);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    postJSON(id);

    setCourses(courses.filter((course) => course.id !== id));
  }

  function handleCourseAdd(course) {
    async function postJSON(course) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/topics/${topic.id}/courses`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
          }
        );

        console.log("Success:", response.ok);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setCourses([...courses, course]);
    postJSON(course);
  }

  function handleCloseAddCourse() {
    setShowAddCourseModal((showAddCourseModal) => !showAddCourseModal);
  }
  function handleCloseUpdateTopic() {
    setShowUpdateTopicModal((showUpdateTopicModal) => !showUpdateTopicModal);
  }

  return (
    <li>
      <div className="topic">
        <div className="content">
          <span className="topic-id-box">
            <h2 className="topic-id">{topic.id}</h2>
          </span>
          <h3 className="topic-name">{topic.name}</h3>
          <p className="topic-desc">{topic.description}</p>
        </div>
        <div className="topic-btns">
          <Button
            customColor="#ff3333"
            onClickHandler={() => handleDelete(topic.id)}>
            Delete
          </Button>
          <Button
            onClickHandler={() => {
              setShowUpdateTopicModal((value) => !value);
              if (showAddCourseModal) setShowAddCourseModal(false);
            }}>
            Update
          </Button>
          {courses.length > 0 && (
            <Button
              onClickHandler={() =>
                setShowCourses((showCourses) => !showCourses)
              }>
              Show Courses
            </Button>
          )}
          <Button
            onClickHandler={() => {
              setShowAddCourseModal((value) => !value);
              if (showUpdateTopicModal) setShowUpdateTopicModal(false);
            }}>
            Add Course
          </Button>
        </div>
      </div>

      {showUpdateTopicModal && (
        <>
          <NewObjectModal
            className="update-modal"
            handleAdd={handleUpdate}
            placeId={topic.id}
            btnText="Update"
            handleCloseModal={handleCloseUpdateTopic}>
            Update Topic
          </NewObjectModal>
        </>
      )}

      {showAddCourseModal && (
        <>
          <NewObjectModal
            className="update-modal"
            handleAdd={handleCourseAdd}
            handleCloseModal={handleCloseAddCourse}
            btnText="Add">
            Add Course
          </NewObjectModal>
        </>
      )}

      <div className="courses">
        {showCourses ? (
          <CourseList
            courses={courses}
            handleDelete={handleCourseDelete}
            handleUpdate={handleCourseUpdate}
          />
        ) : null}
      </div>
    </li>
  );
}
