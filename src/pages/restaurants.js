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
  updateDoc,
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
  const [nodes, setNodes] = useState();
  const [isLoading, setLoading] = useState(true);
  const restaurantCollectionRef = collection(db, "restaurants");
  const [filteredData, setFilteredData] = useState();
  const [sorryText, setSorryText] = useState(false);
  const [filters, setFilters] = useState();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async (searchTerm = "dateCreated") => {
    // setLoading(true);
    const data = await getDocs(
      query(restaurantCollectionRef, orderBy(searchTerm, "desc"))
    );

    let cleanedNodes = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setNodes(cleanedNodes);
    setFilteredData(cleanedNodes);

    setFilters([
      ...new Set(cleanedNodes.map((doc) => doc.type).filter((x) => x !== "")),
    ]);

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
        votes: 0,
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
              votes: 0,
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
    if (
      !(
        filterTerm === "Newest" ||
        filterTerm === "Name" ||
        filterTerm === "Most Popular"
      )
    ) {
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
        let ascending = true;
        let toFilter = filterTerm;
        switch (filterTerm) {
          case "Newest":
            toFilter = "dateCreated";
            ascending = true;
            break;
          case "Name":
            toFilter = "name";
            ascending = true;
            break;
          case "Most Popular":
            toFilter = "votes";
            ascending = false;
            break;
          default:
            break;
        }

        var keyA = a[toFilter.toLowerCase()];
        var keyB = b[toFilter.toLowerCase()];
        if (keyA < keyB && ascending) {
          return -1;
        }
        if (keyA < keyB && !ascending) {
          return 1;
        }
        if (keyA > keyB && ascending) {
          return 1;
        }
        if (keyA > keyB && !ascending) {
          return -1;
        }
        return 0;
      });
    }
    return results;
  };

  const voteBeautyListing = async (childCardInfo) => {
    const { id } = childCardInfo;
    const docRef = doc(db, "restaurants", id);
    await updateDoc(docRef, { votes: (childCardInfo.votes += 1) });
    fetchRestaurants();
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
          {Object.keys(nodes).length > 0 && (
            <FilterBar
              filterCardsFunc={filterCards}
              clearFilterFunc={clearFilter}
              types={filters}
            ></FilterBar>
          )}

          {Object.keys(filteredData).length > 0 && !sorryText ? (
            <Cards
              cards={filteredData}
              onVote={voteBeautyListing}
              onDelete={deleteRestaurant}
              type={"restaurant"}
            ></Cards>
          ) : (
            <h4 className="text-center pt-5 ">Sorry, no restaurants! </h4>
          )}
        </div>
      )}
    </main>
  );
};

export default Restaurants;
