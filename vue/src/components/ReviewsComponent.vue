<template>
    <div>
        <h2 style="margin-top: 30px;" class='hide-on-print'>Отзывы</h2>
        <div class='comments' v-if='vehicle.comments.length > 0'>
            <ul class='comments__list'>
                <li class='comment__item' v-for='comment in vehicle.comments' :key='comment.id'>
                    <img class='comment__img' :src="comment.picture" alt="">
                    <div class='comment__name'>{{ comment.username }}</div>
                    <p class='comment__text'>{{ comment.text }}</p>
                </li>
            </ul>
        </div>
        <div v-else style='font-size: 20px; font-weight: 200; margin-top: 10px;' class='hide-on-print'>
            Отзывов пока нет. Станьте первым!
        </div>
        <div class='comment-form hide-on-print'>
            <label for="my-comment">Ваш комментарий</label>
            <textarea id='my-comment' class='comment-form__text' @change='error = ""' required v-model='commentText'></textarea>
            <div v-if='error != ""' style='color:red'>
                {{ error }}
            </div>
            <input class='button button--light' type="button" value="Отправить" @click="sendComment">
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewsComponent",
    props: ['vehicle'],
    data() {
        return {
            commentText: "",
            error: "",
        };
    },
    methods: {
        sendComment() {
            if (this.commentText == "") {
                this.error = "Вы не ввели комментарий";
            }
            else {
                this.$store.dispatch("vehicles/sendComment", { "text": this.commentText, "id": this.vehicle.id });
            }
        }
    },
}
</script>