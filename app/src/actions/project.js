import Project from '../lib/Project';
import * as ActionType from '../constants/action';
import { normalize } from 'normalizr';
import { Schemas } from '../constants/schema';


export function createProject(email, password, repo, target) {
    return (dispatch, getState) => {
        async function process() {
            const pj = new Project(email, password, repo, target);
            const flows = ['genTpl', 'installDep', 'installDeployGit'];
            const max = flows.length;
            let project = {};

            await pj.init();

            project = {
                id: pj.id,
                flow: {
                    name: 'started',
                    max,
                    value: 0,
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
                project = {
                    id: pj.id,
                    flow: {
                        name: flows[i],
                        max,
                        value: i+1,
                    }
                };

                await pj[flows[i]]();
                dispatch({
                    type: ActionType.PROGRESS,
                    response: normalize(project, Schemas.PROJECT),
                });
            }
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
