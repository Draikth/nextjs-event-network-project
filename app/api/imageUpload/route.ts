// import { v2 as cloudinary } from 'cloudinary';
// import { NextRequest, NextResponse } from 'next/server';
// import { createImageInsecure } from '../../../database/imgQueries';

// export type ImageUploadResponsePost =
//   | {
//       imageUrl: string;
//     }
//   | {
//       error: string;
//     };

// type CloudinaryResponse = {
//   secure_url: string;
// };

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(
//   request: NextRequest,
// ): Promise<NextResponse<ImageUploadResponsePost>> {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('image') as File;

//     if (!file.name) {
//       return NextResponse.json({ error: 'Please select an image' });
//     }

//     if (file.size > 1024 * 1024 * 5) {
//       return NextResponse.json({ error: 'Image is too large' });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);

//     const response = await new Promise<CloudinaryResponse | undefined>(
//       (resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({}, (error, result) => {
//             if (error) {
//               reject(error);
//               return;
//             }
//             resolve(result);
//           })
//           .end(buffer);
//       },
//     );

//     if (!response) {
//       return NextResponse.json({ error: 'Image upload failed' });
//     }

//     const image = await createImageInsecure(response.secure_url);

//     if (!image) {
//       return NextResponse.json({ error: 'Image upload failed' });
//     }

//     return NextResponse.json({ imageUrl: image.url });
//   } catch (error) {
//     return NextResponse.json({
//       error: (error as Error).message,
//     });
//   }
// }

// // import { v2 as cloudinary } from 'cloudinary';
// // import { NextRequest, NextResponse } from 'next/server';

// // cloudinary.config({
// //   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // eslint-disable-next-line no-restricted-syntax
// // export async function POST(request: NextRequest): Promise<NextResponse> {
// //   const body = (await request.json()) as {
// //     paramsToSign: Record<string, string>;
// //   };

// //   const { paramsToSign } = body;

// //   const signature = cloudinary.utils.api_sign_request(
// //     paramsToSign,
// //     process.env.CLOUDINARY_API_SECRET as string,
// //   );

// //   return NextResponse.json({ signature });
// // }
