import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";

export const moveEntry = functions.https.onRequest(async (req, res) => {
  const collection = await firestore.collection("entries");
  const documentRef = collection.doc(req.body.currentId);
  const document = (await documentRef.get()).data();
  if (document) {
    const newDocumentRef = await collection.doc(req.body.newId);
    if (!(await newDocumentRef.get()).exists) {
      newDocumentRef.set(document);
      await documentRef.delete();
      res.status(200).end();
    } else {
      res.status(400).send(`Document already exists at ${req.body.newId}`);
    }
  }
  res.status(400).send(`Document not located at ${req.body.currentId}`);
});

export const migrate = functions.https.onRequest(async (req, res) => {
  const collection = await firestore.collection("entries");
  const entriesSnapshot = await collection.get();
  entriesSnapshot.forEach(async (entry) => {
    const data = entry.data();
    const fakeNewsInd = data.theme.indexOf("fakeNews");
    if (fakeNewsInd > -1 || data.icon === "fakeNews") {
      if (fakeNewsInd > -1) {
        data.theme[fakeNewsInd] = "reporting";
      }
      if (data.icon === "fakeNews") {
        delete data.icon;
        data.faIcon = "newspaper";
      }
      await collection.doc(entry.id).set(data);
    }
  });
});
