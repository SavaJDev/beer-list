<template>
    <v-card class="ma-6">
        <v-row>
            <v-col cols="1">
                <v-card-title class="pt-0">{{ beerItem.id }}</v-card-title>
            </v-col>
            <v-col cols="2" class="d-flex flex-column align-center">
                <v-img :src="beerItem.image_url" 
                        max-height="200" 
                        max-width="100" 
                        contain 
                        class="mt-1" 
                        alt="image">
                </v-img>
            </v-col>
            <v-col class="mr-4">
                <v-card-subtitle>Description:</v-card-subtitle>
                <v-card-text class="text--primary">
                    <div>
                        {{ beerItem.description }}
                    </div>
                </v-card-text>
                <v-card-subtitle>Brewers tips:</v-card-subtitle>
                <v-card-text class="text--primary">
                    <div>
                        {{ beerItem.brewers_tips }}
                    </div>
                </v-card-text>
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="1"></v-col>
            <v-col cols="2" class="d-flex flex-column align-center">
                <v-card-title>
                    <p class="beer-name">{{ beerItem.name }}</p>
                </v-card-title>
            </v-col>
            <v-col>
                <v-card-actions class="justify-end mr-4">
                    <v-btn icon @click="editListItem({name: beerItem.name, description: beerItem.description})">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteListItem(beerItem.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-col> 
        </v-row>
        <EditForm :overlay="showOverlay">
            <template v-slot:edit>
                <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                <v-textarea v-model="editedItem.description" label="Description" no-resize rows="3"></v-textarea>
            </template>
            <template v-slot:edit-actions>
                <v-btn color="blue darken-1" text @click="saveEdited(beerItem.id)">Save</v-btn>
                <v-btn color="blue darken-1" text @click="cancelOverlay">Cancel</v-btn>
            </template>
        </EditForm> 
    </v-card>
</template>

<script>
    import EditForm from '../components/EditForm'
    import {mapActions} from 'vuex'

    export default {
        name: 'ItemBeer',
        props: ['beerItem'],
        components: {
            EditForm,
        },
        data: () => ({
            showOverlay: false,
            editedItem: {
                name: '',
                description: ''
            }
        }),
        methods: {
            ...mapActions(['saveEditListItem','deleteListItem']),
            
            editListItem(infoItem){
                this.editedItem = Object.assign({}, infoItem)
                this.showOverlay = true
            },
            saveEdited(id){
                this.saveEditListItem({
                    id: id,
                    editedItem: this.editedItem
                })
                this.showOverlay = false
            },
            cancelOverlay(){
                this.showOverlay = false
            }
        }
    }

</script>

<style scoped>
    .beer-name {
        word-break: normal;
        word-wrap: break-word;
        text-align: center;
    }

</style>
