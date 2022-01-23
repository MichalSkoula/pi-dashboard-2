const App = {
    data() {
        return {
            tempData : {
                vchod: 0,
                vchod_topi: 0,
                obyvak: 0,
                obyvak_topi: 0,
                loznice: 0,
                loznice_topi: 0,
                pokoj_predni: 0,
                pokoj_predni_topi: 0,
                koupelna: 0,
                koupelna_topi: 0,
                pokoj_zadni: 0,
                pokoj_zadni_topi: 0,
                garaz: 0,
                venku: 0,
                rezim: 0,
                time: ""
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

                    document.getElementById('chodba1').setAttribute('fill', this.colorRoom(this.tempData.vchod));
                    document.getElementById('chodba2').setAttribute('fill', this.colorRoom(this.tempData.vchod));
                    document.getElementById('technicka').setAttribute('fill', this.colorRoom(this.tempData.vchod));
                    document.getElementById('obyvak').setAttribute('fill', this.colorRoom(this.tempData.obyvak));
                    document.getElementById('pokoj_predni').setAttribute('fill', this.colorRoom(this.tempData.pokoj_predni));
                    document.getElementById('pokoj_zadni').setAttribute('fill', this.colorRoom(this.tempData.pokoj_zadni));
                    document.getElementById('zachod').setAttribute('fill', this.colorRoom(this.tempData.koupelna));
                    document.getElementById('loznice').setAttribute('fill', this.colorRoom(this.tempData.loznice));
                    document.getElementById('garaz').setAttribute('fill', this.colorRoom(this.tempData.garaz));
                });
        },
        colorRoom(t) {
            let color = "#FFF";
            if (t < 0) {
                color = "#00FFFC";
            } else if (t < 10) {
                color = "#0010AC";
            } else if (t < 15) {
                color = "#6500AC";
            } else if (t < 20) {
                color = "#8A00AC";
            } else if (t < 21) {
                color = "#AA00AC";
            } else if (t < 21.5) {
                color = "#AC0086";
            } else if (t < 22) {
                color = "#AC005D";
            } else if (t < 22.5) {
                color = "#AC002D";
            } else {
                color = "#AC0000";
            }
            return color;
        }
    },
    mounted() {
        this.fetchData();

        setInterval(() => {
           this.fetchData();
        }, 60 * 1000);
    },
}

Vue.createApp(App).mount('#app');
