import React from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddItem = () => {
  const { register, handleSubmit,reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    //IMG HOSTING 1
//    const formData = new FormData();
//    formData.append( 'image', data.image[0] );
//     const img_host_url=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
   
//     fetch(img_host_url,{
//         method:'POST',
//         body:formData
//     })
//     .then(res=>res.json())
//     .then(imgResponse=>{
//         console.log(imgResponse.data.display_url);
//     })

// IMG HOSTING 2
// const formData = new FormData();
// formData.append("image", data.image[0] );
//  axios.post(
//   `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//   formData
// )
// .then(imgResponse=>{
//     console.log(imgResponse.data.data.display_url);
// })


const imgFile = { image : data?.image[0]}
const img_host_url=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
axios.post(img_host_url,imgFile,{
    headers:{
        'content-type':'multipart/form-data'
    }
})
.then(res=>{
    if(res.data.success){
        const menuItem = {
            name : data?.name,
            price : parseFloat(data?.price),
            recipe : data?.recipe,
            image : res?.data?.data?.display_url,
            category : data.category
        }

        axiosSecure.post('/menu',menuItem)
        .then(menuRes=>{
            if(menuRes.data.insertedId){
                reset();
                toast.success(`${data?.name} is added successfully!`);
            }
        })
    }
})


};

  return (
    <div className="w-3/4 px-12 -mt-10">
      <SectionTitle
        heading={"Add an Item"}
        subHeading={"Do you want to add an item ? "}
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="-mt-2">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Recipe name*</span>
          </div>
          <input
            type="text"
            placeholder="recipe name"
            {...register("name")}
            className="input input-bordered w-full"
            required
          />
        </label>
        <div className="flex gap-6">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>

            <select
            defaultValue={'Default'}
              {...register("category")}
              required
              className="select select-bordered w-full "
            >
              <option disabled value={'Default'}>
                Choose one
              </option>
              <option value={"salad"}>salad</option>
              <option value={"pizza"}>pizza</option>
              <option value={"soup"}>soup</option>
              <option value={"dessert"}>dessert</option>
              <option value={"drinks"}>drinks</option>
              <option value={"desi"}>desi</option>
            </select>
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Price*</span>
            </div>
            <input
              type="number"
              required
              placeholder="price"
              {...register("price")}
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Recipe Details*</span>
          </div>
          <textarea
          required
           {...register("recipe")}
            className="textarea textarea-bordered w-full h-[150px]"
            placeholder="Details content here"
          ></textarea>
        </label>
        <div className="flex justify-between items-center gap-8">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Pick a file</span>
            </div>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered w-full "
            />
          </label>
        <input type="submit" className="btn mt-8 btn-warning w-1/3"/>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
