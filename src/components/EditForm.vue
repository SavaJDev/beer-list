<template>
    <div>
        <v-overlay :value="overlay" :dark="false">
            <v-card min-width="320" width="500">
                <v-card-text>
                    <v-card-title>Form for edit</v-card-title>
                    <v-container>
                        <slot name="edit"></slot>
                    </v-container>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <slot name="edit-actions"></slot>
                </v-card-actions>
            </v-card>
        </v-overlay>
    </div>
</template>

<script>
    export default {
        name: 'EditForm',
        props: ['overlay'],
        data: () => ({

        }),
        methods: {

        }
    }

</script>

<style scoped>


</style>
