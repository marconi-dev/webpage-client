import "https://unpkg.com/dexie@3.2.4/dist/dexie.js"

export const DB = new Dexie('Portfolio')
DB.version(1).stores({
    profile: "id++",
    projects: "id",
    techs: "id",
    latestArticles: "id",
    latestStudies: "id"
})
