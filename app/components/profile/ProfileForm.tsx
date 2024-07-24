import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, db, storage } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Profile } from "../../types";
import UploadWhite from "../icons/UploadWhite";
import UploadPurple from "../icons/UploadPurple";

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
    <div className="bg-white h-screen">
      <div className="mb-10">
        <h2 className="text-[2rem] font-bold mb-4 ">Profile Details</h2>
        <p className="text-[#737373] text-base">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-28 w-full h-screen"
      >
        <div className="space-y-6 ">
          <div className="p-5 bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-base text-[#737373] md:pt-2">
              Profile picture
            </label>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative w-48 h-48 flex items-center justify-center border-2 border-[#633CFF] border-dashed rounded-lg bg-[#EFEBFF]">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Profile"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-lg opacity-70 hover:opacity-100 transition-opacity">
                      <UploadWhite />

                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-white"
                      >
                        <span>Change Image</span>
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
                  </>
                ) : (
                  <div className="space-y-2 text-center">
                    <UploadPurple />
                    <div className="flex text-sm text-[#737373] justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-[#633CFF] hover:text-[#633CFF] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#633CFF]"
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

          <div className="p-5 space-y-3 bg-[#FAFAFA] mb-28">
            <div className="relative md:grid md:grid-cols-3 md:items-center">
              <label
                htmlFor="firstName"
                className="block text-[#737373] text-xs leading-[1.125rem]"
              >
                First name*
              </label>
              <input
                {...register("firstName", { required: "Can't be empty" })}
                className={`h-12 w-full md:col-span-2 px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#633CFF] focus:shadow-customInput focus:ring-1 focus:ring-[#633CFF] ${
                  errors.firstName
                    ? "border-[#FF3939] focus:border-[#FF3939] focus:ring-[#FF3939] focus:shadow-none"
                    : ""
                }`}
                placeholder="e.g. John"
              />
              {errors.firstName && (
                <span className="absolute text-[#FF3939] text-xs mt-1 right-3 bottom-3">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="relative md:grid md:grid-cols-3 md:items-center">
              <label
                htmlFor="lastName"
                className="block text-[#737373] text-xs leading-[1.125rem]"
              >
                Last name*
              </label>
              <input
                {...register("lastName", { required: "Can't be empty" })}
                className={`h-12 w-full md:col-span-2 px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#633CFF] focus:shadow-customInput focus:ring-1 focus:ring-[#633CFF] ${
                  errors.lastName
                    ? "border-[#FF3939] focus:border-[#FF3939] focus:ring-[#FF3939] focus:shadow-none"
                    : ""
                }`}
                placeholder="e.g. Appleseed"
              />
              {errors.lastName && (
                <span className="absolute text-[#FF3939] text-xs mt-1 right-3 bottom-3">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="relative md:grid md:grid-cols-3 md:items-center">
              <label
                htmlFor="email"
                className="block text-xs text-[#737373] leading-[1.125rem]"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Can't be empty",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email",
                  },
                })}
                className={`h-12 w-full md:col-span-2 px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#633CFF] focus:shadow-customInput focus:ring-1 focus:ring-[#633CFF] ${
                  errors.email
                    ? "border-[#FF3939] focus:border-[#FF3939] focus:ring-[#FF3939] focus:shadow-none"
                    : ""
                }`}
                placeholder="e.g. email@example.com"
              />
              {errors.email && (
                <span className="absolute text-[#FF3939] text-xs mt-1 right-3 bottom-3">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto py-6 px-4 sm:px-6 border-t bg-white h-24">
          <div className="my-auto sm:text-right">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-[#633CFF] font-semibold text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
