<template>
    <v-app>
        <v-main>
            <div v-for="(item, i) in beerList">
                <ItemBeer :key="item.id" :beerItem="item" />
            </div>
            <div v-if="showBtn" class="d-flex justify-end ma-6">
                <v-btn color="primary" 
                       :loading="loading" 
                       :disabled="loading"
                       @click="nextPage">
                    <span>Show next</span>
                </v-btn>
            </div>
        </v-main>
    </v-app>
</template>

<script>
    import ItemBeer from './components/ItemBeer'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'App',
        components: {
            ItemBeer,
        },
        data: () => ({
            loading: false
        }),
        computed: {
            ...mapState(['beerList','statusData']),
            showBtn(){
                if(this.beerList != 0 && this.statusData) return true 
                else return false
            }
        },
        methods: {
            ...mapActions(['nextLoadBeerList']),
            async nextPage(){
                this.loading = !this.loading
                await this.nextLoadBeerList()
                this.loading = !this.loading
                
            }    
        }   
    };

</script>
