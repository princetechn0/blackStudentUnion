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
import RestaurantForm from "../components/restaurantForm";
import ModalPopup from "../components/modal";
import FilterBar from "../components/filterBar";

const Restaurants = () => {
  const [nodes, setNodes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const restaurantCollectionRef = collection(db, "restaurants");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async (searchTerm = "dateCreated") => {
    const data = await getDocs(
      query(restaurantCollectionRef, orderBy(searchTerm, "desc"))
    );
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
        dateCreated: new Date(),
      };
      addDoc(restaurantCollectionRef, newRestaurant);
      fetchRestaurants();
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
              dateCreated: new Date(),
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

  const filterCards = (filterTerm) => {
    const sorted = [...nodes].sort((a, b) => {
      var keyA = a[filterTerm];
      var keyB = b[filterTerm];
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    setNodes(sorted);
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
        <div>
          {nodes && (
            <FilterBar
              filterCards={filterCards}
              filterTopics={nodes.map((doc) => doc.type)}
            ></FilterBar>
          )}

          <Cards
            cards={nodes}
            onDelete={deleteRestaurant}
            type={"restaurant"}
          ></Cards>
        </div>
      )}
    </main>
  );
};

export default Restaurants;
