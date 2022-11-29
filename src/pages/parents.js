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

const Parents = () => {
  return (
    <main>
      <h1> Parents</h1>
    </main>
  );
};

export default Parents;
