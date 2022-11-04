import React, { useEffect, useState } from "react";
import "../stylesheets/beauty.css";
import Cards from "../components/cards";
import { db } from "../firebase-config";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from "@firebase/firestore";
import { storage } from "../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import ModalPopup from "../components/modal";
import BeautyForm from "../components/beautyForm";

const Beauty = () => {
  const [nodes, setNodes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const beautyCollectionRef = collection(db, "beauty");

  useEffect(() => {
    fetchBeautyListings();
  }, []);

  const fetchBeautyListings = async () => {
    const data = await getDocs(
      query(beautyCollectionRef, orderBy("dateCreated", "asc"))
    );

    setNodes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const postBeautyListing = async (inputData) => {
    const { name, category, type, description, address, image } = inputData;
    if (Object.keys(image).length === 0) {
      const newBeautyListing = {
        name,
        category,
        type,
        description,
        address,
        image: "",
        dateCreated: new Date(),
      };
      addDoc(beautyCollectionRef, newBeautyListing);
      fetchBeautyListings();
      return;
    }
    var imgSerial = `beauty/${image[0].name}` + v4();
    let imgRef = ref(storage, imgSerial);
    await uploadBytes(imgRef, image[0])
      .then(() => {
        getDownloadURL(imgRef)
          .then((url) => {
            const newBeautyListing = {
              name,
              category,
              type,
              description,
              address,
              image: url,
              dateCreated: new Date(),
            };
            addDoc(beautyCollectionRef, newBeautyListing);
            fetchBeautyListings();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const deleteBeautyListing = async (childCardInfo) => {
    const { id, image } = childCardInfo;
    const docRef = doc(db, "beauty", id);
    // Deletes Entry in Firestore DB
    await deleteDoc(docRef);

    // Deletes file in Cloud Storage
    if (image !== "") {
      let imgRef = ref(storage, image);
      deleteObject(imgRef)
        .then(() => {})
        .catch((error) => {});
    }

    fetchBeautyListings();
  };

  return (
    <main>
      <div className="pb-4">
        <h1 className="headerBarber">Beauty</h1>
        <ModalPopup onSubmit={postBeautyListing}>
          <BeautyForm />
        </ModalPopup>
      </div>

      {!isLoading && (
        <Cards
          cards={nodes}
          onDelete={deleteBeautyListing}
          type={"restaurant"}
        ></Cards>
      )}
    </main>
  );
};

export default Beauty;
