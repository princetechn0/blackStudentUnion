import React, { useEffect, useState } from "react";
import "../stylesheets/beauty.css";
import Cards from "../components/cards";
import { db } from "../firebase-config";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
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
import FilterBar from "../components/filterBar";

const Beauty = () => {
  const [nodes, setNodes] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [sorryText, setSorryText] = useState(false);
  const beautyCollectionRef = collection(db, "beauty");

  const categories = [
    "Barbershop",
    "Hair Salon",
    "Nail Salon",
    "Tattoo Parlor",
  ];
  const types = ["Men", "Women"];

  useEffect(() => {
    fetchBeautyListings();
  }, []);

  const fetchBeautyListings = async () => {
    const data = await getDocs(
      query(beautyCollectionRef, orderBy("dateCreated", "desc"))
    );

    setNodes(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

    setFilteredData(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

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
        votes: 0,
        dateCreated: Timestamp.now(),
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
              votes: 0,
              dateCreated: Timestamp.now(),
            };
            addDoc(beautyCollectionRef, newBeautyListing);
            fetchBeautyListings();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
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

        if (!x && element.category) {
          x = element.category.includes(filterTerm);
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

  const voteBeautyListing = async (childCardInfo) => {
    const { id } = childCardInfo;
    const docRef = doc(db, "beauty", id);
    await updateDoc(docRef, { votes: (childCardInfo.votes += 1) });
    fetchBeautyListings();
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
        <h1 className="header">Beauty</h1>
        <ModalPopup onSubmit={postBeautyListing}>
          <BeautyForm categories={categories} types={types} />
        </ModalPopup>
      </div>

      {!isLoading && (
        <div>
          {nodes.length > 0 && (
            <div>
              <FilterBar
                filterCardsFunc={filterCards}
                clearFilterFunc={clearFilter}
                categories={categories}
                types={types}
              ></FilterBar>
            </div>
          )}
          {Object.keys(filteredData).length > 0 && !sorryText ? (
            <Cards
              cards={filteredData}
              onVote={voteBeautyListing}
              onDelete={deleteBeautyListing}
            ></Cards>
          ) : (
            <h4 className="text-center ">Sorry, no matches! </h4>
          )}
        </div>
      )}
    </main>
  );
};

export default Beauty;
