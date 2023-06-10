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
