"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import dndimage from "../public/static/images/image.svg";
import Link from "next/link";

export default function HomePage() {
  const [file, setFile] = useState("");
  const [error, setError] = useState(false);
  const [whileUpload, setWhileUpload] = useState(0);
  const [urlImg, setUrlImg] = useState("");
  const [copy, setCopy] = useState("");

  //button upload
  const uploadHandler = async (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    setWhileUpload(1);

    const formdatos = new FormData();
    formdatos.append("file", file);
    try {
      const url_api = "http://localhost:3000/api/upload"
      
      const data = new FormData();
      data.set("file", file);


      const res = await fetch(url_api, {
        method: "POST",
        body: data,
      });

      const datos = await res.json();

      sessionStorage.setItem("url_key", datos.url);

      const url_image = sessionStorage.getItem("url_key");
      setUrlImg(url_image!);
      setCopy(url_image!);

      //upload complete state
      setTimeout(() => {
        setWhileUpload(2);
      }, 5000);

      setTimeout(() => {
        sessionStorage.clear();
        whileUpload == 2 ? setUrlImg("") : "";
      }, 5500);
    } catch (e: any) {
      // Handle errors here
      setError(true);
      setWhileUpload(0);

      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  //drag and drop
  const dragDefault = (e: any) => {
    e.preventDefault();
  };

  const fileDrop = async (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    setWhileUpload(1);

    try {

      const url_api = "http://localhost:3000/api/upload"

      const data = new FormData();
      data.set("file", file);

      const res = await fetch(url_api, {
        method: "POST",
        body: data,
      });
      const datos = await res.json();

      sessionStorage.setItem("url_key", datos.url);

      const url_image = sessionStorage.getItem("url_key");
      setUrlImg(url_image!);
      setCopy(url_image!);

      //upload complete state
      setTimeout(() => {
        setWhileUpload(2);
      }, 5000);

      setTimeout(() => {
        sessionStorage.clear();
        whileUpload == 2 ? setUrlImg("") : "";
      }, 5500);

    } catch (e: any) {
      // Handle errors here
      setError(true);
      setWhileUpload(0);

      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  return (
    <>
      {whileUpload == 0 ? (
        <div className="w-full relative h-screen flex justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-y-7 border md:w-[32rem] w-[22rem] md:h-[37rem] h-[25rem] rounded-2xl shadow-lg">
            <div className="flex flex-col gap-y-5 items-center pointer-events-none">
              <p className="font-bold text-[25px] text-gray-600">
                Sube tu imagen
              </p>
              <p className="text-gray-500 text-[14px]">
                Los archivos deberian ser jpeg, pjg, png...
              </p>
            </div>
            <div className="md:block hidden">
              <div
                onDragOver={dragDefault}
                onDragEnter={dragDefault}
                onDragLeave={dragDefault}
                onDrop={fileDrop}
                className="flex flex-col justify-center items-center gap-y-5 font-medium text-gray-400/80 bg-bgdnd rounded-3xl border-dashed border-2 border-borderdnd hover:bg-blue-300/30 transition-all duration-300 w-[27rem] h-[18rem]"
              >
                <Image
                  className="pointer-events-none"
                  src={dndimage}
                  alt="dndimage"
                  height={150}
                  width={150}
                  priority
                />
                <div className="text-[20px] pointer-events-none">
                  Arrastra y suelta tu imagen aqui
                </div>
              </div>
            </div>

            <p className="md:block hidden text-gray-500/70 font-bold pointer-events-none">O</p>

            <form>
              <input
                onChange={uploadHandler}
                type="file"
                className="block text-sm text-gray-500
            file:mr-4 file:py-3 file:px-4
            file:rounded-xl file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-500 file:text-white
            hover:file:bg-blue-600 w-[170px]
            file:transition-all file:duration-300"
              />
            </form>
          </div>

          {error && (
            <div className="absolute left-7 top-7 mb-4 flex w-[18.5rem] max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              </div>
              <div className="ml-4 text-sm font-normal">
                Solo archivos formato imagen.
              </div>
            </div>
          )}

          <div className="flex gap-x-1 absolute bottom-4 text-gray-400">
            <div>Creador por</div>
            <Link className="font-bold underline" href="https://github.com/ferlaxi" target="_blank"> Fernando Laxi</Link>
          </div>
        </div>
      ) : whileUpload == 1 ? (
        <div className="w-full relative h-screen flex justify-center items-center">
          <div className="flex flex-col items-start justify-center gap-y-5 border md:w-[32rem] w-[22rem] h-[10rem] rounded-2xl shadow-lg">
            <p className="font-bold text-[20px] text-gray-500 ml-8">
              Subiendo...
            </p>
            <div className="md:w-[28rem] w-[18rem] h-2 bg-grayupload rounded-full ml-8 overflow-hidden">
              <motion.div
                initial={{ x: -10 }}
                animate={{ x: 490 }}
                transition={{ duration: 14 }}
                className="w-[5rem] h-2 rounded-full bg-blueupload"
              ></motion.div>
            </div>
          </div>

          <div className="flex gap-x-1 absolute bottom-4 text-gray-400">
            <div>Creador por</div>
            <Link className="font-bold underline" href="https://github.com/ferlaxi" target="_blank"> Fernando Laxi</Link>
          </div>
        </div>
      ) : whileUpload == 2 ? (
        <div className="w-full relative h-screen flex justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-y-7 border md:w-[32rem] w-[22rem] h-[37rem] rounded-2xl shadow-lg">
            <div className="flex flex-col gap-y-5 items-center pointer-events-none">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-uploadOk">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="font-bold text-[25px] text-gray-600">
                Subida Exitosamente!
              </p>
            </div>

            <div>
              <div className="relative flex flex-col justify-center items-center border rounded-3xl md:w-[27rem] w-[19rem] h-[18rem] bg-image object-cover">
                <Image
                  className="rounded-3xl"
                  src={urlImg}
                  alt="imgUploaded"
                  fill
                />
              </div>
            </div>

            <div className="border-2 rounded-lg ">
              <input className="border-none md:w-[21rem] rounded-lg focus:ring-0 text-[12px] bg-bgdnd" readOnly type="text" value={urlImg} />
              <button onClick={() => navigator.clipboard.writeText(copy)} className="bg-blueupload text-white rounded-lg py-2.5 px-5 text-[15px] hover:bg-blue-600 transition-all duration-300">Copiar</button>
            </div>
          </div>

          <div className="flex gap-x-1 absolute bottom-4 text-gray-400">
            <div>Creador por</div>
            <Link className="font-bold underline" href="https://github.com/ferlaxi" target="_blank"> Fernando Laxi</Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
