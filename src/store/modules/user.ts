
// for example of store modules file

const state = {
	token: undefined
}

const mutations = {
	SET_TOKEN(state: any, token: string) {
		state.token = token
	}
}

const actions = {

}

// open namespaced
// used of $store.state.user
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
