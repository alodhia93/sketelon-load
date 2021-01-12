barba.init({
    transitions: [{
            name: 'move-in-right',
            from: {
                custom: data => {
                    return data.current.namespace === 'detilproduk' || data.current.namespace === 'pilihbarang'
                }
            },
            to: {
                custom: data => {
                    return data.next.namespace === 'keranjang' || data.next.namespace === 'detilproduk'
                }
            },
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0 });
            },
            enter(data) {
                return gsap.from(data.next.container, { xPercent: 100 });
            }
        },
        {
            name: 'move-in-right',
            from: {
                namespace: [
                    // 'explorer',
                    'transaksi',
                    'pilihbarang',
                    'detilproduk',
                    'keranjang',
                    'sukses'
                ]
            },
            to: {
                namespace: [
                    'transaksi',
                    'addsewa',
                    'profil',
                    'pilihbarang',
                    'detilproduk',
                    'keranjang',
                    'checkout',
                    'tagihandetil'
                ]
            },
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0 });
            },
            afterLeave(data) {
                if (data.current.namespace === 'explorer') {
                    if ((data.next.namespace === 'detilproduk') || (data.next.namespace === 'pilihbarang')) {
                        document.querySelector('#bottom-bar').style.display = 'none';
                    }
                }
            },
            enter(data) {
                return gsap.from(data.next.container, { xPercent: 100 });
            }
        },
        {
            name: 'move-in-left',
            from: {
                namespace: [
                    'transaksi',
                    'addsewa',
                    'pilihbarang',
                    'detilproduk',
                    'keranjang',
                    'checkout',
                    'tagihandetil'
                ]
            },
            to: {
                namespace: [
                    'explorer',
                    'transaksi',
                    'detilproduk',
                    'keranjang',
                ]
            },
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0 });
            },
            beforeEnter(data) {
                if (data.current.namespace === 'pilihbarang') {
                    if (data.next.namespace === 'explorer') {
                        document.querySelector('#bottom-bar').style.display = 'block';
                    }
                } else if (data.current.namespace === 'detilproduk') {
                    if (data.next.namespace === 'explorer') {
                        document.querySelectorAll('#bottom-bar')[1].style.display = 'block';
                    }
                } else if (data.current.namespace === 'tagihandetil') {
                    if (data.next.namespace === 'explorer') {
                        document.querySelector('#bottom-bar').style.display = 'block';
                    }
                }
            },
            enter(data) {
                return gsap.from(data.next.container, { xPercent: -100 });
            }
        },
        {
            name: 'fade-in',
            from: {
                namespace: [
                    'checkout',
                    'tagihandetil'
                ]
            },
            to: {
                namespace: [
                    'sukses',
                ]
            },
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0 });
            },
            enter(data) {
                return gsap.from(data.next.container, { opacity: 0 });
            }
        }
    ]
});

barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning');
});
barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning');
});