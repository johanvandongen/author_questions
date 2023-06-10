import axios from 'axios';

/**
 * Returns a google document object from the specified {@code docId}.
 * @param token access token
 * @param docId id of google document
 */
export async function getGoogleDoc(token: string, docId: string): Promise<any> {
    const link = `https://docs.googleapis.com/v1/documents/${docId}`;
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
