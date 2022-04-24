window.addEventListener('mousemove', (e) => {
    const clientX = e.clientX;
    document.querySelectorAll('.symbol-1').forEach((target) => {
        target.setAttribute('style', `width: ${7 - mappingAt(4, clientX)}px`);
    });
    document.querySelectorAll('.symbol-2').forEach((target) => {
        target.setAttribute('style', `width: ${6 - mappingAt(2, clientX)}px`);
    });
    document.querySelectorAll('.symbol-4').forEach((target) => {
        target.setAttribute('style', `width: ${4 + mappingAt(2, clientX)}px`);
    });
    document.querySelectorAll('.symbol-5').forEach((target) => {
        target.setAttribute('style', `width: ${2 + mappingAt(4, clientX)}px`);
    });
});

// 홀수인 경우
function mappingAt(number, clientX) {
    return (number / innerWidth) * clientX;
}
function makeSymbolRow(selector) {
    const speed = 3;
    const length = 15;
    const maxWidth = 12;
    const minWidth = 1;
    const step = (maxWidth - minWidth) / (length - 1);
    const mappingOgArr = [];
    let mappingNewArr = [];
    let mappingArr = [];
    const parent = document.querySelector(selector);
    document.body.append(parent);
    // 부모요소 symbols에 원하는 만큼 symbol 넣기
    for (let i = 0; i < length; i++) {
        const ELEM = document.createElement('div');
        const ElemChild = document.createElement('div');
        ELEM.classList.add('symbol-space');
        ElemChild.classList.add('symbol');
        ELEM.style.width = 100 / length + 'vw';

        ELEM.append(ElemChild);
        parent.append(ELEM);
    }
    for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].children[0].style.width = `${maxWidth - step * i}px`;
        mappingOgArr.push(maxWidth - step * i);
    }
    // 배열의 깊은 복사가 필요해서 slice함
    mappingNewArr = mappingOgArr.slice().reverse();
    for (let i = 0; i < mappingOgArr.length; i++) {
        mappingArr.push(mappingOgArr[i] - mappingNewArr[i]);
    }
    let callback = function () {
        let ts = new Date().getTime();
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].children[0].style.width = `${
                maxWidth - step * i - ((Math.sin(ts * speed * (1 / 1000)) * mappingArr[i]) / 2 + mappingArr[i] / 2)
            }px`;
            parent.children[i].children[0].style.position = 'relative';
        }
        requestAnimationFrame(callback);
    };
    requestAnimationFrame(callback);
}
makeSymbolRow('.symbols-1');
makeSymbolRow('.symbols-2');
makeSymbolRow('.symbols-3');
