import { deleteMessage, getMessageById, updateMessage } from '../../../repo/messages-repo';

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
    const message = getMessageById(req.query.id);
    return res.status(200).json(message);
  }

  function update() {
    try {
      updateMessage(req.query.id, req.body);
      return res.status(200).json({ message: 'Updated Successfully!' });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function remove() {
    deleteMessage(req.query.id);
    return res.status(200).json({ message: 'Deleted Successfully!' });
  }
}
