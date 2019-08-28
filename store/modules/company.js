export const state = () => ({
    companies: [],
    company: null
})
  
export const mutations = {
    SET_COMPANIES(state, companies) {
        state.companies = companies
    },
    SET_COMPANY(state, company) {
        state.company = company
    }
}

export const actions = {
    async getCompanies({ commit }, params) {
        let data
        try {
            data = await this.$axios.get('/api/companies', { params });
            commit("SET_COMPANIES", data.data.data.body)
        } catch (ex) {
            // Handle error
            return ex
        }
        return data.data.data.body;
    },
    async getCompanyById({ commit }, companyId) {
        let data
        try {
            data = await this.$axios.get('/api/companies/' + companyId);
            commit("SET_COMPANY", data.data.data.body)
        } catch (ex) {
            // Handle error
            return ex
        }
        return data.data.data.body;
    },
    async getCompanyBySlug({ commit }, companySlug) {
        let data
        try {
            data = await this.$axios.get('/api/companies/slug/' + companySlug);
            commit("SET_COMPANY", data.data.data.body)
        } catch (ex) {
            // Handle error
            return ex
        }
        return data.data.data.body;
    }
}


export const getters = {
    companies(state) {
        return state.companies
    },
    company(state) {
        return state.company
    }
}
  