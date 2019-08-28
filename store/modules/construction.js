export const state = () => ({
    construction: [],
    constructGroup: []
})
  
export const mutations = {
    SET_CONSTRUCTION(state, construction) {
        state.construction = construction
    },
    SET_CONSTRUCT_GROUP(state, constructGroup) {
        state.constructGroup = constructGroup
    }
}

export const actions = {
    async getConstructionByGroupId({ commit }, groupId) {
        let data
        try {
            data = await this.$axios.get('/api/construction/group/' + groupId);
            commit("SET_CONSTRUCTION", data.data)
        } catch (ex) {
            // Handle error
            return ex
        }
        return data.data;
    },
    async addNewGroup({ commit }, newGroup) {
        let data
        try {
            data = await this.$axios.post('/api/construction/group?group=' + newGroup);
        } catch (ex) {
            return ex
        }
        return data.data;
    },
    async getAllConstructionGroup({ commit }, params) {
        let data
        try {
            data = await this.$axios.get('/api/construction/group');
            commit("SET_CONSTRUCT_GROUP", data.data)
        } catch (ex) {
            // Handle error
            return ex
        }
        return data.data;
    },
    async importConstruction({ commit }, formData) {
        let data
        try {
            data = await this.$axios.post('/api/construction/import', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
        } catch (ex) {
            console.log("error", ex);
            return ex
        }
        return data.data;
    }
}


export const getters = {
    construction(state) {
        return state.construction
    },
    constructGroup(state) {
        return state.constructGroup
    }
}
  