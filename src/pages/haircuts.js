import React, { useEffect, useState } from "react";
import "../stylesheets/haircuts.css";
import Cards from "../components/cards";
import { db } from "../firebase-config";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
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
import HairForm from "../components/hairForm";

const Haircuts = () => {
  const [nodes, setNodes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const haircutCollectionRef = collection(db, "haircuts");

  useEffect(() => {
    fetchHaircuts();
  }, []);

  const fetchHaircuts = async () => {
    const data = await getDocs(haircutCollectionRef);
    setNodes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const postHaircut = async (inputData) => {
    const { name, type, description, address, image } = inputData;
    if (Object.keys(image).length === 0) {
      const newHaircut = {
        name,
        type,
        description,
        address,
        image: "",
      };
      addDoc(haircutCollectionRef, newHaircut);
      fetchHaircuts();
      return;
    }
    var imgSerial = `haircuts/${image[0].name}` + v4();
    let imgRef = ref(storage, imgSerial);
    setLoading(true);
    await uploadBytes(imgRef, image[0])
      .then(() => {
        getDownloadURL(imgRef)
          .then((url) => {
            const newHaircut = {
              name,
              type,
              description,
              address,
              image: url,
            };
            addDoc(haircutCollectionRef, newHaircut);
            fetchHaircuts();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const deleteHaircut = async (childCardInfo) => {
    const { id, image } = childCardInfo;
    const docRef = doc(db, "haircuts", id);
    // Deletes Entry in Firestore DB
    await deleteDoc(docRef);

    // Deletes file in Cloud Storage
    if (image !== "") {
      let imgRef = ref(storage, image);
      deleteObject(imgRef)
        .then(() => {})
        .catch((error) => {});
    }

    fetchHaircuts();
  };

  return (
    <main>
      <div className="pb-4">
        <h1 className="headerBarber">Beauty</h1>
        <ModalPopup onSubmit={postHaircut}>
          <HairForm />
        </ModalPopup>
      </div>

      {!isLoading && (
        <Cards
          cards={nodes}
          onDelete={deleteHaircut}
          type={"restaurant"}
        ></Cards>
      )}
    </main>
  );
};

export default Haircuts;
