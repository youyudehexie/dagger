import Project from '../lib/Project';
import * as ActionType from '../constants/action';

export function createProject(email, password, repo, target) {
    return (dispatch, getState) => {
        async function process() {
            const pj = new Project(email, password, repo, target);
            const flows = ['genTpl', 'installDep', 'installDeployGit'];
            const max = flows.length;
            for (let i = 0; i < flows.length; i++) {
                dispatch({
                    type: ActionType.PROGRESS,
                    name: flows[i],
                    max,
                    value: i+1,
                });

                await pj[flows[i]]();
            }

            dispatch({
                type: ActionType.CREATE_PROJECT,
                account: {
                    email,
                    password,
                    repo,
                    target
                },
                pj,
            });
        }

        return process();
    }

}

export function checkCreateEnv(email, password, repo, target) {
    return (dispatch, getState) => {
        console.log('-------------')
        console.log(email, password, repo, target);
        console.log('-------------')
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
