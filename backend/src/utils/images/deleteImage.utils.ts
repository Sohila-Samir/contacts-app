import fs from "fs"
import path from "path"
import ExpressError from "../main/ExpressError.utils"

/**
 *@param `imgRelativePath`: the image relative path to be deleted WITHOUT including the `/` in it.
 *@return `boolean`: indicating a success image deleing process.
 *@throws `error`: if an error occurred during the image deleting process.
 */
const deleteImage = (imgRelativePath: string,): boolean => {
  const imgAbsolutePath = path.join(__dirname, "..", "..", "uploads", imgRelativePath)

  fs.unlink(imgAbsolutePath, (err: unknown) => {
    if (err && err instanceof Error) {
      throw new ExpressError(err.message, 400, (err.name || "DeleteImageError"))
    }
  })

  return true
}

export default deleteImage;