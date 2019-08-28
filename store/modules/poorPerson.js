export const state = () => ({
    poorPeople: [],
    poorGroup: []
})

export const mutations = {
    SET_POOR_PEOPLE(state, poorPeople) {
        state.poorPeople = poorPeople
    },
    SET_POOR_GROUP(state, poorGroup) {
        state.poorGroup = poorGroup
    }
}

export const actions = {
    async getPoorPeopleByGroupId({ commit }, groupId) {
        let data
        try {
            data = await this.$axios.get('/api/poor-person/group/' + groupId);
            commit("SET_POOR_PEOPLE", data.data)
        } catch (ex) {
            // Handle error
            return ex
        }
        return data.data;
    },
    async getAllPoorPeopleGroup({ commit }, params) {
        let data
        try {
            data = await this.$axios.get('/api/poor-person/group');
            commit("SET_POOR_GROUP", data.data)
        } catch (ex) {
            // Handle error
            return ex
        }
        return data.data;
    }, 
    async addNewGroup({ commit }, newGroup) {
        let data
        try {
            data = await this.$axios.post('/api/poor-person/group?group=' + newGroup);
        } catch (ex) {
            return ex
        }
        return data.data;
    },
    async importPeopleGroup({ commit }, formData) {
        let data
        try {
            console.log(formData);
            data = await this.$axios.post('/api/poor-person/import', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
        } catch (ex) {
            return ex
        }
        return data.data;
    }
}


export const getters = {
    poorPeople(state) {
        return state.poorPeople
    },
    poorGroup(state) {
        return state.poorGroup
    }
}
