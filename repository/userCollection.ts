import { db } from "../core/app";

const createUser = async (userData: {
    username: string;
    email: string;
    uid: string;
}) => {
  try {
    const userRef = db.collection('users').doc();
    await userRef.set(userData);
    return { id: userRef.id, ...userData };
  } catch (error) {
    throw error;
  }
};

const findUser = async (uid: string) => {
  try {
    const querySnapshot = await db.collection('users').where('uid', '==', uid).get();
    if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
        return null;
    }
  } catch (error) {
      throw error;
  }
};

const updateUserById = async (userId: string, userData: Partial<{ username: string; address: string;}>) => {
  try {
    const user = (await findUser(userId))?.[0];
    
    if (user) {
      const userRef = db.collection('users').doc(user?.id || "");
      await userRef.update({ ...user, ...userData });
    } else {
      const userRef = db.collection('users').doc();
      await userRef.set({uid: userId, ...userData});
      return { id: userRef.id, ...userData };
    }
    return { ...user, ...userData };
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (userId: string) => {
  try {
    await db.collection('users').doc(userId).delete();
    return { id: userId };
  } catch (error) {
    throw error;
  }
};

export default { createUser, findUser, updateUserById, deleteUserById}