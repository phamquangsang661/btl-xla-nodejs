const sharp = require('sharp');
const { uuid } = require('uuidv4');
const path = require('path');
export class Resize {
    folder: string
    constructor(folder: string) {
        this.folder = folder;
    }
    async save(buffer: any) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(300, 300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return { filename, filepath };
    }
    static filename() {
        return `${uuid()}.png`;
    }
    filepath(filename: string) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
