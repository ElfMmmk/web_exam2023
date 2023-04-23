<template>
    <section class="section vehicles">
        <div class="container" v-if="vehicle != undefined">
            <div class="row">
                <div class="col-12">
                    <h2 class="section__title">Автомобиль {{ vehicle.name }}</h2>
                </div>
            </div>
            <div class="row">
                <img :src="vehicle.photo" :alt="vehicle.name">
            </div>
            <div style='width: 100%; justify-content: center; display: flex;'>
                <input type="button" value="Арендовать" class='button button--light' style='margin: 30px auto 30px auto; width: 250px; text-transform: uppercase;'>
            </div>
            
            <ul class='attributes'>
                <li>Марка: {{ vehicle.brand.name }}</li>
                <li>Категория: {{ vehicle.category[0].name }}</li>
                <li>Цена аренды: {{ vehicle.price }}</li>
                <li>Номер: {{ vehicle.number }}</li>
                <li>Пробег: {{ vehicle.mileage }}</li>
                <li>Вместимость (человек): {{ vehicle.capacity }}</li>
            </ul>
            <p style='font-size: 20px;'>
                {{ vehicle.description }}
            </p>
            <ReviewsComponent :vehicle=vehicle></ReviewsComponent>
        </div>
    </section>
</template>

<script>
import ReviewsComponent from '@/components/ReviewsComponent.vue';

export default {
    name: "VehicleDetailsView",
    components: [ReviewsComponent],

    computed: {
        vehicle() {
            let id = this.$route.params.id;
            return this.$store.getters["vehicles/vehicle"](id);
        }
    },
    mounted() {
        document.title = "Список автомобилей";
    },
    components: { ReviewsComponent }
}
</script>
<style>
.attributes {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    list-style-type: disc;
    padding-left: 20px;
}
.comments {
    margin-top: 30px;
}
.comment__item {
    margin-bottom: 15px;
    display: grid;
    grid-template: 'img name'
    'img text';
    grid-template-columns: 100px auto;
    column-gap: 20px;
}
.comment__img {
    grid-area: img;
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 100%;
}
.comment__name {
    grid-area: name;
}
.comment__text {
    padding-left: 10px;
    grid-area: text;
}
.comment-form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 10px;
}
.comment-form__text {
    width: 350px;
    font-size: 18px;
    height: 150px;
    border: 1px solid black;
    resize: none;
}

@media print {
    footer, header, .comments {
        display: none;
    }
    .hide-on-print {
        display: none;
    }
    .vehicles {
        padding-top: 0;
    }
}
.logo__first {
    background-color: black;
}
</style>