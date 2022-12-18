export function formValidation(parent, student, setErrors) {
    let flag = false;

    if (parent.firstName == "") {
      setErrors((prev) => ({
        ...prev,
        firstNameParent: { ...prev.firstNameParent, isEmpty: true },
      }));
      flag = true;
    }

    if (parent.lastName == "") {
      setErrors((prev) => ({
        ...prev,
        lastNameParent: { ...prev.lastNameParent, isEmpty: true },
      }));
      flag = true;
    }

    if (parent.qatariId == "" || !parent.qatariId) {
      setErrors((prev) => ({
        ...prev,
        qatariId: { ...prev.qatariId, isEmpty: true },
      }));
      flag = true;
    }

    if (parent.mobile == "" || !parent.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: { ...prev.mobile, isEmpty: true },
      }));
      flag = true;
    }

    if (parent.email == "") {
      setErrors((prev) => ({
        ...prev,
        email: { ...prev.email, isEmpty: true },
      }));
      flag = true;
    }

    if (parent.username == "") {
      setErrors((prev) => ({
        ...prev,
        username: { ...prev.username, isEmpty: true },
      }));
      flag = true;
    }

    if (parent.password == "") {
      setErrors((prev) => ({
        ...prev,
        password: { ...prev.password, isEmpty: true },
      }));
      flag = true;
    }

    let flag2 = studentValidation(student, setErrors);
    return flag || flag2
  }


export function studentValidation(student, setErrors) {
    let flag = false;

    if (student.firstName == "") {
      setErrors((prev) => ({
        ...prev,
        firstName: { ...prev.firstName, isEmpty: true },
      }));
      flag = true;
    }

    if (student.lastName == "") {
      setErrors((prev) => ({
        ...prev,
        lastName: { ...prev.lastName, isEmpty: true },
      }));
      flag = true;
    }

    if (student.studentId == "" || !student.studentId) {
      setErrors((prev) => ({
        ...prev,
        studentId: { ...prev.studentId, isEmpty: true },
      }));
      flag = true;
    }

    if (student.dob == "") {
      setErrors((prev) => ({
        ...prev,
        dob: { ...prev.dob, isEmpty: true },
      }));
      flag = true;
    }

    if (student.schoolGrade == "" || !student.schoolGrade) {
      setErrors((prev) => ({
        ...prev,
        schoolGrade: { ...prev.schoolGrade, isEmpty: true },
      }));
      flag = true;
    }

    return flag;
  }