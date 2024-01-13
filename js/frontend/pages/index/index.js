import { loadProfile } from "/js/frontend/pages/index/profile.js";
import { loadProjects } from "/js/frontend/pages/index/projects.js";
import { loadExperience } from "/js/frontend/pages/index/experience.js"
import { loadLatestArticles, loadLatestStudies } from "/js/frontend/pages/index/latest.js";

import { bgFetchArticles, bgFetchStudies, bgFetchProjects } from "/js/frontend/pages/index/bgFetch.js";

// render page
loadProfile()
loadExperience()
loadProjects()
loadLatestArticles()
loadLatestStudies()

// background fetch data
bgFetchArticles()
bgFetchStudies()
