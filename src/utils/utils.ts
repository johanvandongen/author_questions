/**
 * Parses the title and returns the author name.
 * @param title title Expected format yyyy - [Author] Vragen.
 * @returns the author name
 */
export const parseTitle = (title: string): string => {
    const author: RegExpMatchArray | null = title.match(/[0-9999] - (.*?) Vragen/);

    if (author === null) {
        return 'author';
    }
    return author[1].toString();
};

/**
 * Returns the google id (folder, doc, etc.) from url.
 * @param url url of the google file
 */
export function getIdFromUrl(url: string): RegExpMatchArray | null {
    // https://stackoverflow.com/questions/16840038/easiest-way-to-get-file-id-from-url-on-google-apps-script
    return url.match(/[-\w]{25,}/);
}

/**
 * Authors needed to fill in whether their question had been answered. However
 * there were no conventions for this, so this is a manual check for it.
 * @param isAnswerdString string we want to check
 * @return true if it seems like the author got their question answered.
 */
export const isAnswered = (isAnswerdString: string): boolean => {
    switch (isAnswerdString.trim()) {
        case 'ja':
            return true;
        case 'Ja':
            return true;
        case 'y':
            return true;
        case 'Yes':
            return true;
        case 'yes':
            return true;
        default:
            return false;
    }
};
