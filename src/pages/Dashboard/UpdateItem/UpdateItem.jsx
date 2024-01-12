import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

const UpdateItem = () => {
    const menu = useLoaderData();
    const {_id,name,recipe,price,category} = menu ;
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit} = useForm();
  
    const onSubmit = (data) => {
      const imgFile = { image: data?.image[0] };
      const img_host_url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_KEY
      }`;
      axios
        .post(img_host_url, imgFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            const menuItem = {
              name: data?.name,
              price: parseFloat(data?.price),
              recipe: data?.recipe,
              image: res?.data?.data?.display_url,
              category: data.category,
            };
  
            axiosSecure.put(`/menu/${_id}`, menuItem)
            .then((menuRes) => {
              if (menuRes.data.modifiedCount>0) {
                toast.success(`${data?.name} is updated successfully!`);
              }
            });
          }
        });
    };
    return (
        <div className="w-3/4 px-12 -mt-10">
      <SectionTitle
        heading={"Update an Item"}
        subHeading={"Do you want to update an item ? "}
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="-mt-2">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Recipe name*</span>
          </div>
          <input
            type="text"
            defaultValue={name}
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
              defaultValue={category}
              {...register("category")}
              required
              className="select select-bordered w-full "
            > 
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
              type="text"
              required
              defaultValue={price}
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
            defaultValue={recipe}
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
          <input type="submit" className="btn mt-8 btn-warning w-1/3" />
        </div>
      </form>
    </div>
    );
};

export default UpdateItem;