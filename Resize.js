const sharp = require('sharp');
const { uuid } = require('uuidv4');
const path = require('path');
const cv = require('opencv4nodejs');
class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer) {
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
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;