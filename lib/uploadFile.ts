/**
 * Cloudinary Upload Utility
 * Client-side utility to upload files to Cloudinary via API route
 * Converts base64 strings to files before uploading
 */

/**
 * Converts a base64 string to a File object
 * @param base64String - The base64 encoded string (with or without data URI prefix)
 * @param filename - The name for the file
 * @returns File object ready for upload
 */
function base64ToFile(base64String: string, filename: string): File {
  // Extract the base64 data (remove data URI prefix if present)
  const base64Data = base64String.includes(",")
    ? base64String.split(",")[1]
    : base64String;

  // Extract mime type from data URI or default to image/jpeg
  const mimeType = base64String.match(/data:([^;]+);/)?.[1] || "image/jpeg";

  // Convert base64 to binary
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create and return File object
  return new File([bytes], filename, { type: mimeType });
}

export interface UploadedImage {
  url: string;
  publicId: string;
}

/**
 * Uploads a file to Cloudinary via the API route
 * @param file - The file to upload (can be File or base64 string)
 * @param filename - Optional filename (required if file is base64 string)
 * @returns Promise resolving to the UploadedImage object
 */
export async function uploadFile(
  file: File | string,
  filename?: string,
  folder?: string
): Promise<UploadedImage> {
  try {
    const apiUrl = "/api/upload";

    // Convert base64 to File if necessary
    let fileToUpload: File;
    if (typeof file === "string") {
      if (!filename) {
        throw new Error("Filename is required when uploading base64 string");
      }
      fileToUpload = base64ToFile(file, filename);
    } else {
      fileToUpload = file;
    }

    // Create FormData and append file
    const formData = new FormData();
    formData.append("file", fileToUpload);
    if (folder) {
      formData.append("folder", folder);
    }

    // Send upload request
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    // Handle upload failure
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload failed:", response.status, errorText);
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    // Extract and return file URL and publicId
    const data = await response.json();
    return {
      url: data.fileUrl,
      publicId: data.publicId
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(
      `Failed to upload file: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Uploads multiple files to Cloudinary in parallel
 * @param files - Array of files or base64 strings to upload
 * @param filenames - Optional array of filenames (required if files are base64 strings)
 * @returns Promise resolving to array of UploadedImage objects
 */
export async function uploadMultipleFiles(
  files: (File | string)[],
  filenames?: string[],
  folder?: string
): Promise<UploadedImage[]> {
  try {
    // Upload all files in parallel
    const uploadPromises = files.map((file, index) => {
      const filename = filenames?.[index] || `file-${index}`;
      return uploadFile(file, filename, folder);
    });

    // Wait for all uploads to complete
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw new Error(
      `Failed to upload files: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
