"use client";
import {useEffect} from "react";

export default function LanguageHtmlHandler() {
 useEffect(() => {
  const lang = localStorage.getItem("lang") || "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
 }, []);

 return null;
}
