import { getTasksById, updateTask, deleteTask } from "../../../repo/tasks-repo"

// AddTask(task) - Teacher
// GetTaskOfTeacherStudents(teacherId) - Teacher
// DeleteTask(taskId) - Teacher
// UpdateTask(taskId, task) - Teacher

// GetTasks() - Coordinator
// GetTasksOfParentsChildren(parentId) - Parent

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getById();
    case "PUT":
      return update();
    case "DELETE":
      return remove();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getById() {
    const user = getStudentById(req.query.id);
    return res.status(200).json(user);
  }

  function update() {
    try {
      updateTask(req.query.id, req.body);
      return res.status(200).json({ message: 'Updated Successfully!' });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function remove() {
    deleteTask(req.query.id);
    return res.status(200).json({ message: 'Deleted Successfully!' });
  }
}
