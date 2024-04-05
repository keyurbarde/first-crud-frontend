import Course from "./Course";

export default CourseList;

function CourseList({ courses, handleDelete, handleUpdate }) {
  return (
    <ul className="course-list">
      {courses.map((course) => (
        <Course
          course={course}
          key={course.id}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </ul>
  );
}
