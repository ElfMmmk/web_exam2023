import API from "@/utils/api";

export const vehicles = {
    state: () => ({
        vehicles: []
    }),
    mutations: {
        setVehicles(state, vehicles) {
            state.vehicles = vehicles
        },
        sendComment (state, data) {
            const json = JSON.stringify(data);
            API.post('http://httpbin.org/post', json, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => {
                data = JSON.parse(res.data.data)
                let vehicle = state.vehicles.find(el => el.id == data.id);
                let index = state.vehicles.indexOf(vehicle);
                state.vehicles[index].comments.push({'username': 'maxim', 'picture': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF1paNY9Z_5XD9aA4C3WRgj2zV1wmimFG8QSCIfDvMhA&s', 'text': data.text})

            })
          },
    },
    actions: {
        async loadingVehicles({commit}) {
            try {
                commit('setVehicles', [])

                const { data } = await API.get('main.json');

                commit('setVehicles', data)
            }
            catch (e) {

            }
        },
        sendComment(store, data) {
            store.commit('sendComment', data);
        }
    },
    getters: {
        vehicles (state) {
            return state.vehicles;
        },
        vehicle: (state) => (id) => {
            return state.vehicles.find((el) => el.id == id);
        }
    },
    namespaced: true
}