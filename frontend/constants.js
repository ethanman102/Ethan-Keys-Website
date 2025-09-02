const apiURL = import.meta.env.VITE_API_URL;

const pathNames = {
    blog : "blog",
    projects : "projects",
    admin : "adminpage",
    home : "home"
}

const mode = {
    EDIT: 'E',
    VIEW: 'V'
}

const toolTypes = {
    FRONTEND: 'FRONTEND',
    BACKEND: 'BACKEND'
}

const SIZE = 5

const URLS = {
    github: 'https://github.com/ethanman102/',
    linkedIn: 'https://www.linkedin.com/in/ethan-keys',
    resume: '/resume.pdf'
}

export {apiURL,pathNames,mode,toolTypes,SIZE,URLS}