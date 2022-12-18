import { getAnnouncements, createAnnouncement } from '../../../repo/announcements-repo'

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
      const announcements =  getAnnouncements();
      return res.status(200).json(announcements);
    }
  
    function create() {
      try {
        console.log("announcements in repo" + JSON.stringify(req.body))
        createAnnouncement(req.body);
        return res.status(200).json({ message: "success"});
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
  }