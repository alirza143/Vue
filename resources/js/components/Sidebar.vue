<template>
    <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <router-link to="/home" class="nav-link" exact>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </router-link>
                            <div class="sb-sidenav-menu-heading">Interface</div>
                            <router-link to="/home/categories" class="nav-link" exact>
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Categories
                            </router-link>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
            </div>
</template>