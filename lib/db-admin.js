import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import db from "./firebase";
import { compareDesc, parseISO } from "date-fns";

const feedbackDB = collection(db, "feedback");
const sitesDB = collection(db, "sites");

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await getDocs(
      query(feedbackDB, where("siteId", "==", siteId), where("status", "==", "active"))
    );
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (err) {
    return { err };
  }
}

export async function getSite(siteId) {
  try {
    const docRef = doc(sitesDB, siteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { site: docSnap.data() };
    } else {
      return { err: "No such document!" };
    }
  } catch (err) {
    return { err };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await getDocs(sitesDB);
    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (err) {
    return { err };
  }
}

export async function getUserSites(userId) {
  const snapshot = await getDocs(
    query(sitesDB, where("authorId", "==", userId))
  );
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}

export async function getAllFeedbackForSites(userId) {
  const { sites } = await getUserSites(userId);
  const siteIds = sites.map((site) => site.id);
  const snapshot = await getDocs(
    query(feedbackDB, where("siteId", "in", siteIds), where("status", "in", ["active", "pending"]))
  );
  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
