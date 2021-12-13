// create a new row Elements 
let edite ; 
let pChilds;
function addRow(content){
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(content));
            row.appendChild(td);
            table.appendChild(row);
        }

// add icons whenever row is made 
function addIcons(){
    let td = document.createElement('td');
    let edit = document.createElement('i');
    let trash = document.createElement('i');
    edit.className = 'fas';
    edit.className+=' fa-edit'

    td.appendChild(edit);

    trash.className = 'fas';
    trash.className+=' fa-trash-alt';
    trash.className+=' delete'
    
    td.appendChild(trash);
    row.append(td);
}



        // To not preduse a mess in global scooping .
        let row;
        let table;
        
        function check() {
            document.getElementById('validation-response').innerHTML='';
            // get data from user
            let date = document.querySelectorAll('input[type="date"]');
            let  dateValue= date[0].value;
            let d = new Date(dateValue);
            let dateTr = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
            date[0].style.border='none';

            priceF = document.getElementById('money'); 
            priceF.style.border = 'none';
            
            price = priceF.value.trim();
            let nameV = document.getElementById('auth-name');
            nameV.style.border ='none';
            let name = nameV.value.trim();
            
            let selected = document.getElementById('bookTypes').value;
            let titleV = document.getElementById('title');
            titleV.style.border='none';
            title = titleV.value;

            let rdbs = document.querySelectorAll('input[name="radAnswer"]');
            let lang;
                for (let i=0;i < rdbs.length;i++) {
                    if (rdbs[i].checked) {
                        lang = rdbs[i].value;
                    }
                }
             
            let er = [];
            priceReg= '(^(\\d{1,5},\\d{1,2})$)|(^(\\d{1,5})$)';
            function setErr(namevalue,elemnt,reg,message){
                const validReg = RegExp(reg,'g');
                if(!validReg.test(namevalue)) {
                    
                    er.push(true);
                    elemnt.style.border = '3px solid #e30729' ;
                }
                
            }
            setErr(price,priceF,priceReg,'Enter a valid value');
            setErr(title,titleV,'\\w','Enter a valid value');
            if(date[0].value===''){
                date[0].style.border='3px solid #e30729';
                er.push('true'); 
            }else {date[0].style.border='none';}
            setErr(name,nameV,'\\w','Enter a valid value');
            
            if(lang === undefined){
                er.push('true');
            }
            
            
            function addToTable() {
                 edite = document.getElementsByClassName('fa-edit');
                 // declare here to avoid local scooping only  
                table = document.querySelector('#table-manager');
                row = document.createElement('tr');
                row.className = 'row';
               
                // Display The table when executed

                document.getElementById('table-container').style.display='flex';
               
                // check for length and relpace 
                
                function removeLen(elm) {
                    let l = [] ;
                    if (elm.length > 26){
                        l = elm.split("");
                        for(let i = 0; 24 < l.length;i++){
                            l.splice(l.length-1);
                        }
                    return l.join('')+'...';
                    } else{return elm;}
                }

                removeLen(name);
                // Add Rows
                addRow(dateTr);
                addRow('$'+price);
                addRow(selected);
                addRow(removeLen(title));
                addRow(removeLen(name));
                addRow(lang);
                addIcons(); 
                
                
                // delete row 
                let remove = document.getElementsByClassName('delete');
                for (let i = 0; i < remove.length ;i ++){
                    remove[i].onclick =()=> {
                        remove[i].closest('.row').style.display ='none';
                    }
                }
                
                // edite row
    
            }
            // add row when err is false
            if (er.length !=0){
                document.getElementById('validation-response').innerText='Please Enter a valid Values';
            }else {
                addToTable();
            }
        if(edite != undefined){
            createEdite();    
            }
        } 
        function createEdite(){
            edite = document.getElementsByClassName('fa-edit');
            for (let i = 0 ; i < edite.length ;i++){
                edite[i].onclick = ()=>{
                        pChilds =  edite[i].closest('.row').children;
                        edite[i].setAttribute('onclick','saveEdite()');
                        edite[i].className += ' fa-check';
                        edite[i].classList.remove('fa-edit');
                        for(j=0;j < pChilds.length-1;j++){
                            pChilds[j].setAttribute('contenteditable','true');
                        }
                }
            
            }

        }       

        function saveEdite(){
            let check = document.getElementsByClassName('fa-check');
            if(check.length === 0) {
            createEdite();
            
            } else{
                for(let i =0 ; i < check.length;i++){
                for(j=0;j < pChilds.length-1;j++){
                    pChilds[j].setAttribute('contenteditable','false');
                }
                check[i].className +=' fa-edit';
                check[i].classList.remove('fa-check');
            }
        }
        }