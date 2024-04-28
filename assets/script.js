 
        const elem = document.querySelector('textarea');

        document.querySelector('.btn-clear').addEventListener('click',event=>{
            document.querySelector('textarea').value = "";
        })
        document.querySelector('.btn-count').addEventListener('click',event=>{
            const count = document.querySelector('textarea').value.split(' ').filter((word) => (word.length > 0 && word !== "|" && word !== "-") ).length;
            alert(`word count is ${count} `)
        })
        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                // console.log(document.querySelector('textarea').value)
                localStorage.setItem("txtm",elem.value)
            }
        })
        
        
        window.onload = function(event) {
            
            const txt = localStorage.getItem("txtm");
            document.querySelector('textarea').value = txt
        }