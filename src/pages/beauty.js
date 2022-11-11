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
import FilterBar from "../components/filterBar";

const Beauty = () => {
  const [nodes, setNodes] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isFiltered, setFilteredStatus] = useState(false);
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

  const filterCards = (filterTerm) => {
    let sorted = [];
    let nodesToFilter = filteredData.length > 0 ? filteredData : nodes;

    if (!(filterTerm === "Newest" || filterTerm === "Name")) {
      for (let i = 0; i < nodesToFilter.length; i++) {
        const element = nodesToFilter[i];
        let x;

        if (element.type) {
          x = element.type.includes(filterTerm);
        }

        if (!x && element.category) {
          x = element.category.includes(filterTerm);
        }

        if (x) {
          sorted.push(element);
        }
      }
    } else {
      sorted = [...nodesToFilter].sort((a, b) => {
        var keyA = a[filterTerm.toLowerCase()];
        var keyB = b[filterTerm.toLowerCase()];
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    }

    setFilteredData(sorted);
    if (filteredData) {
      setFilteredStatus(true);
    }
  };

  const clearFilter = () => {
    setFilteredData({});
    setFilteredStatus(false);
  };

  return (
    <main>
      <div className="pb-4">
        <h1 className="headerBarber">Beauty</h1>
        <ModalPopup onSubmit={postBeautyListing}>
          <BeautyForm categories={categories} types={types} />
        </ModalPopup>
      </div>

      {!isLoading && (
        <div>
          {nodes && (
            <FilterBar
              filterCardsFunc={filterCards}
              clearFilterFunc={clearFilter}
              isFiltered={isFiltered}
              categories={categories}
              types={types}
            ></FilterBar>
          )}
          <Cards
            cards={filteredData.length > 0 ? filteredData : nodes}
            onDelete={deleteBeautyListing}
            type={"restaurant"}
          ></Cards>
        </div>
      )}
    </main>
  );
};

export default Beauty;
