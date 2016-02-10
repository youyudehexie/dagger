import Project from '../lib/Project';
import File from '../lib/File';

import * as ActionType from '../constants/action';
import { normalize } from 'normalizr';
import { Schemas } from '../constants/schema';


export function createProject(email, password, repo, target) {
    return (dispatch, getState) => {
        async function process() {
            const pj = new Project(email, password, repo, target);
            const flows = ['genTpl', 'installDep', 'installDeployGit', 'generate'];
            const max = flows.length + 1;
            let step = 1;
            let project = {};
            const f = new File(target);

            await pj.init();

            project = {
                id: pj.id,
                resources: {},
                flow: {
                    name: 'started',
                    max,
                    value: step++,
                },
                account: {
                    email,
                    password,
                    repo,
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

export function newPost(project, title) {
    const { account: { target }, id } =  project;

    return dispatch({
        type: ActionType.NEW_POST,
    });
}

export function editPost(project, post, content) {
    return (dispatch, getState) => {
        const target = project.account.target;
        const resources = project.resources;
        const file = new File(target);
        const { source } = post;
        resources.rawPost[source] = content;

        async function process() {
            console.log(`${target}/source/${source}`)
            try {
                await file.write(`${target}/source/${source}`, content)
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


export function checkCreateEnv(email, password, repo, target) {
    return (dispatch, getState) => {
        let pj;
        try {
            pj = new Project(email, password, repo, target);
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
