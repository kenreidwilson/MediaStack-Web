import { Media, Tag } from "../types";

const getAverageScore = (mediaList: Media[]): number => {

    if (mediaList.length == 0) {
        return 0;
    }

    let sum = 0;
    mediaList.forEach(m => sum += m.score);
    return sum / mediaList.length;
}

const manageTags = (tags: Tag[], addTags?: Tag[], removeTags?: Tag[]): Tag[] => {
    let newTags = [...tags];

    if (addTags) {
        addTags.forEach(tag => {
            if (!tags.find(addTag => addTag.id === tag.id)) {
                newTags.push(tag);
            }
        });
    }

    if (removeTags) {
        removeTags.forEach(tag => {
            if (newTags.find(removeTag => removeTag.id === tag.id)) {
                newTags = newTags.filter(t => t.id === tag.id);
            }
        });
    }

    return newTags;
}

const getCommonSource = (mediaList: Media[]): string | null => {
    let commonSource = null;
    for (const source of mediaList.map(m => m.source)) {

        if (commonSource === null) {
            commonSource = source;
        } else if (commonSource !== source) {
            return null;
        }
    }
    return commonSource;
}

export {
    getAverageScore,
    manageTags,
    getCommonSource
}
