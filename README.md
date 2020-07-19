# LIBI Front

![](https://img.shields.io/github/v/release/Angelhack-LIBI/team-libi-frontend-sai) ![](https://img.shields.io/badge/license-MIT-green) ![](https://img.shields.io/docker/cloud/build/dongho1596/libi-front) ![](https://img.shields.io/docker/image-size/dongho1596/libi-front/latest)

[![Run on Ainize](https://ainize.ai/static/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=github.com/Angelhack-LIBI/team-libi-frontend-sai)

## 엔젤핵 서울 2020 해커톤 LIBI팀 프론트엔드 프로젝트 

우리동네 소상공인 공동구매 플랫폼 : 사이
### [Demo](https://libi-front-gongdongho12.endpoint.ainize.ai/)

![스크린샷](./public/rendered_capture_style.png)

## React Boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [CRACO](https://github.com/gsoft-inc/craco).

## Used Library from NPM
- UI-UX: [Ant Design](https://www.npmjs.com/package/antd)
- State Management: [Recoil](https://www.npmjs.com/package/recoil)
- HTTP client: [Axios](https://www.npmjs.com/package/axios)
- Custom CSS Component: [Styled Component](https://www.npmjs.com/package/styled-components)

## CI/CD
- [DockerH](https://hub.docker.com/repository/docker/dongho1596/libi-front)
- [Ainize](https://ainize.web.app/redirect?git_repo=github.com/Angelhack-LIBI/team-libi-frontend-sai)

## Available Scripts

In the project directory, you can run:

### `npm install`

Install require modules for this projects. <br />

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run docker-build`

Builds the app for production to the docker container.<br />

### `npm run docker-deploy`

Deploy container built from "docker-build" to Docker Hub.<br />

### `npm run docker-run`

Run container built from "docker-build".<br />

### ~~`npm run eject`~~

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.