import Project from '../lib/Project';
import File from '../lib/File';

import * as ActionType from '../constants/action';
import { normalize } from 'normalizr';
import { Schemas } from '../constants/schema';


export function createProject(email, password, target) {
    return (dispatch, getState) => {
        async function process() {
            const pj = new Project(email, password, target);
            const flows = ['init', 'createRepo', 'genTpl', 'installDep', 'installDeployGit', 'deploy'];
            const max = flows.length + 1;
            let step = 1;
            let project = {};

            await pj.init();

            project = {
                id: pj.id,
                publishing: false,
                resources: {},
                flow: {
                    name: 'started',
                    max,
                    value: step++,
                },
                account: {
                    email,
                    password,
                    repo: pj.repo || '',
                    target
                },
            };


            dispatch({
                type: ActionType.CREATE_PROJECT,
                response: normalize(project, Schemas.PROJECT),
            });

            for (let i = 0; i < flows.length; i++) {
                await pj[flows[i]]();
                project = {
                    id: pj.id,
                    flow: {
                        name: flows[i],
                        max,
                        value: step++,
                    }
                };


                dispatch({
                    type: ActionType.PROGRESS,
                    response: normalize(project, Schemas.PROJECT),
                });
            }


        }

        return process();
    }

}

export function saveSetting(project, settings) {
    return (dispatch, getState) => {
        const target = project.account.target;
        const file = new File(target);

        async function process() {
            await file.saveSetting(settings);
            project.resources = await file.load();
            dispatch({
                type: ActionType.SAVE_SETTINGS,
                response: normalize(project, Schemas.PROJECT),
            });
        }
        return process();
    }

}

export function newPost(project, title) {
    return (dispatch, getState) => {
        const target = project.account.target;
        const file = new File(target);

        async function process() {
            await file.newPost(title);
            project.resources = await file.load();

            dispatch({
                type: ActionType.NEW_POST,
                response: normalize(project, Schemas.PROJECT),
            });
        }

        return process();
    }

}

export function editPost(project, post, contentText, contentHtml) {
    return (dispatch, getState) => {
        const target = project.account.target;
        const resources = project.resources;
        const file = new File(target);
        const { source } = post;
        resources.rawPost[source] = contentHtml;

        async function process() {
            try {
                await file.write(`${target}/source/${source}`, contentText)
            } catch (e) {
                console.log(e);
            }

            dispatch({
                type: ActionType.EDIT_POST,
                response: normalize(project, Schemas.PROJECT),
            });
        }

        return process();
    }
}

export function deployPost(project) {
    return (dispatch, getState) => {
        const { id } = project;
        const target = project.account.target;
        const file = new File(target);

        async function process() {
            project.publishing = true;

            dispatch({
                id,
                type: ActionType.DEPLOY_POST_START,
                response: normalize(project, Schemas.PROJECT),
            });

            try {
                await file.deploy();
            } catch (e) {
                console.log(e);
            }

            project.publishing = false;

            dispatch({
                id,
                type: ActionType.DEPLOY_POST_END,
                response: normalize(project, Schemas.PROJECT),
            });
        }

        return process();
    }
}



export function checkCreateEnv(email, password, target) {
    return (dispatch, getState) => {
        let pj;
        try {
            pj = new Project(email, password, target);
        } catch (e) {
            return Promise.reject({code: 'auth_error', msg: '账号验证失败'})
        }

        return pj.init()
        .then(function () {
            dispatch({
                type: ActionType.CHECK_CREATE_ENV
            });

            return pj.checkCreateEnv();
        })
    }
}

export function loadProject(project) {
    return (dispatch, getState) => {
        const { account: { target }, id } =  project;
        const file = new File(target);
        file.load()
        .then((resources) => {
            const project = {
                id: id,
                resources,
            }

            return dispatch({
                type: ActionType.LOAD_PROJECT,
                response: normalize(project, Schemas.PROJECT),
            });
        })

    }
}
