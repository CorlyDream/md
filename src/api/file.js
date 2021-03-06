import fetch from './fetch';
import {
    v4 as uuidv4
} from 'uuid';
const fileUploadConfig = {
    username: 'filess',
    repo: 'images',
    accessToken: [
        '7715d7ca67b5d3837cfdoocsmde8c38421815aa423510af',
        'c411415bf95dbe39625doocsmd5047ba9b7a2a6c9642abe',
        '2821cd8819fa345c053doocsmdca86ac653f8bc20db1f1b',
        '445f0dae46ef1f2a4d6doocsmdc797301e94797b4750a4c',
        'cc1d0c1426d0fd0902bdoocsmdd2d7184b14da61b86ec46',
        'b67e9d15cb6f910492fdoocsmdac6b44d379c953bb19eff',
        '618c4dc2244ccbbc088doocsmd125d17fd31b7d06a50cf3',
        'a4b581732e1c1507458doocsmdc5b223b27dae5e2e16a55'
    ]
}

function getConfiguration() {
    const imgHost = localStorage.getItem("ImgHost") || 'default'

    // default
    let token = fileUploadConfig.accessToken[Math.floor(Math.random() * fileUploadConfig.accessToken.length)].replace('doocsmd', '')
    let username = fileUploadConfig.username
    let repo = fileUploadConfig.repo

    // GitHub
    if (imgHost === 'github' && localStorage.getItem("GitHubConfig")) {
        const githubConfg = JSON.parse(localStorage.getItem("GitHubConfig"))
        const repoUrl = githubConfg.repo.replace("https://github.com/", "").replace("http://github.com/", "").replace("github.com/", "").split("/")
        token = githubConfg.accessToken
        username = repoUrl[0]
        repo = repoUrl[1]
    }
    return {
        username,
        repo,
        token
    }
}


function fileUpload(content, filename) {
    const date = new Date();
    const dir = date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0');
    const uuid = uuidv4();
    const dateFilename = new Date().getTime() + '-' + uuid + '.' + filename.split('.')[1];
    const {
        username,
        repo,
        token
    } = getConfiguration()
    const url = `https://api.github.com/repos/${username}/${repo}/contents/${dir}/${dateFilename}`

    return fetch({
        url,
        method: 'put',
        headers: {
            'Authorization': 'token ' + token
        },
        data: {
            message: 'Upload image by https://doocs.github.io/md',
            content: content
        }
    })
}


export default {
    fileUpload
};
