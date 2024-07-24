import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, db, storage } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Profile } from "../types";

interface ProfileFormProps {
  initialData?: Profile;
  onSave: (profile: Profile) => void;
}

const ProfileForm = ({ initialData, onSave }: ProfileFormProps) => {
  // console.log(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.profilePicture || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    defaultValues: initialData || { firstName: "", lastName: "", email: "" },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Profile> = async (data) => {
    const user = auth.currentUser;
    if (user) {
      let profilePictureUrl = initialData?.profilePicture || "";

      if (imageFile) {
        const storageRef = ref(storage, `profile-pictures/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      const profileData = { ...data, profilePicture: profilePictureUrl };
      await setDoc(doc(db, "profiles", user.uid), profileData);
      onSave(profileData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="p-5 bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="text-base text-[#737373] md:pt-2">
          Profile picture
        </label>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative w-48 h-48 flex items-center justify-center border-2 border-gray-300 border-dashed rounded-md bg-[#EFEBFF]">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={193}
                height={193}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="#633CFF"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-[#737373] justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-[#633cff] hover:text-[#633CFF] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#633CFF]"
                  >
                    <span>+ Upload Image</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center sm:items-start">
            <div className="text-xs text-[#737373]">
              <p>Image must be below 1024x1024px.</p>
              <p>Use PNG or JPG format.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-[#FAFAFA]">
        <input
          {...register("firstName", { required: "First name is required" })}
          className="w-full p-2 border rounded"
          placeholder="e.g. John"
        />
        {errors.firstName && (
          <span className="text-red-600">{errors.firstName.message}</span>
        )}

        <input
          {...register("lastName", { required: "Last name is required" })}
          className="w-full p-2 border rounded"
          placeholder="e.g. Appleseed"
        />
        {errors.lastName && (
          <span className="text-red-600">{errors.lastName.message}</span>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invalid email",
            },
          })}
          className="w-full p-2 border rounded"
          placeholder="e.g. email@example.com"
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div className="mt-6 text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-[#633CFF] font-medium text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

// import { useForm, SubmitHandler } from "react-hook-form";
// import { auth, db } from "../utils/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { Profile } from "../types";

// interface ProfileFormProps {
//   initialData?: Profile;
//   onSave: (profile: Profile) => void;
// }

// const ProfileForm = ({ initialData, onSave }: ProfileFormProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Profile>({
//     defaultValues: initialData || { firstName: "", lastName: "", email: "" },
//   });

//   const onSubmit: SubmitHandler<Profile> = async (data) => {
//     const user = auth.currentUser;
//     if (user) {
//       await setDoc(doc(db, "profiles", user.uid), data);
//       onSave(data);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <input
//         {...register("firstName", { required: "First name is required" })}
//         className="w-full p-2 border rounded"
//         placeholder="First Name"
//         value={initialData?.firstName}
//       />
//       {errors.firstName && (
//         <span className="text-red-600">{errors.firstName.message}</span>
//       )}
//       <input
//         {...register("lastName", { required: "Last name is required" })}
//         className="w-full p-2 border rounded"
//         placeholder="Last Name"
//         value={initialData?.lastName}
//       />
//       {errors.lastName && (
//         <span className="text-red-600">{errors.lastName.message}</span>
//       )}
//       <input
//         {...register("email", {
//           required: "Email is required",
//           pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" },
//         })}
//         className="w-full p-2 border rounded"
//         placeholder="Email"
//         value={initialData?.email}
//       />
//       {errors.email && (
//         <span className="text-red-600">{errors.email.message}</span>
//       )}
//       <button
//         type="submit"
//         className="w-full py-2 bg-purple-600 text-white rounded"
//       >
//         Save Profile
//       </button>
//     </form>
//   );
// };

// export default ProfileForm;
