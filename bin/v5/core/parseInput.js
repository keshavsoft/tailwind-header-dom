export default function parseInput() {
    const [folderName] = process.argv.slice(2);

    return {
        folderName: folderName || null,
        toPath: process.cwd()
    };
};