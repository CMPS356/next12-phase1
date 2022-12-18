import { getMessages, createMessage } from '../../../repo/messages-repo'

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
      const messages =  getMessages();
      return res.status(200).json(messages);
    }
  
    function create() {
      try {
        console.log("messages in repo" + JSON.stringify(req.body))
        createMessage(req.body);
        return res.status(200).json({ message: "success"});
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
  }