function GenNonDuplicateID () {
    return Math.random().toString(36).substr(3) + Date.now().toString(36);
}

module.exports = {
    GenNonDuplicateID
}