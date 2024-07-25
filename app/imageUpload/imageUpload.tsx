// 'use client';
// import { CldUploadWidget } from 'next-cloudinary';
// import React, { useState } from 'react';

// interface UploadedAssetData {
//   public_id: string;
//   width: number;
//   height: number;
//   id: string;
// }

// export default function ImageUpload() {
//   const [pictureUrl, setPictureUrl] = useState('');
//   const [resultPicture, setResultPicture] = useState<UploadedAssetData>();

//   console.log(resultPicture);

//   return (
//     <div>
//       <div>
//         <span>Event Poster:</span>
//         {!!pictureUrl && (
//           <div>
//             <img src={pictureUrl} alt="Event Poster" />
//           </div>
//         )}
//         <CldUploadWidget
//           signatureEndpoint="/api/sign-image"
//           onSuccess={(res) => {
//             setResultPicture(res.info as UploadedAssetData);
//             try {
//               if (typeof res.info === 'string') {
//                 throw new Error('Unexpected string in res.info');
//               }
//               if (typeof res.info === 'undefined') {
//                 throw new Error('Unexpected undefined in res.info');
//               }
//               const secureUrl = res.info.secure_url;
//               setPictureUrl(secureUrl);
//             } catch (error) {
//               console.error('Error:', error);
//             }
//           }}
//         >
//           {({ open }) => {
//             return (
//               <button
//                 onClick={() => open()}
//                 className="input input-bordered w-full py-3 px-4 text-center"
//               >
//                 Upload an image
//               </button>
//             );
//           }}
//         </CldUploadWidget>
//       </div>
//     </div>
//   );
// }
