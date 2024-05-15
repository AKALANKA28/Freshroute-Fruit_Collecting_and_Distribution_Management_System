import React from "react";

const Grades = ({ gradeData, setGrade }) => {
  console.log("gradeData in Grades component:", gradeData); // Logging gradeData here

  return (
    <>
      <ul className="grade ps-0 mb-0 gap-5">
        {gradeData &&
          gradeData.map((grade) => {
            console.log(grade.title); // Logging grade title to check each title

            return (
              <li
                onClick={() => setGrade(grade?._id)}
                key={grade?._id}
                style={{ fruitGrade: `${grade?.title}` }}
              >
                {grade.title} {/* Accessing the grade title here */}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Grades;
