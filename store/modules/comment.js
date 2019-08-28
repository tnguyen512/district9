export const state = () => ({
    comments: []
})
  
export const mutations = {
    SET_COMMENTS(state, comments) {
        state.comments = comments
    }
}

export const actions = {
    async getComments({ commit }, slug) {
        const params = {
            companySlug: slug
        }
        let data
        try {
            data = await this.$axios.get('/api/comments', { params });
            commit("SET_COMMENTS", data.data.data.body)
            return data.data.data.body;
        } catch (ex) {
            // Handle error
            return ex;
        }
    }
}


export const getters = {
    comments(state) {
        return state.comments
    }
}
  