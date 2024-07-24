import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "../types";

interface LinkFormProps {
  initialData?: Link;
  onClose: () => void;
  onSave: (link: Link) => void;
}

type LinkFormData = Omit<Link, "id">;

const LinkForm = ({ initialData, onClose, onSave }: LinkFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkFormData>({
    defaultValues: initialData
      ? { platform: initialData.platform, url: initialData.url }
      : { platform: "", url: "" },
  });

  const onSubmit: SubmitHandler<LinkFormData> = (data) => {
    if (initialData) {
      const updatedLink: Link = { ...initialData, ...data };
      onSave(updatedLink);
    } else {
      const newLink: Link = { ...data, id: Date.now().toString() }; // Use a temporary ID
      onSave(newLink);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <select
        {...register("platform", { required: "Platform is required" })}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Platform</option>
        <option value="GitHub">GitHub</option>
        <option value="YouTube">YouTube</option>
        <option value="LinkedIn">LinkedIn</option>
      </select>
      {errors.platform && (
        <span className="text-red-600">{errors.platform.message}</span>
      )}

      <input
        {...register("url", {
          required: "URL is required",
          pattern: { value: /^https?:\/\/.+\..+/, message: "Invalid URL" },
        })}
        className="w-full p-2 border rounded"
        placeholder="Enter URL"
      />
      {errors.url && <span className="text-red-600">{errors.url.message}</span>}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-purple-600 text-white rounded"
        >
          {initialData ? "Update" : "Add"} Link
        </button>
      </div>
    </form>
  );
};

export default LinkForm;

// import { useForm, SubmitHandler } from "react-hook-form";
// import { db } from "../utils/firebase";
// import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
// import { Link } from "../types";

// interface LinkFormProps {
//   initialData?: Link;
//   onClose: () => void;
//   onSave: (link: Link) => void;
// }

// // New type for form data
// type LinkFormData = Omit<Link, "id">;

// const LinkForm = ({ initialData, onClose, onSave }: LinkFormProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LinkFormData>({
//     defaultValues: initialData
//       ? { platform: initialData.platform, url: initialData.url }
//       : { platform: "", url: "" },
//   });

//   const onSubmit: SubmitHandler<LinkFormData> = async (data) => {
//     if (initialData) {
//       const linkRef = doc(db, "links", initialData.id);
//       await updateDoc(linkRef, data as { [x: string]: any });
//       const updatedLink: Link = { ...initialData, ...data };
//       onSave(updatedLink);
//     } else {
//       const linksCollection = collection(db, "links");
//       const newDocRef = doc(linksCollection);
//       const newLink: Link = { ...data, id: newDocRef.id };
//       await setDoc(newDocRef, newLink);
//       onSave(newLink);
//     }
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <select
//         {...register("platform", { required: "Platform is required" })}
//         className="w-full p-2 border rounded"
//       >
//         <option value="">Select Platform</option>
//         <option value="GitHub">GitHub</option>
//         <option value="YouTube">YouTube</option>
//         <option value="LinkedIn">LinkedIn</option>
//       </select>
//       {errors.platform && (
//         <span className="text-red-600">{errors.platform.message}</span>
//       )}

//       <input
//         {...register("url", {
//           required: "URL is required",
//           pattern: { value: /^https?:\/\/.+\..+/, message: "Invalid URL" },
//         })}
//         className="w-full p-2 border rounded"
//         placeholder="Enter URL"
//       />
//       {errors.url && <span className="text-red-600">{errors.url.message}</span>}
//       <button
//         type="submit"
//         className="w-full py-2 bg-purple-600 text-white rounded"
//       >
//         Save Link
//       </button>
//     </form>
//   );
// };

// export default LinkForm;

// import { useForm, SubmitHandler } from "react-hook-form";
// import { db } from "../utils/firebase";
// import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

// interface LinkFormProps {
//   initialData?: { id: string; url: string };
//   onClose: () => void;
// }

// interface FormData {
//   url: string;
// }

// const LinkForm = ({ initialData, onClose }: LinkFormProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: initialData || { url: "" },
//   });

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     const dataToSave = data as { [key: string]: any };

//     if (initialData) {
//       const linkRef = doc(db, "links", initialData.id);
//       await updateDoc(linkRef, dataToSave);
//     } else {
//       const linksCollection = collection(db, "links");
//       const newDocRef = doc(linksCollection);
//       await setDoc(newDocRef, dataToSave);
//     }
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <input
//         {...register("url", {
//           required: "URL is required",
//           pattern: { value: /^https?:\/\/.+\..+/, message: "Invalid URL" },
//         })}
//         className="input"
//         placeholder="Enter URL"
//       />
//       {errors.url && <span className="text-red-600">{errors.url.message}</span>}
//       <button type="submit" className="btn btn-primary">
//         Save Link
//       </button>
//     </form>
//   );
// };

// export default LinkForm;
