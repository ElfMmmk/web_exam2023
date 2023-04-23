<template>
    <section class="section vehicles">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="section__title">Автомобили</h2>
                </div>
            </div>
            <div class='options'>
                <button v-if='sorted' class='button button--light' style="width: 350px; height: 50px; line-height: 1; margin-top: 20px; margin-bottom: 20px;" @click='sorted=false'>Сортировать по алфавиту</button>
                <button v-else class='button' style="width: 350px; height: 50px; line-height: 1; margin-top: 20px; margin-bottom: 20px;" @click='sorted=true'>Сортировать против алфавита</button>
                <div>
                    <label style='font-size: 18px; margin-left: 50px; margin-right: 10px;' for="filter">Вместимость</label>
                    <input type="number" name="filter" id="filter" v-model='filter' class='filter'>
                </div>
            </div>
            <div class="row">
                <template v-if="vehicles">
                    
                    <VehicleItem
                        v-for="vehicle in vehicles"
                        :key="vehicle.id"
                        :vehicle="vehicle"
                    />
                </template>
                <template v-else>
                    <div class="col-12">
                        <p>Список автомобилей пуст..</p>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import VehicleItem from "@/components/VehicleItem";
// import {mapActions, mapState} from "vuex";

export default {
    name: "VehicleView",
    data(){
        return {
            sorted: false,
            filter: 0,
        }
    },
    components: { VehicleItem },
    computed: {
        vehicles() {
            let vehicles = this.$store.getters['vehicles/vehicles'];

            if (this.sorted) {
                vehicles.sort((a, b) => a.name.localeCompare(b.name))
            }
            else {
                vehicles.sort((a, b) =>  b.name.localeCompare(a.name))
            }

            if (this.filter > 0) {
                vehicles = vehicles.filter(el => el.capacity === this.filter)
            }
            
            
            return vehicles;
        }
    },
    // methods: {
    //     ...mapActions({
    //         loadingVehicles: 'vehicles/loadingVehicles'
    //     })
    // },
    // created() {
    //     this.loadingVehicles();
    // },
    mounted() {
        document.title = 'Список автомобилей';
    }
}
</script>
<style>
.filter {
    height: 50px;
    font-size: 18px;
    border-radius: 25px;
    padding-left: 20px;
    width: 80px;
}
.options {
    display: flex;
    justify-content: space-between;
}
</style>