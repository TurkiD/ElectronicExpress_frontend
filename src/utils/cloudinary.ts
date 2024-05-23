export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "qatkauhv")
    formData.append("folder", "e-commerce-sda2")

    try {
        const response = await fetch(`http://api.cloudinary.com/v1_1/dfr06kwwy/image/upload`, {
            method: "POST",
            body: formData
        })
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const data = await response.json()
        return data.secure_url
    } catch (error) {
        console.error("Error uploading image to Cloudinary: ", error)
        throw error
 
    }
}