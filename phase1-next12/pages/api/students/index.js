import { getStudents, createStudents } from '../../../repo/user-repo'

export default function handler(req, res) {
    switch (req.method) {
      case "GET":
        return get();
      case "POST":
        return create();
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  
     function get() {
      const users =  getStudents();
      return res.status(200).json(users);
    }
  
    function create() {
      try {
        console.log("users in repo" + JSON.stringify(req.body))
        createStudents(req.body);
        return res.status(200).json({ message: "success"});
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
  }