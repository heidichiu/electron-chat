import db from "../db/firestore";

export const fetchChats = () => {
  return db
    .collection("chats")
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return data;
    });
};
