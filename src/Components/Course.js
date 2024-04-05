import { useState } from "react";
import NewObjectModal from "./NewObjectModal";
import Button from "./Button";

export default Course;

function Course({ course, handleDelete, handleUpdate }) {
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);

  function handleCloseUpdateCourse() {
    setShowUpdateCourseModal((value) => !value);
  }

  return (
    <>
      <li className="topic course">
        <div className="content">
          <span className="topic-id-box course-id-box">
            <h2 className="topic-id">{course.id}</h2>
          </span>
          <h3 className="topic-name">{course.name}</h3>
          <p className="topic-desc">{course.description}</p>
        </div>
        <div className="topic-btns">
          <Button
            customColor="#ff3333"
            onClickHandler={() => handleDelete(course.id)}>
            Delete
          </Button>
          <Button
            onClickHandler={() => setShowUpdateCourseModal((value) => !value)}>
            Update
          </Button>
        </div>
      </li>
      {showUpdateCourseModal && (
        <>
          <NewObjectModal
            className="update-modal"
            handleAdd={handleUpdate}
            placeId={course.id}
            btnText="Update"
            handleCloseModal={handleCloseUpdateCourse}>
            Update Topic
          </NewObjectModal>
        </>
      )}
    </>
  );
}
