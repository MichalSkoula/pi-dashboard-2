const App = {
    data() {
        return {
            tempData : {
                vchod: 21.2,
                vchod_topi: 0,
                obyvak: 22.1,
                obyvak_topi: 0,
                loznice: 21.9,
                loznice_topi: 0,
                pokoj_predni: 19.0,
                pokoj_predni_topi: 0,
                koupelna: 29.4,
                koupelna_topi: 0,
                pokoj_zadni: 22.4,
                pokoj_zadni_topi: 0,
                garaz: 7,
                venku: -0.1,
                rezim: 1,
                time: "19. 1. 2022 20:41:00"
            }
        }
    },
    methods: {
        fetchData() {
            fetch('teco_result.json') // file uploaded to webserver via nodejs-scrapper -> cron.py
                .then(response => response.json())
                .then(data => { 
                    console.log(data);
                    this.tempData = data;
                });
        }
    },
    mounted() {
        this.fetchData();

        setInterval(() => {
           this.fetchData();
        }, 3000);
    },
}

Vue.createApp(App).mount('#app');
