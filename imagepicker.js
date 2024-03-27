"use client";
import { useRef, useState } from "react";
import classes from "./imagepicker.module.css";
import Image from "next/image";
export default function Imagepicker({ label, name }) {
  const [pickedimage,setpickedimage]=useState();
  const imageinputref = useRef();
  function handler() {
    imageinputref.current.click();
  }
  function handlechangeimage(event){
    const file=event.target.files[0];
if(!file){
  setpickedimage(null)
  return;
}
const fileReader=new FileReader();
fileReader.onload=()=>{
  setpickedimage(fileReader.result);
};
fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedimage && <p>image not picked yet</p>}
{pickedimage && <Image src={pickedimage} alt="image selected by user" fill/>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png,image/jpeg"
          name={name}
          ref={imageinputref}
          onChange={handlechangeimage}
          required
        />
        <button className={classes.button} onClick={handler} type="button">
          Pick an image
        </button>
      </div>
    </div>
  );
}
