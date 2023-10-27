import React, {useState, Fragment} from 'react';
import axios from "axios";
import InputLabel from "../InputLabel";
import FormError from "../FormError";
import {
    checkLength,
    checkTitle,
    checkPresent,
    checkDesc,
    checkImage
} from "../../functions/validation";
import Overlay from "../Overlay";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import LoadingText from "../LoadingText";
export default function AdminCreateForm() {
    const [newPainting, setNewPainting] = useState({
        name: '',
        completed: '',
        width: 1,
        height: 1,
        pricetag: 1,
        description: '',
        image: ''
    });
    function handleChange(event) {
        setNewPainting({
            ...newPainting,
            [event.target.name]: event.target.value
        });
    }

    function handleImageChange(event) {
        setNewPainting({
            ...newPainting,
            image: event.target.files[0]
        });
    }

    function handleDescChange(event) {
        setNewPainting({
            ...newPainting,
            description: event.target.value
        });
    }
    async function handleSubmit(event) {
        event.preventDefault();
        //error checking
        let errorMsg = "";
        errorMsg += checkTitle(newPainting.name, "Painting's name");
        errorMsg += checkPresent(newPainting.completed, "Painting's completion date")
        errorMsg += checkLength(newPainting.width, "Width");
        errorMsg += checkLength(newPainting.height, "Height");
        errorMsg += checkPresent(newPainting.pricetag, "Price");
        errorMsg += checkDesc(newPainting.description, "Painting's description");
        errorMsg += checkImage(newPainting.image, "Painting's image");
        if (errorMsg.length > 0) {
            document.getElementById("formErrorsContainer").classList.remove("hidden");
            document.getElementById("formErrors").innerHTML = errorMsg;
        }
        else {
                document.getElementById("requestLoading").classList.remove("hidden");
                const newPaintingFormData = new FormData();

                newPaintingFormData.append("name", newPainting.name);
                newPaintingFormData.append("completed", newPainting.completed);
                newPaintingFormData.append("width", newPainting.width);
                newPaintingFormData.append("height", newPainting.height);
                newPaintingFormData.append("pricetag", newPainting.pricetag);
                newPaintingFormData.append("description", newPainting.description);
                newPaintingFormData.append("image", newPainting.image);

                axios({
                    method: "post",
                    url: "https://devweb2023.cis.strath.ac.uk/~xqb21129/aelscuaklrwpsud/server/addpainting.php",
                    headers: {"content-type": "multipart/form-data"},
                    data: newPaintingFormData
                }).then(function() {
                    document.getElementById("requestLoading").classList.add("hidden");
                    document.getElementById("requestSuccess").classList.remove("hidden");
                }).catch(function() {
                    document.getElementById("requestLoading").classList.add("hidden");
                    document.getElementById("requestError").classList.remove("hidden");
                });
        }

    }

      return (
          <Fragment>
              <div id="requestError" className="hidden">
                  <Overlay content ={
                      <ErrorMessage message={"Couldn't add painting to the database"} isAdmin={true} />
                  }/>
              </div>

              <div id="requestSuccess" className="hidden">
                  <Overlay content ={
                      <SuccessMessage message="Painting has been submitted" isAdmin={true}/>
                  }/>
              </div>

              <div id="requestLoading" className="hidden">
                  <Overlay content ={
                      <LoadingText loadMsg="ADDING PAINTING..." />
                  }/>
              </div>

              <div>
                  <form onSubmit={handleSubmit} className="bg-stone-100 p-5">
                      <div className="hidden" id="formErrorsContainer">
                          <FormError />
                      </div>
                      <div className="flex flex-col ml-44 lg:flex-row lg:ml-0">
                          <div className="lg:grow">
                              <label>
                                  <InputLabel label="Name"/>
                                  <span className="input-field">
                               <input
                                   type="text"
                                   name="name"
                                   value={newPainting.name}
                                   onChange={handleChange}
                                   className="block mx-12 my-1 w-full
                                                        border-0 outline-none focus:ring-0
                                                        font-body text-l lg:text-xl
                                                        bg-transparent
                                                        -translate-y-5 translate-x-1
                                                        "
                                   placeholder="ARTWORK TITLE"
                                   size="30"
                               />
                           </span>
                              </label>
                              <label>
                                  <InputLabel label="Date of Completion"/>
                                  <span className="input-field">
                               <input
                                   type="date"
                                   name="completed"
                                   value={newPainting.completed}
                                   onChange={handleChange}
                                   className="block mx-12 my-1 w-full
                                                            border-0 outline-none focus:ring-0
                                                            font-body text-l lg:text-xl
                                                            bg-transparent
                                                            -translate-y-5 translate-x-1
                                                            "
                                   placeholder="COMPLETED ON"
                               />
                            </span>
                              </label>
                              <label>
                                  <InputLabel label="Width (mm)"/>
                                  <span className="input-field">
                               <input
                                   type="number"
                                   name="width"
                                   value={newPainting.width}
                                   onChange={handleChange}
                                   className="block mx-12 my-1 w-full
                                                                border-0 outline-none focus:ring-0
                                                                font-body text-l lg:text-xl
                                                                bg-transparent
                                                                -translate-y-5 translate-x-1
                                                                "
                                   min="1.00"
                                   step="0.01"
                               />
                           </span>
                              </label>
                              <label>
                                  <InputLabel label="Height (mm)"/>
                                  <span className="input-field">
                               <input
                                   type="number"
                                   name="height"
                                   value={newPainting.height}
                                   onChange={handleChange}
                                   className="block mx-12 my-1 w-full
                                                                border-0 outline-none focus:ring-0
                                                                font-body text-l lg:text-xl
                                                                bg-transparent
                                                                -translate-y-5 translate-x-1
                                                                "
                                   min="1.00"
                                   step="0.01"
                               />
                           </span>
                              </label>
                          </div>
                          <div className="lg:mx-16">
                              <label>
                                  <InputLabel label="Price"/>
                                  <span className="input-field">
                               <input
                                   type="number"
                                   name="pricetag"
                                   value={newPainting.pricetag}
                                   onChange={handleChange}
                                   className="block mx-12 my-1 w-full
                                                                    border-0 outline-none focus:ring-0
                                                                    font-body text-l lg:text-xl
                                                                    bg-transparent
                                                                    -translate-y-5 translate-x-1
                                                                    "
                                   min="1.00"
                                   step="0.01"
                               />
                       </span>
                              </label>
                              <label>
                                  <InputLabel label="Description"/>
                                  <span className="input-field">
                           <textarea
                               name="desc"
                               value={newPainting.description}
                               onChange={handleDescChange}
                               rows="4"
                               className="block mx-12 my-1 w-full
                                          border-0 outline-none focus:ring-0
                                          font-body text-m lg:text-l
                                          bg-transparent
                                          -translate-y-5 translate-x-1
                                          "
                               placeholder="DESCRIPTION OF ARTWORK"
                           />
                       </span>
                              </label>
                              <label>
                                  <InputLabel label="Image"/>
                                  <label htmlFor="image-upload">
                                      <div className="block mx-12 my-1 px-1 w-1/3
                                        font-display tracking-wide text-l text-center
                                        form-btn bg-stone-200
                                        -translate-y-5 translate-x-1">
                                          UPLOAD
                                      </div>
                                      <input
                                          type="file"
                                          name="image"
                                          onChange={handleImageChange}
                                          id="image-upload"
                                          className="invisible"
                                      />
                                  </label>
                              </label>

                              <button type="submit"
                                      className="font-display tracking-wide
                                    form-btn bg-stone-200
                                    scale-150
                                    p-1 mt-12"
                              >submit
                              </button>
                          </div>
                      </div>
                  </form>
              </div>
          </Fragment>

    );
}