import { db, storage } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  orderBy,
} from "@firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const collectionRef = collection(db, "restaurants");

export const fetchRestaurants = async (searchTerm = "dateCreated") => {
  const data = await getDocs(query(collectionRef, orderBy(searchTerm, "desc")));

  let cleanedNodes = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return cleanedNodes;
};

export const postRestaurant = async ({
  name,
  type,
  description,
  address,
  image,
}) => {
  if (Object.keys(image).length === 0) {
    const newRestaurant = {
      name,
      type,
      description,
      address,
      image: "",
      votes: 0,
      dateCreated: new Date(),
    };
    addDoc(collectionRef, newRestaurant);
    return;
  }
  var imgSerial = `restaurant/${image[0].name}` + v4();
  let imgRef = ref(storage, imgSerial);
  await uploadBytes(imgRef, image[0])
    .then(() => {
      getDownloadURL(imgRef)
        .then((url) => {
          const newRestaurant = {
            name,
            type,
            description,
            address,
            image: url,
            votes: 0,
            dateCreated: new Date(),
          };
          addDoc(collectionRef, newRestaurant);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const deleteRestaurant = async ({ id, image }) => {
  const docRef = doc(db, "restaurants", id);
  // Deletes Entry in Firestore DB
  await deleteDoc(docRef);

  // Deletes file in Cloud Storage
  if (image !== "") {
    let imgRef = ref(storage, image);
    deleteObject(imgRef)
      .then(() => {})
      .catch((error) => {});
  }
};

export const updateRestaurant = async ({ childCardInfo }) => {
  const { id } = childCardInfo;
  const docRef = doc(db, "restaurants", id);
  await updateDoc(docRef, { votes: (childCardInfo.votes += 1) });
};
