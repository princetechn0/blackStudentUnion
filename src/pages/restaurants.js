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
  const [filteredData, setFilteredData] = useState({});
  const [sorryText, setSorryText] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async (searchTerm = "dateCreated") => {
    const data = await getDocs(
      query(restaurantCollectionRef, orderBy(searchTerm, "desc"))
    );
    setNodes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setFilteredData(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

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

  const filterRunner = (nodesToFilter, filterTerm) => {
    let results = [];
    if (!(filterTerm === "Newest" || filterTerm === "Name")) {
      for (let i = 0; i < nodesToFilter.length; i++) {
        const element = nodesToFilter[i];
        let x;

        if (element.type) {
          x = element.type.includes(filterTerm);
        }

        if (x && !results.includes(element)) {
          results.push(element);
        }
      }
    } else {
      results = [...nodesToFilter].sort((a, b) => {
        let toFilter = filterTerm;
        switch (filterTerm) {
          case "Newest":
            toFilter = "dateCreated";
            break;
          case "Name":
            toFilter = "name";
            break;
          default:
            break;
        }

        var keyA = a[toFilter.toLowerCase()];
        var keyB = b[toFilter.toLowerCase()];
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    }
    return results;
  };

  const filterCards = (filterTerm, activeFilters) => {
    let results = [];
    let undoFlag = false;
    let nodesToFilter =
      Object.keys(filteredData).length > 0 ? filteredData : nodes;

    if (sorryText) {
      nodesToFilter = filteredData;
    }

    if (!activeFilters.includes(filterTerm)) {
      undoFlag = true;
      nodesToFilter = nodes;
    } else {
      undoFlag = false;
    }

    if (activeFilters.length !== 0 && !undoFlag) {
      results = filterRunner(nodesToFilter, filterTerm);
    }

    if (undoFlag) {
      activeFilters.forEach((y) => {
        results = filterRunner(nodesToFilter, y);
      });
    }

    setFilteredData(results);
    results.length > 0 ? setSorryText(false) : setSorryText(true);

    if (activeFilters.length === 0) {
      clearFilter();
    }
  };

  const clearFilter = () => {
    setFilteredData(nodes);
    setSorryText(false);
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
              filterCardsFunc={filterCards}
              clearFilterFunc={clearFilter}
              types={nodes.map((doc) => doc.type).filter((x) => x !== "")}
            ></FilterBar>
          )}

          {Object.keys(filteredData).length > 0 && !sorryText ? (
            <Cards
              cards={filteredData}
              onDelete={deleteRestaurant}
              type={"restaurant"}
            ></Cards>
          ) : (
            <h4 className="text-center ">Sorry, no matches! </h4>
          )}
        </div>
      )}
    </main>
  );
};

export default Restaurants;
