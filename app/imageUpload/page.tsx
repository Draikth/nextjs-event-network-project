import Image from 'next/image';
import { getImagesInsecure } from '../../database/imgQueries';
import ImageForm from './ImageForm';

export default async function imageUploadPage() {
  const images = await getImagesInsecure();

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
                    width={40}
                    height={40}
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
