<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
    name: 'AboutView',
    components: { AppHeader, AppFooter }

}
</script>

<template>
    <AppHeader></AppHeader>
    <main>
        <div class="about vh-100">
            <div class="container">
                <div class="title py-5">
                    <h1 class="text-center" style="font-size:60px">Meet the Team</h1>
                </div>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 py-5 g-4 justify-content-center">
                    <div class="col">
                        <div class="card border-0 shadow-sm">
                            <img src="" alt="">
                            <div class="card-body text-center">
                                <h4 class="card-title">Simone Graziola</h4>
                            </div>
                            <div class="card-body d-flex justify-content-center">
                                <a href="https://github.com/sgraziola" class="btn px-2"><font-awesome-icon
                                        icon="fa-brands fa-square-github" size="3x" /></a>
                                <a href="https://www.linkedin.com/in/simone-graziola-5337b2263/" class="btn px-2"
                                    style="color:#3f74c3"><font-awesome-icon icon="fa-brands fa-linkedin" size="3x" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card  border-0 shadow-sm">
                            <img src="" alt="">
                            <div class="card-body text-center">
                                <h4 class="card-title">Lorenzo Tesoro</h4>
                            </div>
                            <div class="card-body d-flex justify-content-center">
                                <a href="https://github.com/LorenzoTesoro" class="btn px-2"><font-awesome-icon
                                        icon="fa-brands fa-square-github" size="3x" /></a>
                                <a href="https://www.linkedin.com/in/lorenzo-tesoro-4b15951a1/" class="btn px-2"
                                    style="color:#3f74c3"><font-awesome-icon icon="fa-brands fa-linkedin" size="3x" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card  border-0 shadow-sm">
                            <img src="" alt="">
                            <div class="card-body text-center">
                                <h4 class="card-title">Selene Nerva</h4>
                            </div>
                            <div class="card-body d-flex justify-content-center">
                                <a href="https://github.com/snerva" class="btn px-2"><font-awesome-icon
                                        icon="fa-brands fa-square-github" size="3x" /></a>
                                <a href="" class="btn px-2" style="color:#3f74c3"><font-awesome-icon
                                        icon="fa-brands fa-linkedin" size="3x" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card border-0 shadow-sm">
                            <img src="" alt="">
                            <div class="card-body text-center">
                                <h4 class="card-title">Pasquale Aragosa</h4>
                            </div>
                            <div class="card-body d-flex justify-content-center">
                                <a href="https://github.com/PasqualeAragosa" class="btn px-2"><font-awesome-icon
                                        icon="fa-brands fa-square-github" size="3x" /></a>
                                <a href="" class="btn px-2" style="color:#3f74c3"><font-awesome-icon
                                        icon="fa-brands fa-linkedin" size="3x" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card border-0 shadow-sm">
                            <img src="" alt="">
                            <div class="card-body text-center">
                                <h4 class="card-title">Roberto Loria</h4>
                            </div>
                            <div class="card-body d-flex justify-content-center">
                                <a href="" class="btn px-2"><font-awesome-icon icon="fa-brands fa-square-github"
                                        size="3x" /></a>
                                <a href="" class="btn px-2" style="color:#3f74c3"><font-awesome-icon
                                        icon="fa-brands fa-linkedin" size="3x" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <AppFooter></AppFooter>
</template>

<style lang="scss" scoped></style>