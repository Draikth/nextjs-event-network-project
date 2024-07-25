import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageForm from './ImageForm';

type ImageUploadPageProps = {
  onImageSelect: (url: string) => void;
};

type ImageType = {
  id: number;
  url: string;
};

export default function ImageUploadPage({
  onImageSelect,
}: ImageUploadPageProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/fetchImages');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError('Failed to load images');
        console.error('Error fetching images:', error);
      }
    }
    fetchImages();
  }, []);

  return (
    <div>
      <div>
        <h1>Upload Image to Cloudinary</h1>

        {images.length > 0 && (
          <div>
            <h2>Images</h2>
            <ul>
              {images.map((image) => (
                <li key={`image-${image.id}`}>
                  <Image
                    src={image.url}
                    alt="Uploaded image"
                    width={80}
                    height={100}
                    onClick={() => onImageSelect(image.url)}
                    style={{ cursor: 'pointer' }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        <ImageForm buttonTitle="Upload Image" formTitle="Upload Image" />
      </div>
    </div>
  );
}

// import Image from 'next/image';
// import { getImagesInsecure } from '../../database/imgQueries';
// import ImageForm from './ImageForm';

// type ImageUploadPageProps = {
//   onImageSelect: (url: string) => void;
// };

// export default async function ImageUploadPage({
//   onImageSelect,
// }: ImageUploadPageProps) {
//   const images = await getImagesInsecure();

//   return (
//     <div>
//       <div>
//         <h1>Upload Image to Cloudinary</h1>

//         {images.length > 0 && (
//           <div>
//             <h2>Images</h2>
//             <ul>
//               {images.map((image) => (
//                 <li key={`image-${image.id}`}>
//                   <Image
//                     src={image.url}
//                     alt="Uploaded image"
//                     width={80}
//                     height={100}
//                     onClick={() => onImageSelect(image.url)}
//                     style={{ cursor: 'pointer' }}
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <ImageForm buttonTitle="Upload Image" formTitle="Upload Image" />
//       </div>
//     </div>
//   );
// }
