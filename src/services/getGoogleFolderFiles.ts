import axios from 'axios';

/**
 * Returns a list of files, found in google drive folder with id {@code folderId}.
 * @param token access token
 * @param folderId id of google drive folder
 */
export async function getGoogleFolderFiles(token: string, folderId: string): Promise<any> {
    console.log(`start reading folder: ${folderId}`);

    const link = `https://www.googleapis.com/drive/v2/files?q='${folderId.toString()}'+in+parents`;
    return await axios
        .get(link, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
