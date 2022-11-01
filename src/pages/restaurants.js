import React, { useEffect, useState } from "react";
import "../stylesheets/restaurants.css";
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
  getStorage,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import RestaurantForm from "../components/restaurantForm";
import { Button } from "react-bootstrap";
import ModalPopup from "../components/modal";

const Restaurants = () => {
  const [nodes, setNodes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const restaurantCollectionRef = collection(db, "restaurants");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const data = await getDocs(restaurantCollectionRef);
    setNodes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const postRestaurant = async (inputData) => {
    const { name, type, description, address, image } = inputData;
    if (Object.keys(image).length === 0) {
      const newRestaurant = {
        name,
        type,
        description,
        address,
        image: "",
      };
      addDoc(restaurantCollectionRef, newRestaurant);
      fetchRestaurants();
      return;
    }
    var imgSerial = `restaurant/${image[0].name}` + v4();
    let imgRef = ref(storage, imgSerial);
    setLoading(true);
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
            };
            addDoc(restaurantCollectionRef, newRestaurant);
            fetchRestaurants();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const deleteRestaurant = async (childCardInfo) => {
    const { id, image } = childCardInfo;
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

    fetchRestaurants();
  };

  return (
    <main>
      <div className="pb-4">
        <h1 className="header">Restaurants</h1>
        <ModalPopup onSubmit={postRestaurant}>
          <RestaurantForm />
        </ModalPopup>
      </div>

      {!isLoading && (
        <Cards
          cards={nodes}
          onDelete={deleteRestaurant}
          type={"restaurant"}
        ></Cards>
      )}
    </main>
  );
};

export default Restaurants;
