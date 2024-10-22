// "use client";

// import { useState } from "react";

// export default function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await postAPI("/contact-submissions", formData);

//       if (res) {
//         setSuccessMessage("Votre message a été envoyé avec succès !");
//         setFormData({
//           name: "",
//           email: "",
//           message: "",
//         });
//       } else {
//         setErrorMessage("Une erreur s'est produite lors de l'envoi.");
//       }
//     } catch {
//       setErrorMessage("Une erreur s'est produite lors de l'envoi.");
//     }
//   };

//   return (
//     <section>
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
//       >
//         <div className="flex flex-col">
//           <label htmlFor="name" className="text-gray-700 font-semibold mb-2">
//             Nom :
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Entrez votre nom"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="email" className="text-gray-700 font-semibold mb-2">
//             Email :
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Entrez votre email"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="message" className="text-gray-700 font-semibold mb-2">
//             Message :
//           </label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             required
//             className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-32"
//             placeholder="Entrez votre message"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
//         >
//           Envoyer
//         </button>

//         {successMessage && (
//           <p className="text-green-500 font-semibold mt-4">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="text-red-500 font-semibold mt-4">{errorMessage}</p>
//         )}
//       </form>
//     </section>
//   );
// }
