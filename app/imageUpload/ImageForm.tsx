// 'use client';

// import { useRouter } from 'next/navigation';
// import { FormEvent, useState } from 'react';
// import { ImageUploadResponsePost } from '../api/imageUpload/route';
// import ErrorMessage from '../ErrorMessage';
// import { SubmitButton } from './SubmitButton';

// interface ErrorResponse {
//   error: string;
// }

// export default function ImageForm({
//   buttonTitle,
//   formTitle,
// }: {
//   buttonTitle: string;
//   formTitle: string;
// }) {
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const router = useRouter();

//   async function handleUpload(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     const response = await fetch('/api/imageUpload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData: ErrorResponse = await response.json();
//       setErrorMessage(errorData.error);
//       return;
//     }

//     const data: ImageUploadResponsePost | ErrorResponse = await response.json();

//     if ('error' in data) {
//       setErrorMessage(data.error);
//       return;
//     }

//     router.refresh();

//     setSuccessMessage('Image uploaded successfully');
//   }

//   return (
//     <div>
//       {!!successMessage && <p>{successMessage}</p>}
//       <strong>{formTitle}</strong>
//       <form onSubmit={handleUpload}>
//         <label>
//           Select Image:
//           <input type="file" name="image" accept="image/*" />
//         </label>
//         <SubmitButton buttonTitle={buttonTitle} />
//       </form>
//       {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
//     </div>
//   );
// }
